import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - specie
 *       properties:
 *         _id:
 *           type: string
 *           description: ID autogenerado por MongoDB
 *         name:
 *           type: string
 *           description: Nombre de la mascota
 *         specie:
 *           type: string
 *           description: Especie (perro, gato, etc.)
 *         age:
 *           type: number
 *           description: Edad de la mascota
 *         adopted:
 *           type: boolean
 *           description: Indica si fue adoptada
 *       example:
 *         _id: "60f7f7f7f7f7f7f7f7f7f7f7"
 *         name: "Luna"
 *         specie: "perro"
 *         age: 3
 *         adopted: false
 */

const PetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  specie: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  age: {
    type: Number,
    min: 0
  },
  adopted: {
    type: Boolean,
    default: false
  }
}, { versionKey: false });

const PetModel = mongoose.model("Pet", PetSchema);

export default PetModel;
