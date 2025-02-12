import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/inputField";
import DataTable from "react-data-table-component";
import Button from "../../../components/button";
import { getData } from "../../../data/apiService";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../store/slices/loaderSlice";
// import { toast } from "react-toastify";

const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Profile Image",
    selector: (row) => row.profileImage,
    width: "150px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "150px",
  },
  {
    name: "DOB",
    selector: (row) => row.dateOfBirth,
    width: "150px",
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true,
    width: "150px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

const ActionButton = ({ id }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center gap-5">
      <Button
        variant="danger"
        onClick={() => navigate(`/admin-dashboard/view-employee/${id}`)}
      >
        View
      </Button>
      <Button
        variant="primary"
        onClick={() => navigate(`/admin-dashboard/edit-employee/${id}`)}
      >
        Edit
      </Button>
      <Button
        variant="ouline"
        className="bg-yellow-600 text-white"
        onClick={() => navigate(`/admin-dashboard/edit-employee/${id}`)}
      >
        Leave
      </Button>
    </div>
  );
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filterRecord, setFilterRecord] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    dispatch(setLoader(true));
    try {
      const res = await getData("/employee");
      if (res?.success) {
        let sno = 1;
        const data = res?.data?.map((item) => ({
          _id: item?._id,
          sno: sno++,
          dep_name: item?.department?.dep_name,
          name: item?.userId?.name,
          dateOfBirth: new Date(item?.dateOfBirth).toDateString(),
          profileImage: item?.userId?.profileImage,
          action: <ActionButton id={item._id} />,
        }));
        console.log(data, "data");
        setEmployees(data);
        setFilterRecord(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const handleSearch = (e) => {
    const records = employees?.filter((emp) =>
      emp?.name?.toLowerCase()?.includes(e.target.value.toLowerCase())
    );
    setFilterRecord(records);
  };

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2x1 font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center">
        <InputField
          type="text"
          className="px-4 py-0.5"
          placeholder="Seach By Employee Name"
          onChange={handleSearch}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 text-white rounded"
        >
          Add New Employee
        </Link>
      </div>

      <div className="mt-5">
        <DataTable columns={columns} data={filterRecord} pagination />
      </div>
    </div>
  );
};

export default Employees;
