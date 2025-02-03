import React from "react";
import SummaryCard from "../../../components/summaryCard";

const DashboardSummary = () => {
  const overviewData = [
    { title: "Total Employees", value: 5, icon: "employees", color: "teal" },
    {
      title: "Total Departments",
      value: 3,
      icon: "departments",
      color: "yellow",
    },
    { title: "Monthly Pay", value: 2500, icon: "pay", color: "red" },
  ];

  const leaveData = [
    { title: "Leave Applied", value: 2, icon: "applied", color: "teal" },
    { title: "Leave Approved", value: 2, icon: "approved", color: "green" },
    { title: "Leave Pending", value: 1, icon: "pending", color: "yellow" },
    { title: "Leave Rejected", value: 2, icon: "rejected", color: "red" },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {overviewData?.map((item) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      {/* Leave Details */}
      <h2 className="text-2xl font-bold mb-6">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {leaveData?.map((item) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSummary;
