import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuth } from '../../Context/auth';
import img from '../../Images/log.png';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', { email, password });
            if (res.data.success) {
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || '/');
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

        <Layout title={'Login'}>
            <div className="login">
                <div className="login-img">
                    <img src={img} alt='login'></img>
                </div>
                <div className="login-info">
                    <h1> Login </h1>
                    <form onSubmit={handleSubmit} >

                        <div className="mb-3">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter your Email' required />
                        </div>

                        <div className="mb-3">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' required />
                        </div>
                        <div className='mb-3'>
                            <button type="button" className="btn btn-forget" onClick={() => { navigate('/forgot-password') }}>Forgot Password</button>
                        </div>
                        <button type="submit" className="btn btn-login">Login</button>
                    </form>
                </div>
            </div>
        </Layout>

    )
}
