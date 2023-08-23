import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { useCart } from '../Context/cart';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FcSynchronize } from 'react-icons/fc';
import img1 from '../Images/first.png';
import img2 from '../Images/fourth.png';
import img3 from '../Images/4p.jpg';
import img4 from '../Images/5p.jpg';
import img5 from '../Images/customers.png';
import img6 from '../Images/products.png';
import img7 from '../Images/24_7.png';


export default function Home() {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)



    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/get-category');
            if (data?.success) {
                setCategories(data?.category);
            }

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false)
            setProducts(data.products);

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    //get total count
    const getTotal = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/product-count')
            setTotal(data?.total)
        } catch (error) {
            console.log(error);

        }
    }

    //load more
    useEffect(() => {
        if (page === 1) return;
        loadMore();
    }, [page]);

    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products, ...data?.products]);
        } catch (error) {
            setLoading(false)
            console.log(error);

        }
    }

    //filter by category 
    const handleFilter = async (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter((c) => c !== id);
        }
        setChecked(all);
    }
    useEffect(() => {
        if (!checked.length || radio.length) getAllProducts();
    }, [checked.length, radio.length]);

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filter product
    const filterProduct = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio })
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Layout title={'Medicy app - shop medicines online '}>
                <div className='carousel'>
                    <Carousel
                        infiniteLoop
                        autoPlay
                        showStatus={false}
                        showArrows={false}
                        showThumbs={false}
                        interval={2000}
                    >
                        <div>
                            <img src={img1} alt="Item1" />
                        </div>
                        <div>
                            <img src={img2} alt="Item2" />

                        </div>
                        <div>
                            <img src={img3} alt="Item3" />

                        </div>
                        <div>
                            <img src={img4} alt="Item4" />

                        </div>
                    </Carousel>
                </div>
                <div className="home">
                    <div className="row  mt-3">
                        <div className="col-md-3 filter">
                            <h4 className="text-center">Filter By category</h4>
                            <div className="d-flex flex-column category-box">
                                {categories?.map((c) => (
                                    <Checkbox className='filter-cat' key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                        {c.name}
                                    </Checkbox>

                                ))}
                            </div>
                            {/* price filter */}
                            {/* <h4 className="text-center mt-4">Filter By Price</h4>
                        <div className="d-flex flex-column">
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {Prices?.map((p) => {
                                    <div key={p._id}>
                                        <Radio value={p.array}>{p.name}</Radio>
                                    </div>
                                })}
                            </Radio.Group>
                        </div> */}
                            <div className="d-flex flex-column">
                                <button className='btn btn-danger' onClick={() => window.location.reload()}>
                                    Reset Filters
                                </button>
                            </div>

                        </div>
                        <div className="col-md-9">
                            <h1 className="text-center">All products
                            </h1>
                            <div className="d-flex flex-wrap">
                                {products?.map((p) => (

                                    <div className="card m-2 " key={p._id} >
                                        <img src={`/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top " alt={p.name} />

                                        <div className="card-body">
                                            <h5 className="card-title product-name">{p.name}</h5>
                                            <p className="card-text">{p.description.substring(0, 30)}...</p>
                                            <h5 className=" card-price">
                                                {p.price.toLocaleString("en-IN", {
                                                    style: "currency",
                                                    currency: "INR",
                                                })}
                                            </h5>
                                            <button className='btn btn-details ms-1' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                            <button className='btn btn-addCart ms-1' onClick={() => {
                                                setCart([...cart, p]);
                                                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                                                toast.success("Item added to cart");
                                            }} >Add To Cart</button>
                                        </div>
                                    </div>

                                ))}
                            </div>
                            <div className="m-2 p-3">
                                {products && products.length < total && (
                                    <button className='btn btn-load' onClick={(e) => {
                                        e.preventDefault();
                                        setPage(page + 1);
                                    }}>
                                        {loading ? "Loading..." : "Load more"} <FcSynchronize />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="features">
                        <div className="feature">
                            <img src={img5} alt="Item1" />
                            <h5>10000+</h5>
                            <p>Happy customers served</p>
                        </div>
                        <div className="feature">
                            <img src={img6} alt="Item1" />
                            <h5>500+</h5>
                            <p>Top madicines available</p>
                        </div>
                        <div className="feature">
                            <img src={img7} alt="Item1" />
                            <h5>24/7</h5>
                            <p>Online support</p>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )

}
