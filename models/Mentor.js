import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    }],
  },
  { timestamps: true }
  );
  export default mongoose.model("Mentor", mentorSchema);