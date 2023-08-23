import React from 'react'
import { useSearch } from '../Context/search';
import Layout from '../components/Layout';
import '../styles/searchProduct.css';

export default function Search() {
    const [values, setValues] = useSearch();
    return (
        <Layout title={"Search results"}>
            <div className="searchProduct ">
                <div >
                    <h1 className="text-center" >Search Resuts</h1>
                    <h6 className='text-center'>
                        {values?.results.length < 1
                            ? "No Products Found"
                            : `Found ${values?.results.length}`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p) => (
                            <div className="card m-2" key={p._id}>
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">
                                        {p.description.substring(0, 30)}...
                                    </p>
                                    <p className="card-price ">   {p.price.toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                    })}</p>
                                    <button class="btn btn-details ms-1">More Details</button>
                                    <button class="btn btn-addCart ms-1">ADD TO CART</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
