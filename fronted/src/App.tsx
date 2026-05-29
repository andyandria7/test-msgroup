import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App(){
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>

          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<div>dashboard</div>}/>
          </Route>

          <Route path="/"  element={<Navigate to='/dashboard' replace/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}