const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res){
        res.render('auth/login')
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async loginPost(req, res){

        const {email, password} = req.body

        const user = await User.findOne({where: {email: email}})
        if(!user){
            req.flash('error', 'Usuário não encontrado')
            res.render('auth/login')

            return 
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)
        if(!passwordMatch){
            req.flash('error', 'Senha inválida')
            res.render('auth/login')

            return 
        }

        req.session.userid = user.id 

        req.flash('success', 'Logado com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })

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

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try{
            const createdUser = await User.create(user)

            req.session.userid = createdUser.id 
            console.log(req.session.userid)

            req.flash('success', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })

        }catch(err){
            console.log(err)
        }

    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }
}