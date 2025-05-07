import authRouter from "./authRouter.js"
import profileRoute from "./profileRoute.js"

const allRoutes = (app) =>{
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/profile",profileRoute)

}

export default allRoutes;