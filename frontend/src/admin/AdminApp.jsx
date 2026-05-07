import { useState } from "react";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";

function AdminApp({ onBack }) {
  const [password, setPassword] = useState(
    localStorage.getItem("adminAuth") || null
  );

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setPassword(null);
  };

  if (!password) return <AdminLogin onLogin={setPassword} onBack={onBack} />;
  return <Admin password={password} onLogout={handleLogout} onBack={onBack} />;
}

export default AdminApp;