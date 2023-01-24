const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        console.log(req.cookies);
        if (!token) return res.redirect("http://localhost:3000/login");

        const verified = jwt.verify(token, "wu1tfXw2N4rE8$ASd$L*ADsUQ94gLIXRO5EbrHXzxcwRy#05IF");


        req.user = verified.user;

        next();
    } catch (err) {
        console.error(err);
        res.status(200).json({ errorMessage: "Unauthorized" });
    }
}

module.exports = auth;