import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AppLayout from "./ui/AppLayout"
import Dashboard from "./pages/Dashboard"
import Inventory from "./pages/Inventory"
import Sales from "./pages/Sales"
import History from "./pages/History"
import Users from "./pages/Users"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import './App.css'
import { Toaster } from "react-hot-toast"
import Invoice from "./features/Sales/SalesInvoice"
import ProtectedRoutes from "./ui/ProtectedRoutes"
import UpdateUserData from "./pages/UpdateUserData"
import Notification from "./pages/Notification"
import { ModeProvider } from "./features/context/ColorModeToggle"
import Expense from "./pages/Expense"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    }
  }
})

const App = () => {
  return (
    <ModeProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes><AppLayout /></ProtectedRoutes>}>
          <Route index element={<Navigate replace to='dashboard' />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="sales" element={<Sales />} />
          <Route path="expense" element={<Expense />} />
          <Route path="sales/:salesId" element={<Invoice />} />
          <Route path="history" element={<History />} />
          <Route path="users" element={<Users />} />
          <Route path="updateuserdata" element={<UpdateUserData />} />
          <Route path="notification" element={<Notification />} />
        </Route>
        <Route path="login" element={<Login />} />
        {/* <Route path="forgotpassword" element={<ForgotPasswordForm />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>

    <Toaster
      position="top-center" 
      gutter={12} 
      containerStyle={{ margin: '8px' }} 
      toastOptions={{
        success: {duration: 3000},
        error: { duration: 5000 },
        style: { 
          fontSize: '16px',
          maxWidth: '500px', 
          padding: '16px 24px', 
          backgroundColor: 'white',
          color: 'gray 0.3'
        },
      }}
    />
    </QueryClientProvider>
    </ModeProvider>
  )
}

export default App

