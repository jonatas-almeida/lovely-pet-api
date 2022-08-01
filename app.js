const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { route } = require('./routes');
class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.connectToServer();
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
        try {
            mongoose.connect("mongodb://localhost:27017/LovelyPetDB")

            this.server.listen(8080, function() {
                console.log("Server listening on port 8080");
            });
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = App;