import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    age: { type: Number, required: true },
    adopted: { type: Boolean, default: false }
  },
  { versionKey: false }
);

export default mongoose.model("Pet", PetSchema);
