import { Router } from "express";
import { signin, signup } from "../controllers/user.controller.js";
const route = Router();

route.get("/signin", signin);
route.post("/signup", signup);

export default route;
