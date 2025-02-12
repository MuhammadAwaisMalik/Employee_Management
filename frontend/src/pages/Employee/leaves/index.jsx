import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/inputField";
import DataTable from "react-data-table-component";
import Button from "../../../components/button";
import { deleteData, getData } from "../../../data/apiService";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../store/slices/loaderSlice";
import { toast } from "react-toastify";
import { formatDate } from "../../../libs/formatDate";

const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
    sortable: true,
  },
  {
    name: "From",
    selector: (row) => row.fromDate,
    sortable: true,
  },
  {
    name: "To",
    selector: (row) => row.toDate,
    sortable: true,
  },
  {
    name: "Descrition",
    selector: (row) => row.fromDate,
    sortable: true,
  },
  {
    name: "Applied Date",
    selector: (row) => row.appliedAt,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
];

const EMPLeaves = () => {
  const { authData } = useSelector((state) => state.auth);
  const [leavesData, setLeavesData] = useState([]);
  const [filterRecord, setFilterRecord] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    dispatch(setLoader(true));
    try {
      const res = await getData("/leave/" + authData?.user?._id);
      if (res?.success) {
        let sno = 1;
        const data = res?.data?.map((item) => ({
          _id: item._id,
          sno: sno++,
          leaveType: item.leaveType,
          fromDate: formatDate(item?.fromDate),
          toDate: formatDate(item?.toDate),
          appliedAt: formatDate(item?.appliedAt),
          status: item?.status,
        }));
        setLeavesData(data);
        setFilterRecord(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleSearch = (e) => {
    const records = leavesData?.filter((dep) =>
      dep?.status?.toLowerCase()?.includes(e.target.value.toLowerCase())
    );
    setFilterRecord(records);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2x1 font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <InputField
          type="text"
          className="px-4 py-0.5"
          placeholder="Seach By Status"
          onChange={handleSearch}
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-2 bg-teal-600 text-white rounded"
        >
          Add Leave
        </Link>
      </div>

      <div className="mt-5">
        <DataTable columns={columns} data={filterRecord} pagination />
      </div>
    </div>
  );
};

export default EMPLeaves;
