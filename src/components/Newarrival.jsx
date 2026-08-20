import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus, faTag } from "@fortawesome/free-solid-svg-icons";
import { notifyCartUpdated } from "../lib/cartUtils";

import { API_BASE_URL } from "../config";

const formatMMK = (n) => `${Number(n || 0).toLocaleString("en-US")} MMK`;

const Newarrival = ()=>{

    const [items,setItems] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${API_BASE_URL}/api/newarrivals`)
        .then(res=>{
            setItems(res.data);
        }).catch(err=>{
            console.log(err);
        })
    },[])

    // quick-add only works when the item has no size/color to pick — otherwise
    // send them to the product page so they can choose first
    const quickAddHandler = (e, item) => {
        e.stopPropagation();

        if (item.size || item.color) {
            navigate(`/allproducts/${item.id}`);
            return;
        }

        const oldcarts = JSON.parse(localStorage.getItem("carts")) || [];
        const addtocartdata = {
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
            price: item.price,
            size: "",
            color: "",
            qty: 1
        };

        localStorage.setItem("carts", JSON.stringify([...oldcarts, addtocartdata]));
        notifyCartUpdated();
        toast.success(`${item.title} added to cart.`);
    };

    return(
        <>
            <section className="container-fluid mt-5">
                <div className="row">
                    <div className="col-lg-10 col-md-9 ms-auto">
                        <h3 className="display-6 text-center">New Arrivals</h3>
                        <div className="row g-2">
                            {
                                items.map(item=>(
                                    <div className="col-lg-2 col-md-4 col-sm-6" key={item.id}>
                                        <div className="card h-100 shadow-md" style={{cursor:"pointer"}} onClick={()=>navigate(`/allproducts/${item.id}`)}>
                                            <div className="position-relative">
                                                <span className="badge bg-dark position-absolute" style={{top:"8px",left:"8px"}}>
                                                    New
                                                </span>
                                                <img src={item.image} className="card-img-top p-2" alt={item.title} style={{maxHeight:"150px",objectFit:"contain"}} />
                                            </div>

                                            <div className="card-body pb-1">
                                                <p className="card-title mb-1 small fw-semibold text-truncate">{item.title}</p>

                                                <div className="mb-1">
                                                    {Array.from({ length: 5 }).map((_, idx) => (
                                                        <FontAwesomeIcon
                                                            icon={faStar}
                                                            key={idx}
                                                            className={Math.floor(item.rating) > idx ? "text-warning" : "text-secondary"}
                                                            style={{ fontSize: "0.7rem" }}
                                                        />
                                                    ))}
                                                </div>

                                                <p className="mb-0 fw-bold small">
                                                    <FontAwesomeIcon icon={faTag} className="text-primary me-1" style={{ fontSize: "0.7rem" }} />
                                                    {formatMMK(item.price)}
                                                </p>
                                            </div>

                                            <div className="card-footer bg-dark text-light d-flex justify-content-between align-items-center">
                                                <span className="small text-truncate">View details</span>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-light"
                                                    onClick={(e)=>quickAddHandler(e,item)}
                                                    title="Add to cart"
                                                >
                                                    <FontAwesomeIcon icon={faCartPlus} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default Newarrival;