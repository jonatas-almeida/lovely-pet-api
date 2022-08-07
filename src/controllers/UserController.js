const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

const schema = require('../schemas/UserSchema');
const utilService = require('../utils/UtilService');

const User = mongoose.model('user', schema.userSchema);

module.exports = {

    // Cadastrar usuário
    register(req, res) {
        if (req.body) {
            const newUser = new User({
                user_name: req.body.user_name,
                user_email: req.body.user_email,
                user_full_name: req.body.user_full_name,
                user_cpf: req.body.user_cpf,
                user_occupation: req.body.user_occupation,
                password: req.body.password
            })

            newUser.save(function (err) {
                if (!err) {
                    res.send({
                        message: "Cadastrado com sucesso!",
                        status: res.statusCode
                    })
                } else {
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
    },

    // Login do usuário
    login(req, res) {
        if (req.body) {
            User.findOne({ user_email: req.body.user_email }, function (err, result) {
                if (result != null && !err) {
                    bcrypt.compare(req.body.password, result.password, function (err, passResult) {
                        if (passResult === true) {
                            const tokenBody = {
                                id: result._id,
                                user_name: result.user_name,
                                user_full_name: result.user_full_name,
                                user_email: result.user_email
                            }

                            const userToken = jwt.sign(tokenBody, "SecReT");

                            res.send({
                                accessToken: userToken,
                                status: res.statusCode
                            });
                        }
                        else {
                            res.send({
                                message: "Não foi possível fazer o login"
                            });
                        }
                    })
                }
                else {
                    res.send({
                        message: "Não foi possível fazer o login"
                    });
                }
            });
        }
        else {
            res.send({
                message: "Não foi possível fazer o login"
            });
        }
    },

    // Atualiza o usuário
    async updateUser(req, res) {
        const userInfo = await utilService.verifyUserToken(req)

        if (userInfo.status === true) {
            try {
                User.updateOne(
                    { _id: userInfo.user._id },
                    { $set: req.body }, function (err) {
                        if (!err) {
                            res.send({
                                message: "Dados atualizados com sucesso!"
                            })
                        }
                        else {
                            res.send({
                                message: "Não foi possível atualizar os dados!"
                            })
                        }
                    })
            } catch (error) {
                res.send({
                    message: "Não foi possível atualizar os dados!",
                    status: error.statusCode
                })
            }
        }
        else {
            res.send({
                message: "Não foi possível fazer o login"
            })
        }
    }
}