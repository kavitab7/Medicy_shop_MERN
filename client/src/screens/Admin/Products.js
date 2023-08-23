import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Products = () => {
    const [products, setProducts] = useState([]);
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);

        } catch (error) {
            console.log(error);
            toast.error("something went wrong in getting products");
        }
    }
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout>
            <div className="container-fluid m-3 p-3 ">
                <div className="row dashboard">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All products</h1>
                        <div className="d-flex adminProducts flex-wrap">
                            {products?.map((p) => (
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className="product-link" >
                                    <div className="card m-2" >
                                        <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                        <div className="card-body">
                                            <h5 className="card-title" >{p.name}</h5>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products