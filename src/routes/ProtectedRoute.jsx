import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import LoadingComponent from "../components/Loading/Loading";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = UserAuth();
  
  if (loading) {
    return (
      <LoadingComponent text="Loading..."/>
    );
  }
  
  // Redirect to home if not authenticated
  if (!currentUser) {
    return <Navigate to="/" />;
  }
  if (!currentUser.isAdmin) {
    return <Navigate to="/" />;
  }
  
  // Render the children if authenticated
  return children;
};

export default ProtectedRoute;