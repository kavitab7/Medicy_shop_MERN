import React from 'react'
import Layout from '../components/Layout'
import '../styles/about.css';
export default function About() {
    return (
        <>
            <Layout title={'About us - Medicy app '}>
                <div className="about ">
                    <div className="content">
                        <p >
                            <h4>  About Us: Your Trusted Partner in Health and Wellness</h4>
                            Welcome to MediCY ! We are your premier destination for all things health and wellness, offering a comprehensive range of medical products and supplies to cater to your diverse needs. Our commitment is rooted in providing you with top-notch products, exceptional service, and a seamless online shopping experience that prioritizes your well-being.
                        </p>
                    </div>
                </div>
            </Layout>
        </>
    )
}
