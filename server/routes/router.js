import authRouter from "./authRouter.js"
import middlewareVerify from "./middlewareVerify.js"

const allRoutes = (app) =>{
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/middleware",middlewareVerify)

}

export default allRoutes;