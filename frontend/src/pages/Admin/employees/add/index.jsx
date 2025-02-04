import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../../../components/button";
import InputField, { SelectField } from "../../../../components/inputField";
import { getData } from "../../../../data/apiService";
import { setLoader } from "../../../../store/slices/loaderSlice";
import { useDispatch } from "react-redux";

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
  image: yup.string().required("Image is required"),
});

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      gender: "",
      maritalStatus: "",
      department: "",
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
          value: item.dep_name,
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
    console.log(data);
    alert("Employee added successfully!");
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
                  { value: "IT", label: "IT" },
                  { value: "HR", label: "HR" },
                  { value: "Finance", label: "Finance" },
                  { value: "Marketing", label: "Marketing" },
                  { value: "Operations", label: "Operations" },
                ]}
                error={errors.role?.message}
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <InputField
                label="Upload image"
                type="file"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                error={errors.image?.message}
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
