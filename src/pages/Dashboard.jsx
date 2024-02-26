import DashboardFilter from "../features/Dashboard/DashboardFilter"
import DashboardLayout from "../features/Dashboard/DashboardLayout"

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl text-gray-600 mb-5 italic">Dashboard</h1>
      <DashboardFilter />
      <DashboardLayout />
    </div>
  )
}

export default Dashboard