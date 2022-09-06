const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

module.exports = {
    verifyUserToken(req, res) {
        if (req.headers.authorization) {
            const userToken = req.headers.authorization.toString().split(' ')[1]

            if (jwt.verify(userToken, 'SecRe')) {
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