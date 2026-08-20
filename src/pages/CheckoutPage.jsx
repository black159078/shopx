import React,{useState,useEffect} from "react";
import { useNavigate} from "react-router";
import { ToastContainer, toast } from 'react-toastify';

import TopnavBar from "../components/TopnavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faTruck,faCreditCard,faTrash,faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API_BASE_URL } from "../config";

const DELIVERY_FEE = 5000;
const DEPOSIT_RATE = 0.10;

const formatMMK = (n) => `${Number(n || 0).toLocaleString("en-US")} MMK`;

const CheckoutPage = ()=>{

    const navigate = useNavigate();

    const [items,setItems] = useState([]);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [city,setCity] = useState("");
    const [phonenumber,setPhonenumber] = useState("");
    const [selectedpaymentmethod,setSelectedpaymentmethod] = useState("");
    const [bankslip,setBankslip] = useState("");
    const [previewslip,setPreviewslip] = useState("");
    const [submitting,setSubmitting] = useState(false);

    useEffect(()=>{
        const allitems = JSON.parse(localStorage.getItem("carts")) || [];
        setItems(allitems);
    },[]);

    const bankslipHandler = (e)=>{
        const file = e.target.files[0];

        if(file){
            setBankslip(file);
            setPreviewslip(URL.createObjectURL(file));
        }
    }

    // product total never includes delivery — delivery is added separately below
    const producttotal = items.reduce((prev,next)=>prev + next.finalTotal,0);
    const deliveryfee = DELIVERY_FEE;
    const grandtotal = producttotal + deliveryfee;
    const deposit = Math.round(producttotal * DEPOSIT_RATE);
    const balancedue = grandtotal - deposit;

    // both payment methods now settle through a bank slip: kpay pays the
    // full grand total up front, cod pays only the 10% deposit up front
    const amountToTransfer = selectedpaymentmethod === "cod" ? deposit+deliveryfee : grandtotal;

    const placeorderHandler = async()=>{
        if(items.length === 0){
            toast.error("Your cart is empty!");
            return;
        }

        if(!name || !email || !address || !city || !phonenumber){
            toast.error("Please fill all required information!");
            return;
        }

        if(!selectedpaymentmethod){
            toast.error("Select a payment method.");
            return;
        }

        if(!bankslip){
            toast.error(selectedpaymentmethod === "cod" ? "Please upload your deposit transfer slip!" : "Please upload your bank transfer slip!");
            return;
        }

        const orderdata = {
            orderid:`ORD-${Date.now()}`,
            items,
            producttotal,
            deliveryfee,
            deposit,
            grandtotal,
            balancedue,
            paymentmethod:selectedpaymentmethod
        }

        const formData = new FormData();
        formData.append("name",name);
        formData.append("email",email);
        formData.append("address",address);
        formData.append("city",city);
        formData.append("phonenumber",phonenumber);
        formData.append("paymentmethod",selectedpaymentmethod);
        formData.append("producttotal",producttotal);
        formData.append("deliveryfee",deliveryfee);
        formData.append("deposit",selectedpaymentmethod === "cod" ? deposit : 0);
        formData.append("grandtotal",grandtotal);
        formData.append("items",JSON.stringify(items));
        formData.append("bankslip",bankslip);

        setSubmitting(true);

        try{
            const res = await axios.post(`${API_BASE_URL}/api/orders/upload`,formData,{
                headers:{"Content-Type":"multipart/form-data"}
            })

            toast.success("Slip uploaded successfully!");
            localStorage.removeItem("carts");
            setItems([]);
            navigate("/orderpending",{state:{orderdata, serverId:res.data.orderData.id}});
        }catch(err){
            toast.error(err?.response?.data?.error || "Upload failed. Please try again.");
        }finally{
            setSubmitting(false);
        }
    }

    return(
        <>
            <TopnavBar width="col-12" />

            <ToastContainer />
            <div className="container py-5 mt-5">
                <button type="button" className="btn btn-outline-dark fw-bold" onClick={()=>{navigate(-1)}}><FontAwesomeIcon icon={faArrowLeft} className="me-1 text-primary" />Back</button>
                <h1 className="text-center mb-3">Checkout</h1>
                <div className="row">
                    <div className="col-md-7">
                        <form action="" method="" className="border rounded p-3 shadow">
                            <div className="row">
                                
                                <h5 className="mb-2"><FontAwesomeIcon icon={faTruck} />Shipping Information</h5>
                                <div className="col-md-6">
                                    <label htmlFor="fullname">Fullname *</label>
                                    <input type="text" id="fullname" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="address">Address *</label>
                                    <input type="text" id="address" className="form-control" value={address} onChange={(e)=>{setAddress(e.target.value)}} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="city">City *</label>
                                    <input type="text" id="city" className="form-control" value={city} onChange={(e)=>{setCity(e.target.value)}} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email">Email *</label>
                                    <input type="text" id="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="phone">Phone Number *</label>
                                    <input type="text" id="phone" className="form-control" value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}} required />
                                </div>
                                
                            </div>
                        </form>

                        <div className="card p-2 border rounded shadow mt-2">
                            <h5><FontAwesomeIcon icon={faCreditCard} className="me-1" />Payment Method</h5>
                            {
                                ["kpay","cod"].map((method,idx)=>(
                                    <div key={idx} className="form-check">
                                        <input
                                            type="radio"
                                            id={`${method}-payment`}
                                            name="paymentmethod"
                                            className="form-check-input"
                                            value={method}
                                            checked={selectedpaymentmethod === method}
                                            onChange={(e)=>{
                                                setSelectedpaymentmethod(e.target.value);
                                                setBankslip("");
                                                setPreviewslip("");
                                            }}
                                        />
                                        <label htmlFor={`${method}-payment`} className="form-check-label">
                                            {method === "kpay" ? "Online Payment" : "Cash on Delivery"}
                                        </label>
                                    </div>
                                ))
                            }
                            {
                                selectedpaymentmethod && (
                                    <div className="border p-3 rounded bg-light">
                                        <h6>Bank Transfer Instructions</h6>
                                        <p className="text-muted mb-2">
                                            {selectedpaymentmethod === "cod"
                                                ? "Cash on Delivery requires a 10% deposit up front to confirm your order. Transfer the deposit amount below — the rest is paid in cash when your order arrives."
                                                : "Please transfer the full order amount to confirm your order."}
                                        </p>
                                        <ul>
                                            <li><strong>Bank:</strong> KBZ Pay</li>
                                            <li><strong>Kpay Name:</strong> Mg Lin Lin Tun</li>
                                            <li><strong>Kpay No:</strong> +95 9 672 961 461</li>
                                            <li><strong>Amount to transfer:</strong> {formatMMK(amountToTransfer)}</li>
                                        </ul>
                                        <hr />
                                        <label className="form-label fw-bold">Upload Payment Slip *</label>
                                        <input type="file" className="form-control mb-3" onChange={bankslipHandler} />

                                        {previewslip && (
                                            <div>
                                                <p className="mb-1">Preview:</p>
                                                <img src={previewslip} className="img-fluid rounded border" style={{maxHeight:"250px",objectFit:"contain"}} alt="bank slip preview" />
                                            </div>
                                        )}

                                    </div>
                                )
                            }
                        </div>    
                            
                            
                            
                            
                        
                    </div>
                    <div className="col-md-5">
                        <div className="card border shadow p-2">
                            <div className="card-body">
                                <h5 className="card-title">Order Summery</h5>
                                <ul className="list-group mb-3">
                                        {
                                            items.map((cart,index)=>(
                                                <li key={cart.id} className="list-group-item">
                                                    <div className="d-flex justify-content-between">
                                                        <h6 className="my-0"><span className="me-2">{index+1}</span>{cart.title}</h6>
                                                        <span>{(cart.price * cart.qty)} MMK</span>
                                                    </div>
                                                </li>
                                            ))
                                        }

                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Product Subtotal</span>
                                            <span>{formatMMK(producttotal)}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Delivery Fee</span>
                                            <span>{formatMMK(deliveryfee)}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between">
                                            <strong>Grand Total</strong>
                                            <strong>{formatMMK(grandtotal)}</strong>
                                        </li>

                                        {selectedpaymentmethod === "cod" && (
                                            <>
                                                <li className="list-group-item d-flex justify-content-between text-primary">
                                                    <span>Deposit(10%)</span>
                                                    <span>{formatMMK(deposit)}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between text-muted">
                                                    <span>Remaining amount</span>
                                                    <span>{formatMMK(balancedue)}</span>
                                                </li>
                                            </>
                                        )}
                                    </ul>

                                    

                                    
                                    <div className="d-grid">
                                        <button type="button" className="btn btn-dark" disabled={submitting} onClick={placeorderHandler} ><FontAwesomeIcon icon={faMoneyBill} className="me-2"/>
                                            {submitting
                                                ? "Placing order…"
                                                : selectedpaymentmethod === "kpay"
                                                    ? "Pay with KBZ Pay"
                                                    : selectedpaymentmethod === "cod"
                                                        ? "Pay deposit & place order"
                                                        : "Select Payment Method"}
                                        </button>
                                    </div>
                                      
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default CheckoutPage;