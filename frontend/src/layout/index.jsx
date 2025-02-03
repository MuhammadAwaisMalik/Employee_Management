import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import DashboardSummary from "../pages/Admin/DashboardSummary";
import Departments from "../pages/Admin/departments";
import Employees from "../pages/Admin/employees";
import Leaves from "../pages/Admin/leaves";
import Setting from "../pages/Admin/setting";
import AddDepartment from "../pages/Admin/departments/add";
import EditDepartment from "../pages/Admin/departments/edit";
const Header = lazy(() => import("./header"));
const Sidebar = lazy(() => import("./sidebar"));
const AdminDashboard = lazy(() => import("../pages/adminDashboard"));
const EmployeeDashboard = lazy(() => import("../pages/employeeDashboard"));

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
                <Route path={"employees"} element={<Employees />} />
                <Route path={"departments"} element={<Departments />} />
                <Route path={"add-department"} element={<AddDepartment />} />
                <Route
                  path={"edit-department/:id"}
                  element={<EditDepartment />}
                />
                <Route path={"leaves"} element={<Leaves />} />
                <Route path={"settings"} element={<Setting />} />
              </Route>
              <Route
                path="/employee-dashboard"
                element={<EmployeeDashboard />}
              />
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default MainLayout;
