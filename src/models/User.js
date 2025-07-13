import mongoose from "mongoose";
import validator from "validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - username
 *       properties:
 *         id:
 *           type: string
 *           description: ID del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña encriptada
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *       example:
 *         id: "60f7f7f7f7f7f7f7f7f7f7f7"
 *         email: "test@correo.com"
 *         password: "$2a$10$abc123..."
 *         username: "usuario123"
 */

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: props => `${props.value} no es un correo válido`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { versionKey: false });

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
