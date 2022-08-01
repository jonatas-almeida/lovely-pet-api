const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

module.exports = {
    verifyUserToken(req, res) {
        if (req.headers.authorization) {
            const userToken = req.headers.authorization.toString().splite(' ')[1]

            if (jwt.verify(userToken, 'SecReT') === true) {
                const userInfo = jwt_decode(userToken);

                return {
                    user: userInfo,
                    status: true
                }
            }
            else {
                return {
                    user: null,
                    status: false
                }
            }
        }
    }
}