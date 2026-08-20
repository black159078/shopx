import React from "react";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";

import banner from "./../assets/img/discount.jpg";
import wholesale from "./../assets/img/wholesale.png";
import delivery from "./../assets/img/delivery.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp,faTruck } from "@fortawesome/free-solid-svg-icons";

const BannerCarousel = ()=>{

    const {searchtext} = useSelector(state=>state.search);

    return (
        <>
            <section className="pt-5 mb-0">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 col-md-9 ms-auto">
                            {
                                !searchtext && (
                                    <>
                                        {/* BannerCarousel */}
                                        <div className="row">
                                            <div className="col-lg-12 col-md-6 mx-1">
                                                <div id="bannersales" className="carousel slide" data-bs-ride="carousel">
                                                    <div className="carousel-inner">

                                                        <div className="carousel-item active bg-dark p-3 my-3 rounded-4">
                                                            
                                                            <div className="row">
                                                                <div className="col-lg-6 text-center p-4">
                                                                    <h3 className="display text-light mt-5">Discount for August</h3>
                                                                    <ul className="text-light my-3 list-group fs-5">
                                                                        <li className="list-group-item mb-2 text-lg bg-light text-primary border-0">Buy 20 quantities of any single item & Get 5% discount.</li>
                                                                        {/* <li className="list-group-item text-lg border-0 text-primary">Shop Fashion, Electronics & More</li> */}
                                                                    </ul>
                                                                    <button className="btn btn-outline-primary btn-dark fw-bold text-light p-2 mt-2">Shop Now</button>
                                                                </div>
                                                                <div className="col-lg-6 p-3 text-center">
                                                                    <img src={banner} alt="banner" className="img-fluid rounded-4" style={{objectFit:"cover"}} width="300" height="300" />
                                                                </div>
                                                            </div>
                                                            
                                                        </div>

                                                        

                                                        

                                                        {/* <button type="button" className="carousel-control-prev" data-bs-target="#bannersales" data-bs-slide="prev">
                                                            <span className="carousel-control-prev-icon"></span>
                                                        </button>

                                                        <button type="button" className="carousel-control-next" data-bs-target="#bannersales" data-bs-slide="next">
                                                            <span className="carousel-control-next-icon"></span>
                                                        </button> */}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* BannerCarousel */}
                                    </>
                                )
                            }
                            

                            <Pagination />
                        </div>
                    </div>
                </div>
               
            </section>
        </>
    )
}

export default BannerCarousel;