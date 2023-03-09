const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res){
        res.render('auth/login')
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body

        //password match
        if(password != confirmpassword){
            req.flash('error', 'As senhas são diferentes')
            res.render('auth/register')
            return
        }

        const checkIfUserExists = await User.findOne({where: {email: email}})

        if(checkIfUserExists){
            req.flash('error', 'O e-mail já está em uso')
            res.render('auth/register')
            return
        }
    }
}