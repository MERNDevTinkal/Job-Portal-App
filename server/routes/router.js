import authRouter from "./authRouter.js"
import profileRoute from "./profileRoute.js"
import jobRouter from "./jobRouter.js"
import applicationRouter from "./applicationRouter.js"

const allRoutes = (app) =>{
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/profile",profileRoute);
    app.use("/api/v1/job",jobRouter);
    app.use("/api/v1/application",applicationRouter);


}

export default allRoutes;