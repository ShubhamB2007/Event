const bcrypt = require('bcrypt')
const User = require('../models/AuthUser')
const {generateToken} = require('../Utils/jwtUtils') 
 
const login = async (email, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log('User not found');
            throw new Error('User not found');
        }

        const validPass = await bcrypt.compare(password, existingUser.password);
        if (!validPass) {
            console.log('Invalid password');
            throw new Error('Invalid Password');
        }

        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        console.error(error);
        throw new Error('Invalid Credentials');
    }
}


module.exports = {login}