import { Router } from "express";
import * as AuthControllers from "../auth/controllers.js";

const route = Router();

route.post("/register", AuthControllers.registerUser);
route.post("/login", AuthControllers.login);

export default route;
