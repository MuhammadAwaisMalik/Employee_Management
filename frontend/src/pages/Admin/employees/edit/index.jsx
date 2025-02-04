import React, { useEffect } from "react";
// @import dependencies
import * as yup from "yup";
import Button from "../../../../components/button";
import InputField, { TextAreaFeild } from "../../../../components/inputField";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getData, PostData } from "../../../../data/apiService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { setLoader } from "../../../../store/slices/loaderSlice";
import { useDispatch } from "react-redux";

const baseSchema = yup.object().shape({
  dep_name: yup.string().required("Department Name is required."),
  description: yup.string().required("Description is required."),
});

const EditEmployees = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(baseSchema),
  });

  useEffect(() => {
    fetchDepartment(id);
  }, [id]);

  const fetchDepartment = async (id) => {
    try {
      dispatch(setLoader(true));
      const res = await getData("/employee/" + id);
      if (res?.success) {
        console.log(res);
        setValue("dep_name", res?.data[0]?.dep_name);
        setValue("description", res?.data[0]?.description);
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
        <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
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
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployees;
