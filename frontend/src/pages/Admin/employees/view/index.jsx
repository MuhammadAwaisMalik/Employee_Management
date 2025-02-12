import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setLoader } from "../../../../store/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { getData } from "../../../../data/apiService";
import { formatDate } from "../../../../libs/formatDate";

const DetailRow = ({ label, value }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold min-w-32">{label}:</span>
      <span className="text-gray-700 capitalize">{value}</span>
    </div>
  );
};

const ViewEmployee = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchEmployee(id);
  }, [id]);

  const fetchEmployee = async (id) => {
    try {
      dispatch(setLoader(true));
      const res = await getData("/employee/" + id);
      if (res?.success) {
        console.log(res);
        setData(res?.data[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Employee Details
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-48 h-48 relative">
            <div className="w-full h-full rounded-full overflow-hidden bg-sky-100">
              <image
                alt="Employee photo"
                src="img"
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <DetailRow label="Name" value={data?.userId?.name} />
            <DetailRow label="EMP ID" value={data?.employeeId} />
            <DetailRow
              label="Date of Birth"
              value={formatDate(new Date(data?.dateOfBirth))}
            />
            <DetailRow label="Gender" value={data?.gender} />
            <DetailRow label="Department" value={data?.department?.dep_name} />
            <DetailRow label="Marital Status" value={data?.maritalStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
