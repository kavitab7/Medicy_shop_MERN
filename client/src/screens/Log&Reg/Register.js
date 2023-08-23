import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import img from '../../Images/sign.png';


export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate()
    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', { name, email, password, phone, location, answer });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                navigate('/login');
            } else {
                toast.error(res.data.message)
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }

    }

    return (
        <>
            <Layout title={'Register '}>
                <div className="login">
                    <div className="login-info">
                        <h1> Register </h1>
                        <form onSubmit={handleSubmit} >
                            <div className="mb-3">
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter your Name' required />
                            </div>
                            <div className="mb-3">
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter your Email' required />
                            </div>

                            <div className="mb-3">
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' required />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter your Phone' required />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter your Address' required />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='What is your favorite place? ' required />
                            </div>

                            <button type="submit" className="btn btn-login">Submit</button>
                        </form>
                    </div>
                    <div className="login-img">
                        <img src={img} alt='login'></img>
                    </div>
                </div>
            </Layout>
        </>
    )
}
