import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams,Link,useNavigate } from "react-router";
import TopnavBar from "../components/TopnavBar";

import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar,faSpinner,faTag,faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProductDetailPage = ()=>{

    const navigate = useNavigate();

    const {id} = useParams();
    const [item,setItem] = useState(null);
    const [selectedColor,setSelectedColor] = useState("");
    const [selectedSize,setSelectedSize] = useState("");
    const [selectedQty,setSelectedQty] = useState(1);
    const [relatedProducts,setRelatedProducts] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/allproducts/${id}`)
        .then(res=>{
            setItem(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },[id]);

    useEffect(() => {

        if (!item) return;
    
        axios
            .get("http://localhost:5000/api/products")
            .then(res => {
    
                const sameCategory = res.data.filter(product => {
    
                    // Don't show current product
                    if (product.id === item.id) return false;
    
                    const productCategories = Array.isArray(product.category)
                        ? product.category
                        : [product.category];
    
                    const itemCategories = Array.isArray(item.category)
                        ? item.category
                        : [item.category];
    
                    // At least one category must match
                    return productCategories.some(category =>
                        itemCategories.includes(category)
                    );
                });
    
                const randomProducts = [...sameCategory]
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 6);
    
                setRelatedProducts(randomProducts);
    
            })
            .catch(err => {
                console.log(err);
            });

            
    
    }, [item]);

    const addtocardHandler = ()=>{

        {
            if(item.size && !selectedSize){
                toast.error("Please select a size!");
                return;
            }
        }

        {
            if(item.color && !selectedColor){
                toast.error("Please select a color!");
                return;
            }
        }

        const oldcarts = JSON.parse(localStorage.getItem("carts")) || [];

        const addtocartdata = {
            id:item.id,
            title:item.title,
            description:item.description,
            image:item.image,
            price:item.price,
            size:selectedSize,
            color:selectedColor,
            qty:selectedQty
        }

        const allcarts = [...oldcarts,addtocartdata];

        localStorage.setItem("carts",JSON.stringify(allcarts));

        
        

        setSelectedSize("");
        setSelectedColor("");
        setSelectedQty(1);

        toast.success(`${item.title} successfully added to cart.`);

    }

    if (!item) {
        return (
            <>
                <TopnavBar width="col-12" />
                <div className="container vh-100 d-flex justify-content-center align-items-center text-center mt-5">
                    <h4>Loading<FontAwesomeIcon icon={faSpinner} spin className="text-warning" /></h4>
                </div>
            </>
        );
    }


    return (
        <>
            <TopnavBar width="col-12" />
            <ToastContainer />
            <div className="container mt-5 pt-5">
            <button type="button" className="btn btn-outline-dark fw-bold mb-3" onClick={()=>{navigate(-1)}}><FontAwesomeIcon icon={faArrowLeft} className="me-1 text-primary" />Back</button>
                <div className="card rounded-4 shadow-lg p-5">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={item.image} alt={item.title} className="img-fluid rounded-4" style={{maxHeight:"450px",objectFit:"cover"}} />
                        </div>
                        <div className="col-md-6">
                            <h3>{item.title}</h3>
                            <p><strong>Description: </strong>{item.description}</p>
                            <hr />
                            {/* {
                                Array.from({length:5}).map((_,idx)=>(
                                    <FontAwesomeIcon icon={faStar} key={idx} className={Math.floor(item.rating) > idx ? "text-warning" : "text-secondary"}  />
                                ))
                            } */}
                            <p><FontAwesomeIcon icon={faStar} className="text-warning me-1" /><strong>{item.rating}</strong>/<strong>5</strong></p>
                            <p className="my-3 h6"><FontAwesomeIcon icon={faTag} className="text-primary me-1" />{item.originalprice && (<span className="me-3" style={{textDecoration:"line-through",textDecorationColor:"red",textDecorationThickness:"3px"}}>{item.originalprice} MMK</span>)}{item.price} MMK</p>
                            <form action="" className="">
                            {
                                item.size && (
                                    <select name="" id="" value={selectedSize} className="form-select" onChange={(e)=>{setSelectedSize(e.target.value)}} required >
                                        <option value="" disabled>Choose Size</option>
                                        {item.size.map((eachsize,idx)=>(
                                            <option value={eachsize} key={idx}>{eachsize}</option>
                                        ))}
                                    </select>
                                )
                                
                            }
                            {
                                item.color && (
                                    <select name="" id="" value={selectedColor} className="form-select mt-2" onChange={(e)=>{setSelectedColor(e.target.value)}} required>
                                        <option value="" disabled>Choose Color</option>
                                        {item.color.map((eachcolor,idx)=>(
                                            <option value={eachcolor} key={idx}>{eachcolor}</option>
                                        ))}
                                    </select>
                                )
                            }
                            
                                <p className="mt-2 mb-1">Quantity</p>
                                <div className="input-group" style={{width:"150px"}}>
                                    <button type="button" className="btn btn-outline-secondary" onClick={()=>{setSelectedQty(prev=>Math.max(1,prev-1))}} disabled={selectedQty === 1}>-</button>
                                    <input type="number" id="qty" className="form-control text-center" min="1" value={selectedQty} onChange={(e)=>{setSelectedQty(Math.max(1,Number(e.target.value)))}}  />
                                    <button type="button" className="btn btn-outline-secondary" onClick={()=>{setSelectedQty(prev=>prev+1)}}>+</button>
                                </div>
                            
                                <button type="button" className="btn btn-primary mt-3" onClick={()=>{addtocardHandler()}}>Add to cart</button>
                            </form>
                           
                            <hr />
                            <div>
                                <h6>Material</h6>
                                <small>{item.material}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">

                <h3 className="text-center mb-4">
                    Related Products
                </h3>

                <div className="row g-3">

                    {relatedProducts.map(product => (

                        <div
                            className="col-lg-2 col-md-4 col-sm-6"
                            key={product.id}
                        >

                            <div className="card h-100 shadow-sm">

                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="card-img-top p-2"
                                    style={{
                                        height: "180px",
                                        objectFit: "contain"
                                    }}
                                />

                                <div className="card-body d-flex flex-column">

                                    <h6 className="card-title">
                                        {product.title}
                                    </h6>

                                    <div className="mb-2">

                                        {Array.from({ length: 5 }).map(
                                            (_, idx) => (
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    key={idx}
                                                    className={
                                                        Math.floor(
                                                            product.rating
                                                        ) > idx
                                                            ? "text-warning"
                                                            : "text-secondary"
                                                    }
                                                />
                                            )
                                        )}

                                    </div>

                                    <p className="text-primary fw-semibold">
                                        <FontAwesomeIcon
                                            icon={faTag}
                                            className="me-1"
                                        />
                                        {product.price} MMK
                                    </p>

                                    <Link
                                        to={`/allproducts/${product.id}`}
                                        className="btn btn-dark btn-sm mt-auto"
                                    >
                                        View
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </>
    )
}

export default ProductDetailPage;

const alldatas = [
    // Part 1
    // Part 2
    // Part 3
    // Part 4
];