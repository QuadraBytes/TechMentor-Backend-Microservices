require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());
app.use(express.json());

const {
    AUTH_SERVICE_URL,
    USER_SERVICE_URL,
    COURSE_SERVICE_URL,
    AI_SERVICE_URL,
} = process.env;

app.get("/", (req, res) => {
    res.send("🛡️ API Gateway is running");
});

// Route to Auth Service
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
});

app.use(
    "/api/v1/auth",
    createProxyMiddleware({
        target: AUTH_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { "^/api/v1/auth": "/api/v1/auth" },
    })
);

// Route to User Service
app.use(
    "/api/v1/user",
    createProxyMiddleware({
        target: USER_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { "^/api/v1/user": "/api/v1/user" },
    })
);

// app.use(
//     "/api/v1/student",
//     createProxyMiddleware({
//         target: USER_SERVICE_URL,
//         changeOrigin: true,
//         pathRewrite: { "^/api/v1/student": "/api/v1/student" },
//     })
// );
// app.use(
//     "/api/v1/instructor",
//     createProxyMiddleware({
//         target: USER_SERVICE_URL,
//         changeOrigin: true,
//         pathRewrite: { "^/api/v1/instructor": "/api/v1/instructor" },
//     })
// );

// Route to Course Service
app.use(
    "/api/v1/course",
    createProxyMiddleware({
        target: COURSE_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { "^/api/v1/course": "/api/v1/course" },
    })
);

// Route to AI Assistant Service
app.use(
    "/api/v1/ai",
    createProxyMiddleware({
        target: AI_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { "^/api/v1/ai": "/api/v1/ai" },
    })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 API Gateway running at http://localhost:${PORT}`);
});
