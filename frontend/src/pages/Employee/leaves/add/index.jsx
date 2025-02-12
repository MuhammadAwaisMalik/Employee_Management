import React from "react";
// @import dependencies
import * as yup from "yup";
import Button from "../../../../components/button";
import InputField, {
  SelectField,
  TextAreaFeild,
} from "../../../../components/inputField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PostData } from "../../../../data/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const baseSchema = yup.object().shape({
  leaveType: yup.string().required("Leave Type is required."),
  fromDate: yup.date().required("From Date is required"),
  toDate: yup.date().required("To Date is required"),
  description: yup.string().required("Description is required."),
});

const AddLeave = () => {
  const { authData } = useSelector((state) => state.auth);
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
    const payload = {
      ...data,
      userId: authData?.user?._id,
    };

    try {
      const res = await PostData("/leave/add", payload);
      if (res?.success) {
        toast.success(res?.message);
        navigate("/employee-dashboard/leaves");
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
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full">
            <Controller
              name="leaveType"
              control={control}
              render={({ field }) => (
                <SelectField
                  label="Leave Type"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                  options={[
                    { value: "Sick Leave", label: "Sick Leave" },
                    { value: "Casual Leave", label: "Casual Leave" },
                    { value: "Annual Leave", label: "Annual Leave" },
                  ]}
                  error={errors.leaveType?.message}
                />
              )}
            />
          </div>
          <Controller
            name="fromDate"
            control={control}
            render={({ field }) => (
              <InputField
                label="From"
                type="date"
                placeholder="Enter From Date"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                error={errors.fromDate?.message}
              />
            )}
          />
          <Controller
            name="toDate"
            control={control}
            render={({ field }) => (
              <InputField
                label="To"
                type="date"
                placeholder="Enter To Date"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                error={errors.toDate?.message}
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
        </div>
        <Button type="submit" variant="primary">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddLeave;
