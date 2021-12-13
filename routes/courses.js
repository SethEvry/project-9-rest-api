const express = require("express");
const { authenticateUser } = require("../middleware/authenticateUser");
const { errorCatcher } = require("../middleware/errorCatcher");
const { User, Course } = require("../models");

const router = express.Router();

// /api/courses
/**
 * retrieves all courses with associated user
 */
router.get(
  "/",
  errorCatcher(async (req, res) => {
    const courses = await Course.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
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

/**
 * creates a new course
 */
router.post(
  "/",
  authenticateUser,
  errorCatcher(async (req, res) => {
    try {
      // is a userId isn't explicitly set, makes it the id of the current user
      const userId = req.body.userId ? req.body.userId : req.currentUser.id;
      const body = { ...req.body, userId };
      const course = await Course.create(body);
      res.redirect(201, `/api/courses/${course.id}`);
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

/**
 * retrieves a single course and associated user
 */
router.get(
  "/:id",
  errorCatcher(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "emailAddress"],
        },
      ],
    });
    if (course) {
      res.status(200).json(course);
    } else {
      const error = new Error("Course does not exist");
      error.status = 400;
      throw error;
    }
  })
);

/**
 * updates a course if current user is the owner
 *
 */
router.put(
  "/:id",
  authenticateUser,
  errorCatcher(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      if (course.userId === req.currentUser.id) {
        await course.update(req.body);
        res.status(204);
        res.end();
      } else {
        const error = new Error("Authorization failed");
        error.status = 401;
        throw error;
      }
    } else {
      const error = new Error("Course does not exist");
      error.status = 400;
      throw error;
    }
  })
);

/**
 * deletes a course if current user is the owner
 */
router.delete(
  "/:id",
  authenticateUser,
  errorCatcher(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      if (course.userId === req.currentUser.id) {
        await course.destroy();
        res.status(204);
        res.end();
      } else {
        const error = new Error("Authorization failed");
        error.status = 401;
        throw error;
      }
    } else {
      const error = new Error("Course does not exist");
      error.status = 400;
      throw error;
    }
  })
);

module.exports = router;
