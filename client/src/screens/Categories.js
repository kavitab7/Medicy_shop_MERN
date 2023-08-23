import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import useCategory from '../hooks/useCategory';

export const Categories = () => {
    const categories = useCategory();

    return (
        <Layout title={"All categories"}>
            <div className="container">
                <div className="row">
                    {categories.map((c) => {
                        <div className="col-md-6 mb-3 gx-3 gy-3" key={c._id}>
                            <div className="card">
                                <Link to={`/category/${c.slug}`} className='btn btn-primary'>
                                    {c.name}
                                </Link>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </Layout>
    )
}
