const jwt = require("jsonwebtoken");

const authenticateAuth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ Unauthorized: No token provided");
            return res.status(403).json({
                status: "error",
                message: "Unauthorized: Token missing",
            });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log("❌ Invalid token");
                return res.status(403).json({
                    status: "error",
                    message: "Unauthorized: Invalid token",
                });
            }

            req.user = decoded;
            console.log("✅ Authorized user:", decoded);
            next();
        });
    } catch (error) {
        console.log("❌ Middleware error:", error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
};

module.exports = authenticateAuth;
