import prisma from "../Db/db.config.js";
import vine, { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validations/authValidations.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

class AuthController {
  static async register(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(body);

      const findUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (findUser) {
        return res.status(400).json({
          errors: {
            email: "This email is already taken please use another one",
          },
        });
      }

      const salt = bcrypt.genSaltSync(10);
      payload.pass = bcrypt.hashSync(payload.pass, salt);

      const user = await prisma.user.create({
        data: payload,
      });

      return res.json({
        status: 200,
        message: "User Created Successfully",
        user,
      });
    } catch (err) {
      console.log("The error is : ", err);
      if (err instanceof errors.E_VALIDATION_ERROR) {
        // console.log(err.message);
        return res.status(400).json({ err: err.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "something went wrong . Please try again",
        });
      }
    }
  }
  
  static async login(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(loginSchema);
      const payload = await validator.validate(body);

      const findUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (findUser) {
        if (!bcrypt.compareSync(payload.pass, findUser.pass)) {
          return res.status(400).json({
            errors: {
              pass: "Wrong Password",
            },
          });
        }
        const payloadData = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          profile: findUser.profile,
          role:findUser.role
        };
        const token = jwt.sign(payloadData, process.env.secretKey, {
          expiresIn: "5d",
        });
        return res.json({
          status:200,
          message: "Logged In Successful",
          access_token: `Bearer ${token}`,
          payloadData
        });
      }
      return res.status(400).json({
        errors: {
          email: "No user found with this email.",
        },
      });
    } catch (err) {
      console.log("The error is : ", err);
      if (err instanceof errors.E_VALIDATION_ERROR) {
        // console.log(err.message);
        return res.status(400).json({ err: err.messages });
      } else {
        return res.status(500).json({
          status: 500,
          message: "something went wrong . Please try again",
        });
      }
    }
  }
}

export default AuthController;
