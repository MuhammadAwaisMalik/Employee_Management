import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
// Admin
const DashboardSummary = lazy(() => import("../pages/Admin/DashboardSummary"));
const Departments = lazy(() => import("../pages/Admin/departments"));
const Employees = lazy(() => import("../pages/Admin/employees"));
const Leaves = lazy(() => import("../pages/Admin/leaves"));
const Setting = lazy(() => import("../pages/Admin/setting"));
const AddDepartment = lazy(() => import("../pages/Admin/departments/add"));
const EditDepartment = lazy(() => import("../pages/Admin/departments/edit"));
const AddEmployees = lazy(() => import("../pages/Admin/employees/add"));
const EditEmployees = lazy(() => import("../pages/Admin/employees/edit"));
const ViewEmployee = lazy(() => import("../pages/Admin/employees/view"));
const Header = lazy(() => import("./header"));
const Sidebar = lazy(() => import("./sidebar"));
const AdminDashboard = lazy(() => import("../pages/adminDashboard"));
// Employee
const EmployeeDashboard = lazy(() => import("../pages/employeeDashboard"));
const DashboardSummaryEMP = lazy(() =>
  import("../pages/Employee/DashboardSummary")
);
const MyProfile = lazy(() => import("../pages/Employee/myProfile"));
const EMPLeaves = lazy(() => import("../pages/Employee/leaves"));
const AddLeave = lazy(() => import("../pages/Employee/leaves/add"));

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, authData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      handleLogout();
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Suspense fallback={<Loader />}>
      <div className="relative min-h-screen flex flex-col bg-gray-50">
        <Loader />
        <Header
          authData={authData}
          handleLogout={handleLogout}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <div className="w-full h-full">
            <Routes>
              <Route path="/admin-dashboard" element={<AdminDashboard />}>
                <Route index element={<DashboardSummary />} />
                <Route path={"departments"} element={<Departments />} />
                <Route path={"add-department"} element={<AddDepartment />} />
                <Route
                  path={"edit-department/:id"}
                  element={<EditDepartment />}
                />
                <Route path={"employees"} element={<Employees />} />
                <Route path={"add-employee"} element={<AddEmployees />} />
                <Route path={"edit-employee/:id"} element={<EditEmployees />} />
                <Route path={"view-employee/:id"} element={<ViewEmployee />} />
                <Route path={"leaves"} element={<Leaves />} />
                <Route path={"settings"} element={<Setting />} />
              </Route>
              <Route path="/employee-dashboard" element={<EmployeeDashboard />}>
                <Route index element={<DashboardSummaryEMP />} />
                <Route path={"my-profile"} element={<MyProfile />} />
                <Route path={"leaves"} element={<EMPLeaves />} />
                <Route path={"add-leave"} element={<AddLeave />} />
                <Route path={"settings"} element={<Setting />} />
                {/* <Route path="*" element={<NotFound />} /> */}
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default MainLayout;
