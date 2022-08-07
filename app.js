const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { route } = require('./routes');
class App {
    constructor() {
        this.server = express();

        this.connectToServer();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(
            bodyParser.urlencoded({
                extended: true
            })
        )
    }

    routes() {
        this.server.use(route)
    }

    connectToServer() {
        mongoose.connect("mongodb://localhost:27017/LovelyPetDB")

        this.server.listen(8080, function() {
            console.log("Server listening on port 8080");
        });
    }


}

module.exports = new App().server;