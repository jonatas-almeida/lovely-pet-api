const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: [true, 'É necessário um nome de usuário para o cadastro']
    },
    user_full_name: {
        type: String,
        required: [true, 'É obrigatório o nome completo para o cadastro']
    },
    user_email: {
        type: String,
        required: [true, 'O campo de e-mail é obrigatório']
    },
    user_cpf: {
        type: Number,
        required: [true, 'O CPF é obrigatório']
    },
    user_occupation: {
        type: String,
        required: [true, 'A profissão é obrigatória']
    },
    password: {
        type: String,
        required: [true, 'É necessário uma senha para o novo usuário']
    }
})

module.exports = { userSchema }