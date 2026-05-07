import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AdminApp from "./admin/AdminApp";      // ← note: inside admin/
import LandingPage from "./LandingPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

function Root() {
  const [role, setRole] = React.useState(
    localStorage.getItem("role") || null
  );

  const handleChoose = (chosen) => {
    localStorage.setItem("role", chosen);
    setRole(chosen);
  };

  const handleBack = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("adminAuth");
    setRole(null);
  };

  if (!role) return <LandingPage onChoose={handleChoose} />;
  if (role === "admin") return <AdminApp onBack={handleBack} />;
  return <App onBack={handleBack} />;
}

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);