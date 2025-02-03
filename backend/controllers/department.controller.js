import mongoose from "mongoose";
import Department from "../models/department.js";

export const getDepartment = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({
      success: true,
      data: departments,
      message: "Data fetched Successfuly",
    });
  } catch (error) {
    console.error("Error in fetching Departments: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addDepartment = async (req, res) => {
  const { dep_name, description } = req.body;
  if (!dep_name) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide all feilds" });
  }
  try {
    const newDepartment = new Department({
      dep_name,
      description,
    });
    await newDepartment.save();
    res.status(200).json({
      success: true,
      message: "Department Added Successfully",
      department: newDepartment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const getSingleDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id");

    const department = await Department.find({ _id: id });
    res.status(200).json({
      success: true,
      data: department,
      message: "Data fetched Successfuly",
    });
  } catch (error) {
    console.error("Error in fetching department: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateDepartment = async (req, res) => {
  const { id } = req.params;

  const department = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Department Id" });
  }

  try {
    const updatedData = await Department.findByIdAndUpdate(id, department, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedData,
      message: "Department Update Successfuly",
    });
  } catch (error) {
    console.error("Error in Updating Department: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Department.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfuly",
    });
  } catch (error) {
    console.error("Error in Deleting Product: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
