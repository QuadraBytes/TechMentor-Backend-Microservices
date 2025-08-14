const { Router } = require("express");
const {
    signin,
    register,
    getProfile,
    refreshAccessToken,
    googleSignin
} = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/google-signin", googleSignin);
authRouter.post("/signin", signin);
authRouter.post("/register", register);
authRouter.post("/refresh", refreshAccessToken);
authRouter.get("/profile/:id", getProfile);

module.exports = authRouter;