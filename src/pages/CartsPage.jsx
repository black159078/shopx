import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router";

import TopnavBar from "../components/TopnavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faTrash, faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";



const formatMMK = (n) => `${Number(n || 0).toLocaleString("en-US")} MMK`;

const CartsPage = ()=>{

    const navigate = useNavigate();

    const [items,setItems] = useState([]);
    const [gotocheckoutitems,setGotocheckoutitems] = useState([]);

    useEffect(()=>{
        const allitems = JSON.parse(localStorage.getItem("carts")) || [];
        setItems(allitems);
    },[])

    useEffect(()=>{
        

        const grouped = items.reduce((result, item) => {

            const existing = result.find(
                group => group[0].id === item.id
            );
        
            if (existing) {
                existing.push(item);
            } else {
                result.push([item]);
            }
        
            return result;
        
        }, []);
    
        const finalResult = grouped.map(group => ({
            id: group[0].id,
            title: group[0].title,
            price: group[0].price,
            image: group[0].image,
            qty: group.reduce((total, item) => Number(total + item.qty), 0)
        }));
    
        // console.log(finalResult);
    
        const cartwithdiscount = finalResult.map(final=>{
            const total = Number(final.price) * Number(final.qty);
    
        const discount = Number(final.qty) >= 20
            ? Number(total) * 0.05
            : 0;
    
        const finalTotal = Number(total - discount);
    
        return {
            ...final,
            total,
            discount,
            finalTotal
        };
        })
    
        setGotocheckoutitems(cartwithdiscount);

    },[items]);

    const deleteHandler = (idx)=>{
        const localdatas = JSON.parse(localStorage.getItem("carts"));
        localdatas.splice(idx,1);
        localStorage.setItem("carts",JSON.stringify(localdatas));
        setItems(localdatas);
    }

    

    const totalamount = gotocheckoutitems.reduce((prev,next)=>prev + next.finalTotal,0);

    const checkoutHandler = ()=>{
        localStorage.setItem("carts",JSON.stringify(gotocheckoutitems));
        navigate('/checkout');
    }

    if(items.length <= 0){
        return(
            <>
                <TopnavBar width="col-12" />
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <h3>Your cart is empty</h3>
                </div>
            </>
        )
    }

    

    return(
        <>
            <TopnavBar width="col-12" />

            <div className="container py-5 mt-5">
            <button type="button" className="btn btn-outline-dark fw-bold" onClick={()=>{navigate(-1)}}><FontAwesomeIcon icon={faArrowLeft} className="me-1 text-primary" />Back</button>
                <h1 className="text-center mb-3">Your Cart<FontAwesomeIcon icon={faShoppingCart} className="ms-2" /></h1>
                <div className="row">
                    <div className="col-12">
                        <div className="row g-2">
                            {
                                items.map((item,idx)=>(
                                    <div key={idx} className="col-md-3 col-sm-6">
                                        <div className="card h-100" style={{cursor:"pointer"}}>
                                            <h3 className="card-title text-center py-2">{item.title}</h3>
                                            <img src={item.image} alt={item.title} className="card-img-top p-2" style={{maxHeight:"150px",objectFit:"contain"}} />
                                            <div className="card-body d-flex justify-content-between">
                                               
                                                {item.color && (
                                                    <p>Color: {item.color}</p>
                                                )}
                                                {item.qty && (
                                                    <p>Qty: {item.qty}</p>
                                                )}
                                                {item.size && (
                                                    <p>Size: {item.size}</p>
                                                )}
                                            </div>
                                            <div className="card-footer d-flex justify-content-between align-items-center">
                                                <div>
                                                    <FontAwesomeIcon icon={faTag} className="text-primary" />{formatMMK(item.price)}   
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon icon={faTrash} className="text-danger" onClick={()=>deleteHandler(idx)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>
            
                <table className="table table-hover align-middle border rounded overflow-hidden mt-4">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Discount</th>
                            <th className="text-end">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {gotocheckoutitems.map((eachitem, idx) => (
                            <tr key={eachitem.id}>

                                {/* ID */}
                                <td className="fw-semibold text-secondary">
                                    {idx + 1}
                                </td>

                                {/* Product */}
                                <td>
                                    <div className="fw-semibold">
                                        {eachitem.title}
                                    </div>
                                </td>

                                {/* Quantity */}
                                <td>
                                    <span className="badge bg-secondary rounded-pill px-3 py-2">
                                        {eachitem.qty}
                                    </span>
                                </td>

                                {/* Discount */}
                                <td>
                                    {eachitem.discount > 0 ? (
                                        <div>
                                            <span className="badge bg-success mb-1">
                                                5% OFF
                                            </span>

                                            <div className="small text-success">
                                                You saved {formatMMK(eachitem.discount)}
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-muted">
                                            No discount
                                        </span>
                                    )}
                                </td>

                                {/* Total */}
                                <td className="text-end">
                                    {eachitem.discount > 0 && (
                                        <div className="text-muted text-decoration-line-through small">
                                            {Number(eachitem.price) * eachitem.qty} MMK
                                        </div>
                                    )}

                                    <span className="fw-bold text-primary fs-6">
                                        {formatMMK(eachitem.finalTotal)}
                                    </span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-5 text-end">
                    <h4>Total amount: <span className="text-primary fw-bold">{formatMMK(totalamount)}</span></h4>
                    <button type="button" className="btn btn-dark px-5 py-2" style={{fontSize:"19px"}} onClick={()=>checkoutHandler()}>Checkout</button>
                </div>
            </div>
        </>

    )
}

export default CartsPage;