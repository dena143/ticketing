import express from "express";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send("hi there hahahahahaha");
});

export { router as currentUserRouter };
