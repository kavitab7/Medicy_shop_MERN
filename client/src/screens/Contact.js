import React from 'react'
import Layout from '../components/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import vid from "../Images/contact.mp4";

export default function Contact() {
    return (
        <>
            <Layout title={"Contact us"}>
                <div className="row contactus ">
                    <div className="col-md-6 ">
                        <video autoPlay loop muted>
                            <source src={vid} type="video/mp4" />
                        </video>

                    </div>
                    <div className="col-md-4">
                        <h1 className=" p-2 text-center">CONTACT US</h1>
                        <p className="text-justify mt-2">
                            Any query about product feel free to call anytime we 24X7
                            time available
                        </p>
                        <p className="mt-3">
                            <BiMailSend /> : www.help@medicyapp.com
                        </p>
                        <p className="mt-3">
                            <BiPhoneCall /> : 120-67453674
                        </p>
                        <p className="mt-3">
                            <BiSupport /> : 1800-0000-0000 (toll free)
                        </p>
                    </div>
                </div>
            </Layout>
        </>
    )
}
