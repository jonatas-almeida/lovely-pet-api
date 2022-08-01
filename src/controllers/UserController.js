const mongoose = require("mongoose");

const schema = require('../schemas/UserSchema');
const utilService = require('../utils/util-service');

const User = mongoose.model('user', schema.userSchema);

module.exports = {

    // Cadastrar usuário
    register(req, res) {
        if(req.body) {
            const newUser = new User({
                user_name: req.body.user_name,
                user_email: req.body.user_email,
                user_full_name: req.body.user_full_name,
                user_cpf: req.body.user_cpf,
                user_occupation: req.body.user_occupation,
                password: req.body.password
            })

            newUser.save(function(err) {
                if(!err) {
                    res.send({
                        message: "Cadastrado com sucesso!",
                        status: res.statusCode
                    })
                }else {
                    res.send({
                        message: "Não foi possível fazer o cadastro!",
                        error: err.message,
                        status: res.statusCode
                    })
                }
            })
        }
        else {
            res.send({
                message: "Não foi possível fazer o cadastro!",
                status: null
            })
        }
    }
}