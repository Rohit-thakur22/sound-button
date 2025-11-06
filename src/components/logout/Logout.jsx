// components/Logout.js
import { auth, signOut } from "../../../firebase";

const Logout = () => {
  const handleLogout = async () => {
    try {
      localStorage.removeItem('logged_in_user');
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
