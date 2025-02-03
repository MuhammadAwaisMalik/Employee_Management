import React from "react";
// @import dependencies
import * as yup from "yup";
import Button from "../../../../components/button";
import InputField, { TextAreaFeild } from "../../../../components/inputField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostData } from "../../../../data/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseSchema = yup.object().shape({
  dep_name: yup.string().required("Department Name is required."),
  description: yup.string().required("Description is required."),
});

const AddDepartment = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(baseSchema),
  });
  const onSubmit = async (data) => {
    try {
      const res = await PostData("/department/add", data);
      if (res?.success) {
        toast.success(res?.message);
        navigate("/admin-dashboard/departments");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };
  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Add Department</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="dep_name"
            control={control}
            render={({ field }) => (
              <InputField
                label="Department Name"
                type="text"
                name="dep_name"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                placeholder="Enter Department Name"
                error={errors?.dep_name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextAreaFeild
                label="Description"
                type="text"
                name="description"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                placeholder="Enter Description"
                error={errors.description?.message}
              />
            )}
          />

          <Button type="submit" variant="primary">
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
