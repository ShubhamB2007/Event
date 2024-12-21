const userService = require('../services/signup')

const createUser = async(req,res)=>{
    try {
        const userData = req.body
        const user = userService.createUser(userData)
        res.status(201).json({user:user,message:"User Successfully Created"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:error.message})
    }
}

module.exports = {createUser} 