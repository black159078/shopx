import React from "react";
import {NavLink,useLocation} from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft,faCircleChevronRight,faShirt,faPersonDress,faSocks,faBrush,faGem,faChargingStation,faTrowel,faBabyCarriage,faSprayCanSparkles,faPalette,faStapler,faGuitar,faVolleyball,faKitchenSet,faBook,faBowlFood,faHouseChimney,faGamepad,faBagShopping,faClock } from '@fortawesome/free-solid-svg-icons'

import TopnavBar from "./../components/TopnavBar";

const categories = [
    {name:"Men Fashion",slug:"menfashion",value:[{name:"Shirts",slug:"shirts"},{name:"Jeans",slug:"jeans"},{name:"Jackets",slug:"jackets"}],icon:faShirt},
    {name:"Girl Fashion",slug:"girlfashion",value:[{name:"Dresses",slug:"dresses"},{name:"Tops",slug:"tops"},{name:"Skirts & Pants",slug:"skirts"}],icon:faPersonDress},
    {name:"Shoes",slug:"shoes",value:[{name:"Sneakers",slug:"sneakers"},{name:"Heels",slug:"heels"},{name:"Slippers",slug:"slippers"}],icon:faSocks},
    {name:"Jewellery",slug:"jewellerys",value:[{name:"Necklaces",slug:"necklaces"},{name:"Rings",slug:"rings"},{name:"Handchains",slug:"handchains"}],icon:faGem},
    {name:"Drawing & Art",slug:"drawing",value:[{name:"Drawing papers",slug:"drawingaccessories"},{name:"Art supplies",slug:"artsupplies"}],icon:faBrush},
    {name:"Electornics",slug:"electornics",value:[{name:"Smartphones",slug:"smartphones"},{name:"Computers",slug:"computers"},{name:"Power banks",slug:"powerbanks"},{name:"Electornic supply",slug:"electornicsupplies"}],icon:faChargingStation},
    {name:"Gardening",slug:"gardening",value:[{name:"Plants & Seeds",slug:"plantsandseeds"},{name:"Gardening tools",slug:"gardeningtools"}],icon:faTrowel},
    {name:"Baby & Kids",slug:"babyandkid",value:[{name:"Baby clothes",slug:"babyclothes"},{name:"Toys",slug:"toys"},{name:"Baby care items",slug:"babycareitems"}],icon:faBabyCarriage},
    {name:"Perfumes",slug:"perfumes",value:[{name:"Authentics",slug:"authentics"},{name:"Inspire",slug:"inspires"}],icon:faSprayCanSparkles},
    {name:"Cosmetics",slug:"cosmetics",value:[{name:"skincare",slug:"skincares"},{name:"makeup",slug:"makeups"}],icon:faPalette},
    {name:"Stationery",slug:"stationery",icon:faStapler},
    {name:"Music",slug:"music",icon:faGuitar},
    {name:"Sport",slug:"sport",icon:faVolleyball},
    {name:"Kitchen",slug:"kitchen",icon:faKitchenSet},
    {name:"Books",slug:"books",icon:faBook},
    {name:"Pet supplies",slug:"petsupplies",icon:faBowlFood},
    {name:"Decorations",slug:"decorations",icon:faHouseChimney},
    {name:"Gaming",slug:"gamingaccessories",icon:faGamepad},
    {name:"Bags",slug:"bags",icon:faBagShopping},
    {name:"Watches",slug:"watches",icon:faClock}
];

const LeftsideBar = ()=>{

    const location = useLocation();

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light">
                <button className="navbar-toggler ms-auto mb-2" data-bs-toggle="collapse" data-bs-target="#leftbar"  >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div id="leftbar" className="collapse navbar-collapse">
                    <div className="container-fluid">
                        <div className="row">
                            {/* start left side bar */}
                            <div className="col-lg-2 col-md-3 bg-light text-dark fixed-top overflow-auto vh-100">
                                <ul className="navbar-nav flex-column text-sm">
                                    <li className="nav-item fw-bold w-100">Categories</li>
                                    {
                                        categories.map((category,idx)=>{

                                            const isCategoryActive = location.pathname.startsWith(`/category/${category.slug}`)

                                            return(
                                                <li key={idx} className="nav-item text-dark opacity-90">{category.value ? (
                                                    <>
                                                        <a href="javascript:void(0);" className="nav-link m-0 p-2 d-flex justify-content-between align-items-center fw-semibold hovereffect" data-bs-toggle="collapse" data-bs-target={`#category-${idx}`} aria-expanded={isCategoryActive} onClick={(e)=>e.preventDefault()}><span><FontAwesomeIcon icon={category.icon} className="me-1" />{category.name}</span> <FontAwesomeIcon icon={faAngleLeft} className="ms-2" /></a>
                                                        <ul id={`category-${idx}`} className={`collapse ${isCategoryActive ? "show" : ""}`} >
                                                            {category.value.map((child,index)=>(
                                                                <li key={index}><NavLink to={`/category/${category.slug}/${child.slug}`} className={({isActive})=>isActive ? "nav-link active-link hovereffect" : "nav-link hovereffect text-start"}><FontAwesomeIcon icon={faCircleChevronRight} className="me-2" />{child.name}</NavLink></li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                
                                                
                                                ) : (
                                                    <>
                                                        <NavLink to={`/category/${category.slug}`} className={({isActive})=>isActive ? "nav-link active-link d-flex justify-content-between align-items-center fw-semibold hovereffect" : "nav-link d-flex justify-content-between align-items-center fw-semibold hovereffect"} ><span><FontAwesomeIcon icon={category.icon} className="me-1" />{category.name}</span></NavLink>
                                                    </>
                                                )}  
                                                </li>
                                            )
                                            
                                            
                                        })
                                    }
                                </ul>
                            </div>
                            {/* end left side bar */}
                            {/* start top nav bar */}
                            <TopnavBar />
                            {/* end top nav bar */}
                        </div>
                    </div>
                    
                </div>
                
            </nav>

            
        </>
    )
}

export default LeftsideBar;


