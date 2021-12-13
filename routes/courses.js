const e = require("express");
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
  errorCatcher(async (req, res) => {
      try{
        const course = await Course.create(req.body);
        res.redicrect(201, `/api/courses/${course.id}`)
      } catch(error) {

      }
  })
);

router.get(
  "/:id",
  errorCatcher(async (req, res) => {
      const course = await Course.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["firstName", "lastName", "emailAddress"],
          },
        ],
      });
      if(course) {
          res.status(200).json(course);
      } else {
          const error = new Error('Course does not exist');
          error.status = 400;
          throw error;
      }
  })
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
