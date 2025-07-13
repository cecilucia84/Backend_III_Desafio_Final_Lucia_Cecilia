import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   schemas:
 *     Adoption:
 *       type: object
 *       required:
 *         - user
 *         - pet
 *       properties:
 *         _id:
 *           type: string
 *           description: ID de la adopción
 *         user:
 *           $ref: '#/components/schemas/User'
 *         pet:
 *           $ref: '#/components/schemas/Pet'
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de adopción
 *       example:
 *         _id: "60f7f7f7f7f7f7f7f7f7f7f7"
 *         user: "60f7f7f7f7f7f7f7f7f7f7f1"
 *         pet: "60f7f7f7f7f7f7f7f7f7f7f2"
 *         date: "2024-01-15T12:34:56.789Z"
 */

const AdoptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

export default mongoose.model("Adoption", AdoptionSchema);
