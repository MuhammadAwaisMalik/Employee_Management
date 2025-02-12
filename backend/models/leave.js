import mongoose, { Schema } from "mongoose";

const leaveScheema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
    unique: false,
  },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
    required: true,
  },
  fromDate: { type: Date },
  toDate: { type: Date },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Leave = mongoose.model("Leave", leaveScheema);

export default Leave;
