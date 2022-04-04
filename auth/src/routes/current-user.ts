import express from "express";
import { currentUser } from "@deptickets/common";

const router = express.Router();

console.log("ini currentUser", currentUser);

router.get("/api/users/currentuser", currentUser, (req, res) => {
  return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
