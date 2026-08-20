import React,{useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router";

import LeftsideBar from "../components/LeftsideBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTag, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { API_BASE_URL } from "../config";

const LaptopsPage = ()=>{
    const [datas,setDatas] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        axios
        .get(`${API_BASE_URL}/api/category/electronic/laptops`)
        .then(res=>{
            console.log(res.data);
            setDatas(res.data);
        })
    },[datas]);

    return (
        <>
            <LeftsideBar />
            <section className="pt-5 mt-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 col-md-9 ms-auto">

                            <button type="button" className="btn btn-outline-dark fw-bold" onClick={()=>{navigate("/")}}><FontAwesomeIcon icon={faArrowLeft} className="me-1 text-primary" />Back to Home</button>

                            <h5 className="display-6 text-center fw-bold">Available Laptops</h5>
                            
                            <div className="row g-2">
                                {datas.map((data,idx)=>(
                                    <div key={idx} className="col-lg-2 col-md-3 col-sm-4">
                                        <div className="card border-0 shadow h-100">
                                            <img src={data.image} className="card-img-top p-3" style={{maxHeight:"200px",objectFit:"center"}} />
                                            <div className="card-body">
                                                <h5 className="card-title">{data.title}</h5>
                                                {
                                                    Array.from({length:5}).map((_,idx)=>(
                                                        <FontAwesomeIcon key={idx} icon={faStar} className={idx < data.rating ? "text-warning" : "text-secondary"} />
                                                    ))
                                                }
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div><FontAwesomeIcon icon={faTag} className="text-primary me-1" />{data.price}MMK</div>
                                                    <Link to={`/allproducts/${data.id}`} className="btn btn-sm btn-dark">View</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            
        </>
    )
}

export default LaptopsPage;