import { Router } from "express";
import * as UserControllers from "../users/controllers.js";

const route = Router();

route.get("/", UserControllers.getUser);
route.get("/filter/:filter", UserControllers.getUsersByUserName);
route.put("/:id", UserControllers.updateUser);
route.delete("/:id", UserControllers.deleteUser);
route.put("/:id/follow", UserControllers.followUser);
route.put("/:id/unfollow", UserControllers.unfollowUser);
route.get("/:userId/followings", UserControllers.getUserFollowings);

export default route;