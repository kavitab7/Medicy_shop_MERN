const userModel = require('../models/user')
const orderModel = require('../models/orderModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
//const { hashPassword } = require("../helpers/authHelper")

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        return (hashedPassword);
    } catch (err) {
        console.log(err)
    }

}
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);

};



const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, location, answer } = req.body
        if (!name) {
            return res.send({ message: ' name is required' })
        }
        if (!email) {
            return res.send({ message: ' email is required' })
        }
        if (!password) {
            return res.send({ message: ' password is required' })
        }
        if (!phone) {
            return res.send({ message: ' phone is required' })
        }
        if (!location) {
            return res.send({ message: ' location is required' })
        }
        if (!answer) {
            return res.send({ message: ' answer is required' })
        }
        //existing user
        const existuser = await userModel.findOne({ email })
        if (existuser) {
            res.status(200).send({
                success: false,
                message: 'Already exist user',

            })
        }
        //register 

        //saving

        const hashedPassword = await hashPassword(password)

        const user = new userModel({ name: req.body.name, email: req.body.email, phone: req.body.phone, location: req.body.location, password: hashedPassword, answer: req.body.answer }).save()
        console.log(user)

        res.status(201).send({
            success: true,
            message: ' user register successfully',
            user,
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'error in registration',
            //
        })
    }

}

//login

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location,
                role: user.role,
            },
            token,
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'error in login',
        })
    }


}
const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};
const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: " answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: " New Password is required" })
        }

        //check
        const user = await userModel.findOne({ email, answer })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong email or answer"
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: " Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
};
const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, location, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                location: location || user.location,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name");
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile getting orders",
            error,
        });
    }
}


const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer", "name").sort({ createdAt: "-1" });
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While getting all orders",
            error,
        });
    }
}

const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};

module.exports = { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController }