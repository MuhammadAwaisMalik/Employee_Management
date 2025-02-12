import mongoose from "mongoose";
import Employee from "../models/employee.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "/uploads",
  filename: (req, file, cb) => {
    console.log(file, "uploadfile");

    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

export const getEmployee = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    res.status(200).json({
      success: true,
      data: employees,
      message: "Data fetched Successfuly",
    });
  } catch (error) {
    console.error("Error in fetching employees: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addEmployee = async (req, res) => {
  const {
    name,
    role,
    email,
    salary,
    gender,
    password,
    department,
    employeeId,
    designation,
    dateOfBirth,
    maritalStatus,
  } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      success: false,
      message: "User already registered with this email",
    });
  }
  const userEmpId = await Employee.findOne({ employeeId });
  if (userEmpId) {
    return res.status(400).json({
      success: false,
      message: "User already registered with this Employee Id",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log(req, "req.file");

  try {
    const newUser = await User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();

    const newEmployee = new Employee({
      userId: savedUser?._id,
      employeeId,
      dateOfBirth,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });
    await newEmployee.save();
    res.status(200).json({
      success: true,
      message: "Employee Created Successfully",
    });
  } catch (error) {
    console.log(error.message);

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const getSingleEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let employee;
    employee = await Employee.find({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");

    if (!employee?.length) {
      employee = await Employee.find({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    res.status(200).json({
      success: true,
      data: employee,
      message: "Data fetched Successfuly",
    });
  } catch (error) {
    console.error("Error in fetching data: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, salary, department, designation, maritalStatus } =
    req.body;

  const employee = await Employee.findById({ _id: id });

  if (!mongoose.Types.ObjectId.isValid(id) || !employee) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid employee Id" });
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: employee?.userId },
      {
        name,
        email,
      }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(id, {
      maritalStatus,
      designation,
      department,
      salary,
    });

    console.log(updateEmployee, "updateEmployee", updateUser);

    if (!updateUser || !updateEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee Update Successfuly",
    });
  } catch (error) {
    console.error("Error in Updating employee: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
