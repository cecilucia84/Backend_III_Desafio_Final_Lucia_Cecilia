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
 *         user:
 *           $ref: '#/components/schemas/User'
 *         pet:
 *           $ref: '#/components/schemas/Pet'
 *         date:
 *           type: string
 *           format: date-time
 */

import mongoose from "mongoose";

const AdoptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    adoptedAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.model("Adoption", AdoptionSchema);
