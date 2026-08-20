import React from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTruckFast, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

import TopnavBar from "../components/TopnavBar";

const formatMMK = (n) => `${Number(n || 0).toLocaleString("en-US")} MMK`;

const OrderConfirmPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderdata } = location.state || {};

    // someone landed here directly with nothing to show
    if (!orderdata) {
        return (
            <>
                <TopnavBar width="col-12" />
                <div className="container d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "60vh" }}>
                    <h2 className="h4 mb-3">No order to show</h2>
                    <p className="text-muted mb-4">Looks like you got here without placing an order.</p>
                    <button className="btn btn-dark" onClick={() => navigate("/")}>Back to shop</button>
                </div>
            </>
        );
    }

    const { orderid, items = [], producttotal, deliveryfee, deposit, grandtotal, balancedue, paymentmethod } = orderdata;

    return (
        <>
            <TopnavBar width="col-12" />

            <div className="container py-5 mt-5" style={{ maxWidth: "720px" }}>
                <div className="text-center mb-4">
                    <FontAwesomeIcon icon={faCircleCheck} className="text-dark mb-3" style={{ fontSize: "48px" }} />
                    <h1 className="h3 mb-2">Order confirmed</h1>
                    <p className="text-muted mb-0">Thanks — your order has been placed successfully.</p>
                </div>

                <div className="card border-dark mb-3">
                    <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <span>Order {orderid}</span>
                        <span className="badge bg-white text-dark d-inline-flex align-items-center gap-1">
                            <FontAwesomeIcon icon={paymentmethod === "kpay" ? faMoneyBillWave : faTruckFast} />
                            {paymentmethod === "kpay" ? "KBZ Pay" : "Cash on Delivery"}
                        </span>
                    </div>

                    <ul className="list-group list-group-flush">
                        {items.map((item, idx) => (
                            <li key={item.id ?? idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    <span className="text-muted me-2">{idx + 1}.</span>
                                    {item.title}
                                    <span className="text-muted ms-2 small">x{item.qty || 1}</span>
                                </span>
                                <span className="fw-semibold">{formatMMK(item.price * (item.qty || 1))}</span>
                            </li>
                        ))}
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Product Subtotal</span>
                            <span>{formatMMK(producttotal)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Delivery Fee</span>
                            <span>{formatMMK(deliveryfee)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <strong>Grand Total</strong>
                            <strong>{formatMMK(grandtotal)}</strong>
                        </li>
                    </ul>
                </div>

                {paymentmethod === "cod" ? (
                    <div className="alert alert-light border-dark" role="alert">
                        Deposit paid: <strong>{formatMMK(deposit)}</strong><br />
                        Balance due in cash on delivery: <strong>{formatMMK(balancedue)}</strong>
                    </div>
                ) : (
                    <div className="alert alert-light border-dark" role="alert">
                        Paid in full: <strong>{formatMMK(grandtotal)}</strong>
                    </div>
                )}

                <div className="d-grid">
                    <Link to="/" className="btn btn-dark">Continue shopping</Link>
                </div>
            </div>
        </>
    );
};

export default OrderConfirmPage;