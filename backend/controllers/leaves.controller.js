import Employee from "../models/employee.js";
import Leave from "../models/leave.js";

export const getLeave = async (req, res) => {
  const { id } = req.params;

  try {
    const empId = await Employee.findOne({ userId: id });

    if (!empId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const leave = await Leave.find({ employeeId: empId?._id });
    res.status(200).json({
      success: true,
      data: leave,
      message: "Data fetched Successfuly",
    });
  } catch (error) {
    console.error("Error in fetching leaves: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, fromDate, toDate, description } = req.body;
    const employee = await Employee.findOne({ userId });
    const leave = await Leave.find({ employeeId: userId?._id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const isDateExists = leave.some(
      (leave) => leave.fromDate == fromDate || leave.toDate == toDate
    );

    if (isDateExists) {
      return res.status(400).json({
        success: false,
        message: "Leave date already exists.",
      });
    }

    const newLeave = new Leave({
      employeeId: employee?._id,
      leaveType,
      fromDate,
      toDate,
      description,
    });
    console.log(employee?._id, "newLeave");
    await newLeave.save();
    res.status(200).json({
      success: true,
      message: "Leave Applied Successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
