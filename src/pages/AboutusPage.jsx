import React from "react";
import TopnavBar from "../components/TopnavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStore,
    faShieldHalved,
    faTruck,
    faCreditCard
} from "@fortawesome/free-solid-svg-icons";

const AboutusPage = () => {

    return (
        <>
            <TopnavBar width="col-12" />

            <div className="container pt-5 mt-5">

                {/* Header */}
                <div className="text-center mb-5">

                    <h2 className="fw-bold">
                        About ShopX
                    </h2>

                    <p className="text-muted">
                        Your trusted online shopping destination
                    </p>

                </div>


                {/* About ShopX */}
                <div className="row align-items-center mb-5">

                    <div className="col-md-6">

                        <div className="p-4">

                            <h3 className="fw-bold mb-3">
                                Welcome to ShopX
                            </h3>

                            <p className="text-muted">
                                ShopX is an online shopping platform designed
                                to provide customers with a simple, convenient
                                and enjoyable shopping experience.
                            </p>

                            <p className="text-muted">
                                Customers can explore different categories,
                                search for products, view product details,
                                add products to their cart and complete their
                                orders through our checkout system.
                            </p>

                            <p className="text-muted">
                                Our goal is to make online shopping easier,
                                safer and more convenient for everyone.
                            </p>

                        </div>

                    </div>


                    <div className="col-md-6">

                        <div className="card bg-light border-0 rounded-4 p-5 text-center">

                            <FontAwesomeIcon
                                icon={faStore}
                                className="text-primary display-1 mb-3"
                            />

                            <h3 className="fw-bold">
                                ShopX
                            </h3>

                            <p className="text-muted">
                                Shop Smart. Shop Easy. ShopX.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Features */}
                <h3 className="text-center fw-bold mb-4">
                    Why Choose ShopX?
                </h3>

                <div className="row g-4 mb-5">

                    <div className="col-md-3">

                        <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">

                            <FontAwesomeIcon
                                icon={faStore}
                                className="text-primary fs-1 mb-3"
                            />

                            <h5 className="fw-bold">
                                Wide Selection
                            </h5>

                            <p className="text-muted">
                                Explore products from many different
                                categories in one place.
                            </p>

                        </div>

                    </div>


                    <div className="col-md-3">

                        <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">

                            <FontAwesomeIcon
                                icon={faShieldHalved}
                                className="text-success fs-1 mb-3"
                            />

                            <h5 className="fw-bold">
                                Secure Shopping
                            </h5>

                            <p className="text-muted">
                                We aim to provide a safe and reliable
                                shopping experience.
                            </p>

                        </div>

                    </div>


                    <div className="col-md-3">

                        <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">

                            <FontAwesomeIcon
                                icon={faTruck}
                                className="text-warning fs-1 mb-3"
                            />

                            <h5 className="fw-bold">
                                Easy Delivery
                            </h5>

                            <p className="text-muted">
                                Get your purchased products delivered
                                conveniently.
                            </p>

                        </div>

                    </div>


                    <div className="col-md-3">

                        <div className="card border-0 shadow-sm rounded-4 text-center p-4 h-100">

                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className="text-danger fs-1 mb-3"
                            />

                            <h5 className="fw-bold">
                                Easy Payment
                            </h5>

                            <p className="text-muted">
                                Choose from available payment options
                                during checkout.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Mission */}
                <div className="card border-0 bg-light rounded-4 p-5 text-center mb-5">

                    <h3 className="fw-bold mb-3">
                        Our Mission
                    </h3>

                    <p className="text-muted mb-0">
                        Our mission is to create a convenient online
                        marketplace where customers can easily discover,
                        compare and purchase products while enjoying a
                        simple and user-friendly experience.
                    </p>

                </div>

            </div>
        </>
    );
};

export default AboutusPage;