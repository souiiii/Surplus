import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function LogoutButton({ setLoading, loading = false }) {
  const navigate = useNavigate();
  const { signout } = useAuth();
  async function handleLogOut() {
    try {
      setLoading(true);
      await signout(); // Sign out from Firebase
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <button style={{ marginTop: "2rem" }} onClick={handleLogOut}>
      {loading ? "Logging Out..." : "Logout"}
    </button>
  );
}

export default LogoutButton;
