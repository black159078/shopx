import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faTruckFast,
  faMoneyBillWave,
  faClock,
  faReceipt,
  faWifi,
  faCheck,
  faXmark,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import "./../assets/css/orderdashboard.css";

const SOCKET_URL = "http://localhost:5000";

const formatMMK = (n) => `${Number(n || 0).toLocaleString("en-US")} MMK`;

const formatTime = (d) =>
  new Date(d).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

const formatDate = (d) =>
  new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusBadgeClass = (status) => {
  if (status === "Confirmed") return "badge bg-dark";
  if (status === "Rejected") return "badge bg-secondary";
  return "badge bg-white text-dark border border-dark";
};

const OrderDashboard = () => {
  const [connected, setConnected] = useState(false);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, pending: 0 });
  const [justArrivedId, setJustArrivedId] = useState(null);
  const [actingOnId, setActingOnId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socketRef.current = socket;

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("initialOrders", (initial) => setOrders(initial));
    socket.on("orderStats", (s) => setStats(s));

    socket.on("newOrder", (order) => {
      setOrders((prev) => [order, ...prev]);
      setJustArrivedId(order.id);
      toast.info(`New order · ${formatMMK(order.grandtotal)}`);
      setTimeout(() => setJustArrivedId(null), 1800);
    });

    // keeps every open dashboard tab in sync when any admin accepts/rejects
    socket.on("orderUpdated", (updated) => {
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
      setSelectedOrder((prev) => (prev && prev.id === updated.id ? updated : prev));
    });

    return () => socket.disconnect();
  }, []);

  const handleDecision = async (orderId, decision) => {
    setActingOnId(orderId);
    try {
      await axios.post(`${SOCKET_URL}/api/orders/${orderId}/${decision}`);
      toast.success(decision === "accept" ? "Order accepted" : "Order rejected");
    } catch (err) {
      toast.error("Couldn't update that order. Please try again.");
    } finally {
      setActingOnId(null);
    }
  };

  return (
    <div className="bg-white min-vh-100">
      <ToastContainer position="bottom-right" theme="dark" />

      <nav className="navbar navbar-dark bg-dark px-3 px-md-5">
        <span className="navbar-brand mb-0 h1">Live Orders</span>
        <span className={`badge ${connected ? "bg-white text-dark" : "bg-secondary"} d-flex align-items-center gap-2`}>
          <FontAwesomeIcon icon={connected ? faCircle : faWifi} className={connected ? "live-dot" : ""} style={{ fontSize: "8px" }} />
          {connected ? "Live" : "Reconnecting…"}
        </span>
      </nav>

      <div className="container py-4">
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card border-dark h-100">
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 text-muted mb-2 small">
                  <FontAwesomeIcon icon={faMoneyBillWave} /> Revenue today
                </div>
                <div className="fs-4 fw-bold text-dark">{formatMMK(stats.totalRevenue)}</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-dark h-100">
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 text-muted mb-2 small">
                  <FontAwesomeIcon icon={faReceipt} /> Orders today
                </div>
                <div className="fs-4 fw-bold text-dark">{stats.totalOrders}</div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-dark h-100">
              <div className="card-body">
                <div className="d-flex align-items-center gap-2 text-muted mb-2 small">
                  <FontAwesomeIcon icon={faClock} /> Pending verification
                </div>
                <div className="fs-4 fw-bold text-dark">{stats.pending}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-dark">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <span>Order feed</span>
            <span className="badge bg-white text-dark">{orders.length} total</span>
          </div>

          {orders.length === 0 ? (
            <div className="card-body text-center text-muted py-5">
              Waiting for the first order to come in.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Payment</th>
                    <th>Customer</th>
                    <th>City</th>
                    <th>Status</th>
                    <th>Time</th>
                    <th className="text-end">Amount</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className={order.id === justArrivedId ? "order-row-new" : ""}>
                      <td>
                        <span className={`badge ${order.paymentmethod === "kpay" ? "bg-dark" : "bg-white text-dark border border-dark"} d-inline-flex align-items-center gap-1`}>
                          <FontAwesomeIcon icon={order.paymentmethod === "kpay" ? faMoneyBillWave : faTruckFast} />
                          {order.paymentmethod === "kpay" ? "KBZ Pay" : "COD"}
                        </span>
                      </td>
                      <td>
                        <div className="fw-semibold">{order.fullname}</div>
                        <div className="small text-muted">{order.phone}</div>
                      </td>
                      <td className="text-muted">{order.city}</td>
                      <td>
                        <span className={statusBadgeClass(order.status)}>{order.status}</span>
                      </td>
                      <td className="text-muted small">{formatTime(order.createdAt)}</td>
                      <td className="text-end fw-semibold">
                        {formatMMK(order.grandtotal)}
                        {order.paymentmethod === "cod" && (
                          <div className="small text-muted fw-normal">deposit {formatMMK(order.deposit)}</div>
                        )}
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-1">
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => setSelectedOrder(order)}
                            title="View details"
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </button>

                          {order.status === "Pending Verification" && (
                            <div className="btn-group btn-group-sm">
                              <button
                                type="button"
                                className="btn btn-dark"
                                disabled={actingOnId === order.id}
                                onClick={() => handleDecision(order.id, "accept")}
                              >
                                <FontAwesomeIcon icon={faCheck} />
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-dark"
                                disabled={actingOnId === order.id}
                                onClick={() => handleDecision(order.id, "reject")}
                              >
                                <FontAwesomeIcon icon={faXmark} />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.55)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-dark">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title d-flex align-items-center gap-2">
                  Order detail
                  <span className={statusBadgeClass(selectedOrder.status)}>{selectedOrder.status}</span>
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedOrder(null)}></button>
              </div>

              <div className="modal-body">
                <div className="row g-4">
                  <div className="col-md-6">
                    <h6 className="text-muted small text-uppercase mb-2">Customer</h6>
                    <p className="mb-1"><strong>{selectedOrder.fullname}</strong></p>
                    <p className="mb-1 small">{selectedOrder.email}</p>
                    <p className="mb-1 small">{selectedOrder.phone}</p>
                    <p className="mb-0 small">{selectedOrder.address}, {selectedOrder.city}</p>
                  </div>

                  <div className="col-md-6">
                    <h6 className="text-muted small text-uppercase mb-2">Payment</h6>
                    <p className="mb-1">
                      <span className={`badge ${selectedOrder.paymentmethod === "kpay" ? "bg-dark" : "bg-white text-dark border border-dark"}`}>
                        {selectedOrder.paymentmethod === "kpay" ? "KBZ Pay (full)" : "Cash on Delivery"}
                      </span>
                    </p>
                    <p className="mb-1 small">Placed: {formatDate(selectedOrder.createdAt)}</p>
                    {selectedOrder.bankslip && (
                      <a
                        href={`${SOCKET_URL}${selectedOrder.bankslip}`}
                        target="_blank"
                        rel="noreferrer"
                        className="small text-dark text-decoration-underline"
                      >
                        View uploaded slip
                      </a>
                    )}
                  </div>

                  <div className="col-12">
                    <h6 className="text-muted small text-uppercase mb-2">Items</h6>
                    <ul className="list-group list-group-flush border rounded">
                      {(selectedOrder.items || []).map((item, idx) => (
                        <li key={item.id ?? idx} className="list-group-item d-flex justify-content-between">
                          <span>{idx + 1}. {item.title} <span className="text-muted small">x{item.qty || 1}</span></span>
                          <span>{formatMMK(item.price * (item.qty || 1))}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-12">
                    <h6 className="text-muted small text-uppercase mb-2">Amount breakdown</h6>
                    <table className="table table-sm mb-0">
                      <tbody>
                        <tr>
                          <td>Product subtotal</td>
                          <td className="text-end">{formatMMK(selectedOrder.producttotal)}</td>
                        </tr>
                        <tr>
                          <td>Delivery fee</td>
                          <td className="text-end">{formatMMK(selectedOrder.deliveryfee)}</td>
                        </tr>
                        <tr className="table-light">
                          <td><strong>Grand total</strong></td>
                          <td className="text-end"><strong>{formatMMK(selectedOrder.grandtotal)}</strong></td>
                        </tr>
                        {selectedOrder.paymentmethod === "cod" && (
                          <>
                            <tr>
                              <td>Deposit paid now (10%)</td>
                              <td className="text-end">{formatMMK(selectedOrder.deposit)}</td>
                            </tr>
                            <tr>
                              <td>Balance due on delivery</td>
                              <td className="text-end">{formatMMK(selectedOrder.balancedue)}</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                {selectedOrder.status === "Pending Verification" && (
                  <>
                    <button
                      className="btn btn-dark"
                      disabled={actingOnId === selectedOrder.id}
                      onClick={() => handleDecision(selectedOrder.id, "accept")}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-outline-dark"
                      disabled={actingOnId === selectedOrder.id}
                      onClick={() => handleDecision(selectedOrder.id, "reject")}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button className="btn btn-secondary" onClick={() => setSelectedOrder(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDashboard;