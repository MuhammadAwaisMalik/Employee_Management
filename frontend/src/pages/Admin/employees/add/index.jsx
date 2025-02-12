import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../../../components/button";
import InputField, { SelectField } from "../../../../components/inputField";
import { getData, PostData } from "../../../../data/apiService";
import { setLoader } from "../../../../store/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Validation Schema
const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Minimum 2 characters"),
  email: yup.string().required("Email is required").email("Invalid email"),
  employeeId: yup.string().required("Employee ID is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  gender: yup.string().required("Gender is required"),
  maritalStatus: yup.string().required("Marital Status is required"),
  designation: yup.string().required("Designation is required"),
  department: yup.string().required("Department is required"),
  salary: yup.number().required("Salary is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
  // profileImage: yup.string().required("Image is required"),
});

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: `User${Math.floor(Math.random() * 1000)}`,
      email: `user${Math.floor(Math.random() * 1000)}@example.com`,
      employeeId: `EMP${Math.floor(Math.random() * 10000)}`,
      dateOfBirth: new Date(
        1990 + Math.floor(Math.random() * 30),
        Math.random() * 12,
        Math.random() * 28
      )
        .toISOString()
        .split("T")[0], // Random date
      gender: Math.random() > 0.5 ? "male" : "female",
      maritalStatus: Math.random() > 0.5 ? "single" : "married",
      designation: "Software Engineer",
      department: "IT",
      salary: Math.floor(Math.random() * 50000) + 30000, // Random salary between 30K and 80K
      password: "Test@1234",
      role: "employee",
      profileImage: null,
    },
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    dispatch(setLoader(true));
    try {
      const res = await getData("/department");
      if (res?.success) {
        const data = res?.data?.map((item) => ({
          label: item.dep_name,
          value: item._id,
        }));
        setDepartments(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const onSubmit = async (data) => {
    console.log(data, "data");

    const { profileImage, ...payload } = data;
    const formDataObj = new FormData();
    Object.keys(payload).forEach((key) => {
      formDataObj.append(key, payload[key]);
    });

    console.log(image, "data?.profileImage");

    if (image) {
      formDataObj.append("profileImage", image);
    }

    try {
      const res = await PostData("/employee/add", formDataObj);
      if (res?.success) {
        toast.success(res?.message);
        navigate("/admin-dashboard/employees");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      <h1 className="font-sevillana text-2xl font-bold mb-8">
        Add New Employee
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputField
                label="Name"
                placeholder="Enter Name"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputField
                label="Email"
                type="email"
                placeholder="Enter Email"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="employeeId"
            control={control}
            render={({ field }) => (
              <InputField
                label="Employee ID"
                placeholder="Enter Employee ID"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                error={errors.employeeId?.message}
              />
            )}
          />
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <InputField
                label="Date of Birth"
                type="date"
                placeholder="ENter DOB"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                error={errors.dateOfBirth?.message}
              />
            )}
          />
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Gender"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                error={errors.gender?.message}
              />
            )}
          />
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Marital Status"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                options={[
                  { value: "single", label: "Single" },
                  { value: "married", label: "Married" },
                ]}
                error={errors.maritalStatus?.message}
              />
            )}
          />
          <Controller
            name="designation"
            control={control}
            render={({ field }) => (
              <InputField
                label="Designation"
                value={field.value}
                placeholder="Enter Designation"
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                error={errors.designation?.message}
              />
            )}
          />
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Department"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                options={departments || []}
                error={errors.department?.message}
              />
            )}
          />
          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <InputField
                label="Salary"
                type="number"
                placeholder="Enter Salary"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                error={errors.salary?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputField
                label={"Password"}
                type={"password"}
                placeholder="******"
                value={field.value}
                error={errors?.password?.message}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <SelectField
                label="Role"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                options={[
                  { value: "employee", label: "Employee" },
                  { value: "admin", label: "Admin" },
                ]}
                error={errors.role?.message}
              />
            )}
          />
          <Controller
            name="profileImage"
            control={control}
            render={({ field }) => (
              <InputField
                label="Upload image"
                type="file"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setImage(e.target.files[0]);
                }}
                error={errors.profileImage?.message}
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button type="submit">Add Employee</Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
