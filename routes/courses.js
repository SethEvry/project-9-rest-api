const express = require("express");
const { authenticateUser } = require("../middleware/authenticateUser");
const { errorCatcher } = require("../middleware/errorCatcher");
const { User, Course } = require("../models");

const router = express.Router();

router.get(
  "/",
  errorCatcher(async (req, res) => {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "emailAddress"],
        },
      ],
    });
    res.status(200).json(courses);
  })
);

router.post(
  "/",
  authenticateUser,
  errorCatcher(async () => {})
);

router.get(
  "/:id",
  errorCatcher(async () => {})
);
router.put(
  "/:id",
  authenticateUser,
  errorCatcher(async () => {})
);
router.delete(
  "/:id",
  authenticateUser,
  errorCatcher(async () => {})
);

module.exports = router;
