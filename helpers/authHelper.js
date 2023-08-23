const bcrypt = require('bcrypt')
const userModel = require('../models/user')

const hashPassword = async (password) => {
    try {


        const hashedPassword = await bcrypt.hash(password, 10);

        console.log(hashedPassword);

        const comparePassword = await bcrypt.compare(password, hashedPassword);
    } catch (err) {
        console.log(err)
    }

}

// const comparePassword = async(password , hashedPassword) => {
//     return bcrypt.compare(password, hashedPassword);

// };
module.exports = {
    hashPassword: hashPassword(),
    // comparePassword: comparePassword()
};

