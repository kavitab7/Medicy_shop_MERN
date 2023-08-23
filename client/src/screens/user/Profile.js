import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../Context/auth'
import axios from 'axios'
import toast from 'react-hot-toast';
export const Profile = () => {

    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, location } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setLocation(location);
    }, [auth?.user]);

    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.put('/api/v1/auth/profile', { name, email, password, phone, location });
            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls)
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile updated successfully");
            }
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }

    }

    return (
        <Layout title={"Your Profile"} >
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />

                    </div>
                    <div className="col-md-9">
                        <div className='form-container'>
                            <form onSubmit={handleSubmit} >
                                <h4 className="title">User Profile</h4>
                                <div className="mb-3">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" style={{ width: "70%" }} id="exampleInputEmail1" placeholder='Enter your Name' />
                                </div>
                                <div className="mb-3">
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" style={{ width: "70%" }} id="exampleInputEmail1" placeholder='Enter your Email' disabled />
                                </div>

                                <div className="mb-3">
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" style={{ width: "70%" }} id="exampleInputPassword1" placeholder='Enter your Password' />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" style={{ width: "70%" }} id="exampleInputEmail1" placeholder='Enter your Phone' />
                                </div>
                                <div className="mb-3">
                                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" style={{ width: "70%" }} id="exampleInputEmail1" placeholder='Enter your Address' />
                                </div>

                                <button type="submit" className="btn btn-success">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
