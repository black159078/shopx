import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import TopnavBar from "../components/TopnavBar";

const SOCKET_URL = "http://localhost:5000";

const OrderPendingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { orderdata, serverId } = location.state || {};
    const [status, setStatus] = useState("waiting"); // waiting | accepted | rejected

    useEffect(() => {
        // someone landed here directly with nothing to track
        if (!serverId) {
            navigate("/");
            return;
        }

        const socket = io(SOCKET_URL);

        socket.on("connect", () => {
            socket.emit("joinOrder", serverId);
        });

        socket.on("orderAccepted", () => {
            setStatus("accepted");
            toast.success("Payment confirmed!");
            setTimeout(() => {
                navigate("/orderconfirm", { state: { orderdata } });
            }, 1200);
        });

        socket.on("orderRejected", () => {
            setStatus("rejected");
            toast.error("Your payment slip was rejected.");
            setTimeout(() => {
                navigate("/checkout");
            }, 2500);
        });

        return () => socket.disconnect();
    }, [serverId, orderdata, navigate]);

    return (
        <>
            <TopnavBar width="col-12" />
            <ToastContainer position="top-center" theme="dark" />

            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <div className="card border-dark text-center" style={{ maxWidth: "440px", width: "100%" }}>
                    <div className="card-body py-5 px-4">
                        {status === "waiting" && (
                            <>
                                <div className="spinner-border text-dark mb-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <h2 className="h4 mb-2">Verifying your payment</h2>
                                <p className="text-muted mb-0">
                                    We've received your {orderdata?.paymentmethod === "cod" ? "deposit transfer slip" : "bank transfer slip"}{orderdata?.orderid ? ` for order ${orderdata.orderid}` : ""}.
                                    This page will move on automatically once it's confirmed — no need to refresh.
                                </p>
                            </>
                        )}

                        {status === "accepted" && (
                            <>
                                <FontAwesomeIcon icon={faCircleCheck} className="text-dark mb-3" style={{ fontSize: "40px" }} />
                                <h2 className="h4 mb-2">Payment confirmed</h2>
                                <p className="text-muted mb-0">Taking you to your order confirmation…</p>
                            </>
                        )}

                        {status === "rejected" && (
                            <>
                                <FontAwesomeIcon icon={faCircleXmark} className="text-dark mb-3" style={{ fontSize: "40px" }} />
                                <h2 className="h4 mb-2">We couldn't verify this slip</h2>
                                <p className="text-muted mb-0">Please double check the transfer details. Taking you back to checkout…</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderPendingPage;