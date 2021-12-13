"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Course, {
        as: "user",
        foreignKey: {
          fieldName: "userId",
          allowNull: false,
        },
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The user must have a first name",
          },
          notEmpty: {
            msg: "The user must have a first name",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "The user must have a last name",
          },
          notEmpty: {
            msg: "The user must have a last name",
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "A user with that email address already exists",
        },
        validate: {
          notNull: {
            msg: "The user must have a email address",
          },
          notEmpty: {
            msg: "The user must have a email address",
          },
          isEmail: {
            msg: "The user must have a valid email address",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          this.setDataValue("password", bcrypt.hashSync(val, 10));
        },
        validate: {
          notNull: {
            msg: "A password is required",
          },
          notEmpty: {
            msg: "Please provide a password",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
