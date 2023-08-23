import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom';
import vid from '../Images/404.mp4'
export default function PageNotFound() {
    return (
        <>
            <Layout title={"go back- page not found"}>
                <div className="pnf">
                    <video autoPlay loop muted>
                        <source src={vid} type="video/mp4" />
                    </video>
                    <h1 className="pnf-title">404</h1>
                    <h2 className="pnf-heading">Oops ! Page Not Found</h2>
                    <Link to="/" className="pnf-btn">
                        Go Back
                    </Link>
                </div>
            </Layout>
        </>
    )
}
