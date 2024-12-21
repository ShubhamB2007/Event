const AuthUser = require('../models/AuthUser')
const bcrypt = require('bcryptjs')

const createUser = async(userData)=>{
    const {name,email,password} = userData
    const hashedPassword = await bcrypt.hash(password, 10)
     
    const newUser = new AuthUser({
        name,
        email,
        password:hashedPassword,
        role:"user"
    })

    const saveUser  = await newUser.save()
    return saveUser
}

module.exports = {createUser}
