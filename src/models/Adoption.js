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
