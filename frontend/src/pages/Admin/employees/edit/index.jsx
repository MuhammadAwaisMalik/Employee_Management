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
import { useNavigate, useParams } from "react-router-dom";

// Validation Schema
const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Minimum 2 characters"),
  email: yup.string().required("Email is required").email("Invalid email"),
  maritalStatus: yup.string().required("Marital Status is required"),
  designation: yup.string().required("Designation is required"),
  department: yup.string().required("Department is required"),
  salary: yup.number().required("Salary is required"),
});

const EditEmployees = () => {
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchEmployeeData(id);
  }, [id]);

  const fetchEmployeeData = async (id) => {
    try {
      dispatch(setLoader(true));
      const res = await getData("/employee/" + id);
      if (res?.success) {
        const response = res?.data[0];
        const data = {
          name: response?.userId?.name,
          email: response?.userId?.email,
          maritalStatus: response?.maritalStatus,
          designation: response?.designation,
          department: response?.department?._id,
          salary: response?.salary,
        };

        reset(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

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
    try {
      const res = await PostData("/employee/" + id, data);
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
      <h1 className="font-sevillana text-2xl font-bold mb-8">Edit Employee</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployees;
