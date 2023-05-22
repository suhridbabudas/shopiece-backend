const jwt = require("jsonwebtoken");

module.exports = async function (req, res, proceed) {
    try {
        const token = await req.header("Authorization").replace("Bearer ", "");
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (Date.now() >= decodedToken.exp * 1000) {
            res.status(401).json({
                error: `Not Authorised.`,
            });
        } else {
            const user = await Users.findOne({
                Email: decodedToken.subject,
                UserJSONToken: token,
            });
            if (!user) {
                res.status(401).json({
                    error: `Not Authorised.`,
                });
            } else {
                req.user = user;
                return proceed();
            }
        }
    } catch (e) {
        res.status(401).json({
            error: "Not Authorised."
        });
    }
};