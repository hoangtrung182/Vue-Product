const jwt = require("jsonwebtoken");

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        console.log(token);
        if(token) {
            const accessToken = token.split(" ")[1];
            // console.log(accessToken);
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err) {
                    res.status(403).json({msg: "Token is invalid"});
                    return;
                }

                req.user = user;
                next();
            });
        } else {
            res.status(401).json({msg: "Your're not authenticated"});
            return;
        }
    },
    verifyTokenAndAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            // const {id, admin} = user;
            if(req.user.admin || req.user.id === req.params.id) {
                next();
            } else {
                res.status(403).json({msg: "You're not autherized"});
                return;
            }
        })
    } 
}

module.exports = middlewareController;