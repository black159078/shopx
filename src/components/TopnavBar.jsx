// import React from "react";
// import {useDispatch} from "react-redux";

// import {setSearchtext} from "./../store/searchboxSlice";

// import shopxicon from "./../assets/img/shopX.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping, faCircleUser, faPhoneFlip, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router";

// const menus = [{name:"Contact",icon:faPhoneFlip,route:"/contact"},{name:"Aboutus",icon:faCircleUser,route:"/aboutus"},{name:"Cart",icon:faCartShopping,route:"/carts"}];

// const TopnavBar = ({width="col-lg-10 col-md-9",showSearch=false})=>{

//     const dispatch = useDispatch();

//     return (
//         <>
//             <div className={`${width} fixed-top bg-dark text-light ms-auto m-0 p-0`}>
//                 <nav className="navbar navbar-expand navbar-light justify-content-between align-items-center">
//                     <div>
//                         <span className="ms-2 fw-bold">ShopX</span>
//                         <img src={shopxicon} alt="shopxicon" width="50" height="50" />
//                     </div>
//                     {
//                         showSearch && (
//                             <div className="col-md-6 text-center">
//                                 <div className="input-group">
//                                     <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
//                                     <input type="text" name="search" className="form-control" placeholder="search products by category..." onChange={(e)=>dispatch(setSearchtext(e.target.value))} />
//                                 </div>
//                             </div>
//                         )
//                     }
//                     <span className="d-flex justify-content-end me-5">
//                         <ul className="navbar-nav list-unstyled">
//                             {menus.map((menu,idx)=>(
//                                 <li key={idx} className="nav-item ms-4" style={{cursor:"pointer"}}><Link to={menu.route} className="nav-link text-white">{menu.name}<FontAwesomeIcon icon={menu.icon} className="ms-1" /></Link></li>
//                             ))}
//                         </ul>
//                     </span>
//                 </nav>
//             </div>
//         </>
//     )
// }

// export default TopnavBar;

import React from "react";
import {useDispatch} from "react-redux";

import {setSearchtext} from "./../store/searchboxSlice";

import shopxicon from "./../assets/img/shopX.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCircleUser, faPhoneFlip, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import useCartCount from "../lib/useCartCount";

const menus = [{name:"Contact",icon:faPhoneFlip,route:"/contact"},{name:"Aboutus",icon:faCircleUser,route:"/aboutus"},{name:"Cart",icon:faCartShopping,route:"/carts"}];

const TopnavBar = ({width="col-lg-10 col-md-9",showSearch=false})=>{

    const dispatch = useDispatch();
    const cartCount = useCartCount();

    return (
        <>
            <div className={`${width} fixed-top bg-dark text-light ms-auto m-0 p-0`}>
                <nav className="navbar navbar-expand navbar-light justify-content-between align-items-center">
                    <div>
                        <span className="ms-2 fw-bold">ShopX</span>
                        <img src={shopxicon} alt="shopxicon" width="50" height="50" />
                    </div>
                    {
                        showSearch && (
                            <div className="col-md-6 text-center">
                                <div className="input-group">
                                    <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                                    <input type="text" name="search" className="form-control" placeholder="search products by category..." onChange={(e)=>dispatch(setSearchtext(e.target.value))} />
                                </div>
                            </div>
                        )
                    }
                    <span className="d-flex justify-content-end me-5">
                        <ul className="navbar-nav list-unstyled">
                            {menus.map((menu,idx)=>(
                                <li key={idx} className="nav-item ms-4" style={{cursor:"pointer"}}>
                                    <Link to={menu.route} className="nav-link text-white position-relative">
                                        {menu.name}
                                        <FontAwesomeIcon icon={menu.icon} className="ms-1" />
                                        {menu.name === "Cart" && cartCount > 0 && (
                                            <span className="position-absolute badge rounded-pill bg-danger" style={{top:"-6px",right:"-10px",fontSize:"0.65rem"}}>
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </span>
                </nav>
            </div>
        </>
    )
}

export default TopnavBar;