import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuth } from '../../Context/auth';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");


    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', { email, newPassword, answer });
            if (res.data.success) {
                toast.success(res.data.message);
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
        <Layout title={'Forgot Password '}>
            <div className="login">
                <div className="login-info">
                    <h1>Forgot Password </h1>
                    <form onSubmit={handleSubmit} >

                        <div className="mb-3">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='Enter your Email' required />
                        </div>

                        <div className="mb-3">
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' required />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter your favorite place' required />
                        </div>

                        <button type="submit" className="btn btn-login">Reset</button>
                    </form>
                </div>
            </div>
        </Layout>

    )
}
