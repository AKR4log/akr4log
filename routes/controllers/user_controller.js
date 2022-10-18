const models = require("../../services/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const ApiError = require("../../services/error/api_errors");

const generationJwt = (id, phone, role, code) => {
  return jwt.sign({ id, phone, role, code }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async connect(req, res, next, { phoneBot, roleBot }) {
    try {
      const { phone, role } = req.body;
      const generation_code = crypto
        .randomInt(0, 1000000)
        .toString()
        .padStart(6, "0");
      if (!phone) {
        return next(ApiError.badRequest("Not a complete request"));
      }
      const validate = await models.users.findOne({
        where: { phone: phoneBot ?? phone },
      });
      if (validate) {
        const token = generationJwt(
          validate.id,
          validate.phone,
          validate.role,
          generation_code
        );
        console.log(generation_code);
        return res.status(200).json({ status: "Auth", token: token });
      } else {
        const token = generationJwt(
          null,
          phoneBot ?? phone,
          roleBot ?? role,
          generation_code
        );
        console.log(generation_code);
        return res.status(201).json({ status: "Send code", token: token });
      }
    } catch (err) {
      return next(ApiError.badRequest("Error: " + err));
    }
  }

  async confirmation(req, res, next) {
    try {
      const { code_enter } = req.body;
      if (req.user.code === code_enter) {
        const user = await models.users.create({
          phone: req.user.phone,
          role: req.user.role,
        });
        const token = generationJwt(
          user.id,
          user.phone,
          user.role,
          crypto.randomInt(0, 1000000).toString().padStart(6, "0")
        );
        return res
          .status(201)
          .json({ status: "Successful code confirmation", token: token });
      } else {
        return res.status(409).json({ message: "Confirmation error" });
      }
    } catch (err) {
      return ApiError.badRequest("Error: " + err);
    }
  }

  async check(req, res, next) {
    try {
      const token = generationJwt(req.user.id, req.user.phone, req.user.role);
      return res.json({ token: token });
    } catch (err) {
      return ApiError.badRequest("Error: " + err);
    }
  }
}

module.exports = new UserController();
