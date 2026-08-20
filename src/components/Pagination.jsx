import React, { useState,useEffect,useMemo } from "react";
import {Link,useNavigate} from 'react-router';
import {useSelector,useDispatch} from "react-redux";
import { fetchalldata } from "./../store/paginationSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag,faSpinner,faTriangleExclamation,faStar } from "@fortawesome/free-solid-svg-icons";


const Pagination = ()=>{

    const {loading,error,datas} = useSelector(state=>state.products);
    // console.log(datas);
    const {searchtext} = useSelector(state=>state.search);
    // console.log(searchtext);
    const [page,setPage] = useState(1);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchalldata());
    },[dispatch]);

    useEffect(() => {
        if(page > totalpage) setPage(1);
    }, [searchtext]);

    function shuffleArray(arr) {
        const newArr = [...arr];
    
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
    
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
    
        return newArr;
    }

    const randomAddDatas = shuffleArray(datas);

    const filtered = useMemo(()=>{

        const query = searchtext.trim().toLowerCase();

        if(!query) return randomAddDatas;

        return randomAddDatas.filter((data)=>(
            
            data.category && 
            (
                Array.isArray(data.category)
                ? data.category.some(cate=>cate.toLowerCase().includes(query))
                : data.category.toLowerCase().includes(query)
            )
            
        ));

    },[randomAddDatas,searchtext]);

        


    const PAGESIZE = 30;
    const totalpage = Math.max(1,Math.ceil(filtered.length/PAGESIZE));
    // console.log(totalpage);
    const dataslice = filtered.slice((page - 1) * PAGESIZE,page * PAGESIZE);
    

    return (
        <>
            <section className="mt-3">

                

                {loading && (
                    <div className="text-center">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-warning" />
                        <p className="mt-2">Loading products...</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger text-center">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" />
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* <nav className="mt-0 mb-2">
                            <ul className="pagination justify-content-center">
                                <li className="page-text">
                                    <button type="button" className="page-link" onClick={()=>setPage(curPage=>Math.max(1,curPage-1))}>prev</button>
                                </li>
                                {
                                    Array.from({length:totalpage}).map((_,idx)=>(
                                        <li className="page-text" key={idx}>
                                            <button type="button" className={`page-link ${page === idx+1 && "active"}`} onClick={()=>setPage(idx+1)}>{idx+1}</button>
                                        </li>
                                    ))
                                }
                                <li className="page-text">
                                    <button type="button" className="page-link" onClick={()=>setPage(curPage=>Math.min(totalpage,curPage+1))} >after</button>
                                </li>
                            </ul>
                        </nav> */}

                        {
                            dataslice.length > 0 && (
                                <div className="text-center mb-2">
                                    <h6 className="display-6">Available Products</h6>
                                </div>
                            )
                        }

                        <div className="row g-2">
                            {dataslice.map(data=>(
                                <div className="col-lg-2 col-md-3 col-sm-4" key={data.id}>
                                    <div className="card border-0 shadow h-100">
                                        <img src={data.image} alt="" className="card-img-top p-3" style={{height:"200px",objectFit:"center"}} />
                                        <div className="card-body">
                                            <h6 className="card-title">{data.title}</h6>
                                            {
                                                Array.from({length:5}).map((_,idx)=>(
                                                    <FontAwesomeIcon key={idx} icon={faStar} className={idx < Math.floor(data.rating) ? "text-warning" : "text-secondary"} />
                                                ))
                                            }
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <div><FontAwesomeIcon icon={faTag} className="text-primary me-1" />{data.price}MMK</div>
                                                <Link to={`/allproducts/${data.id}`} className="btn btn-sm btn-dark">View</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                        
                        {
                            dataslice.length > 0 ? (
                                <nav className="mt-3 mb-2">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-text">
                                            <button type="button" className="page-link" onClick={()=>setPage(curPage=>Math.max(1,curPage-1))}>prev</button>
                                        </li>
                                        {
                                            Array.from({length:totalpage}).map((_,idx)=>(
                                                <li className="page-text" key={idx}>
                                                    <button type="button" className={`page-link ${page === idx+1 && "active"}`} onClick={()=>setPage(idx+1)}>{idx+1}</button>
                                                </li>
                                            ))
                                        }
                                        <li className="page-text">
                                            <button type="button" className="page-link" onClick={()=>setPage(curPage=>Math.min(totalpage,curPage+1))} >after</button>
                                        </li>
                                    </ul>
                                </nav>
                            ) : <p className="text-center fw-bold mt-4 display-6">Products not found!</p>
                        }
                    </>
                )}

                
            </section>
        </>
    )
}

export default Pagination;