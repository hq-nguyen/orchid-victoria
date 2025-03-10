import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = UserAuth();
  
  // Show loading state if auth is still being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Redirect to home if not authenticated
  if (!user) {
    return <Navigate to="/" />;
  }
  
  // Render the children if authenticated
  return children;
};

export default ProtectedRoute;