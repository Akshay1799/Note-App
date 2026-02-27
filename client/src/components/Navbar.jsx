import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 border-b bg-white">
      <h1 className="text-xl font-bold">📝 NotesApp</h1>

      <button
        onClick={handleLogout}
        className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;