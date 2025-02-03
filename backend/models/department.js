import mongoose from "mongoose";

const departmentScheema = new mongoose.Schema(
  {
    dep_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model("Department", departmentScheema);

export default Department;
