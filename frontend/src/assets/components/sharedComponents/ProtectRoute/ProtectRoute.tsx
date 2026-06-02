import { Navigate } from "react-router-dom";
//validate if is admine
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" replace />;
    return <>{children}</>;
}
//validate if user
export function AdminRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!token) return <Navigate to="/login" replace />;
    if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
    return <>{children}</>;
}

export function GuestRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (token && user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (token) return <Navigate to="/dashboard" replace />;
    return <>{children}</>;
}