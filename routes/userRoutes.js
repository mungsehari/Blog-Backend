import express from "express";
import {
  getAllUsers,
  userLogin,
  userRigister,
} from "../controllers/userController.js";

const userRouter = express.Router();
userRouter.get("/all-users", getAllUsers);

userRouter.post("/register", userRigister);

userRouter.post("/login", userLogin);

export default userRouter;
