import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

export function PrivateRoute(){
    const {isAuthentificated, isLoading} = useAuth();
    if(isLoading){
        return <div style={{ display: 'flex', justifyContent:'center', marginTop: "2rem" }}>
            Chargement ...
        </div>
    }
    return isAuthentificated? <Outlet/>: <Navigate to={'/login'} replace/>    
}