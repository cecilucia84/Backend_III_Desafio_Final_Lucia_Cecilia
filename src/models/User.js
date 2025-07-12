/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - email
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Rol del usuario
 */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { versionKey: false }
);

export default mongoose.model("User", UserSchema);
