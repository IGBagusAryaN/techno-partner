import { Navigate } from "react-router";
import { Layout } from "./layout";

export default function PrivateLayout() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Layout/>
    </>
  );
}