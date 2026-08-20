import React from "react";
import TopnavBar from "../components/TopnavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPhone,
    faEnvelope,
    faLocationDot,
    faClock
} from "@fortawesome/free-solid-svg-icons";

const ContactPage = () => {

    return (
        <>
            <TopnavBar width="col-12" />

            <div className="container pt-5 mt-5">

                <div className="text-center mb-5">
                    <h2 className="fw-bold">Contact Us</h2>
                    <p className="text-muted">
                        Have any questions? We would love to hear from you.
                    </p>
                </div>

                <div className="row g-4">

                    {/* Contact Information */}
                    <div className="col-md-5">

                        <div className="card shadow border-0 rounded-4 h-100 p-4">

                            <h4 className="fw-bold mb-4">
                                Get In Touch
                            </h4>

                            <div className="d-flex mb-4">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="text-primary fs-4 me-3"
                                />

                                <div>
                                    <h6 className="mb-1">Phone</h6>
                                    <p className="text-muted mb-0">
                                        +95 9 672 961 461
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex mb-4">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="text-primary fs-4 me-3"
                                />

                                <div>
                                    <h6 className="mb-1">Email</h6>
                                    <p className="text-muted mb-0">
                                        support@shopx.com
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex mb-4">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="text-primary fs-4 me-3"
                                />

                                <div>
                                    <h6 className="mb-1">Address</h6>
                                    <p className="text-muted mb-0">
                                        Mawlamyine, Myanmar
                                    </p>
                                </div>
                            </div>

                            

                        </div>

                    </div>


                    {/* Contact Form */}
                    <div className="col-md-7">

                        <div className="card shadow border-0 rounded-4 p-4">

                            <h4 className="fw-bold mb-4">
                                Send Us a Message
                            </h4>

                            <form>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Your Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">
                                        Subject
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter subject"
                                    />
                                </div>


                                <div className="mb-3">
                                    <label className="form-label">
                                        Message
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="5"
                                        placeholder="Write your message..."
                                    ></textarea>
                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-primary px-4"
                                >
                                    Send Message
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

export default ContactPage;