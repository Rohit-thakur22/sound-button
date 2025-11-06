// components/Login.js
import { auth, provider, signInWithPopup } from "../../../firebase";

const Login = () => {
    const handleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            // Redirect or handle successful login here
        } catch (error) {
            console.error("Error logging in with Google:", error);
        }
    };

    return (
        <button onClick={handleLogin}>Login with Google</button>
    );
};

export default Login;
