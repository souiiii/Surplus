import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./SignUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import ParticlesComponent from "../../components/ParticlesComponent";

// More robust (but still not exhaustive) email regex
const ADVANCED_EMAIL_REGEX = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // We'll still use 'error' for general validation/Firebase errors,
  // as per your current JSX structure for displaying errors.
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, user, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!name) {
      setError("Name is required.");
      return false;
    }

    if (!email) {
      setError("Email is required.");
      return false;
    } else if (!ADVANCED_EMAIL_REGEX.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      setError("Password is required.");
      return false;
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, name);
      const uid = auth.currentUser.uid;
      const docRef = doc(db, "users", uid);
      await setDoc(docRef, { name, email, createdAt: serverTimestamp() });
      navigate("/home");
    } catch (err) {
      let errorMessage = err.message;
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email address is already in use.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "The email address is not valid.";
      } else if (err.code === "auth/weak-password") {
        errorMessage =
          "Password is too weak. It must be at least 6 characters.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    // New function for Google Sign-In
    setError(""); // Clear any previous errors
    setLoading(true);
    try {
      await signInWithGoogle(); // Call the Google sign-in function from context
      const user = auth.currentUser; // Get authenticated user
      const uid = user.uid;
      const email = user.email;
      const name = user.displayName;

      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // Only create new doc if it doesn't exist
        await setDoc(docRef, {
          name,
          email,
          createdAt: serverTimestamp(),
        });
      }
      navigate("/home");
    } catch (err) {
      // Handle errors from Google Sign-In (e.g., user closes popup)
      let errorMessage = err.message;
      if (err.code === "auth/popup-closed-by-user") {
        errorMessage = "Google sign-in was cancelled.";
      } else if (err.code === "auth/cancelled-popup-request") {
        errorMessage = "Another Google sign-in request is already in progress.";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <ParticlesComponent id="particles"/>
    <div className={styles.parent}>
      <div className={styles.signupContainer}>
         <div className={styles.surplus}>
                  
        <svg width="49" height="51" viewBox="0 0 49 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.599 15.635C26.7554 15.5665 26.2454 15.8578 26.0691 16.509C25.8862 17.1841 25.9031 17.9899 26.1198 18.9261C26.3056 19.8801 26.7117 20.8407 27.3379 21.8079C28.9849 24.3123 31.6609 26.0556 35.3662 27.0379C37.1944 27.5225 38.9824 27.6734 40.7301 27.4905C42.1834 28.7804 43.1617 30.4743 43.6647 32.5719C44.1677 34.6697 44.1319 36.7796 43.5571 38.9019C42.0548 44.4486 38.5553 48.1088 33.0586 49.8826C28.3377 51.3969 23.0276 51.3721 17.1286 49.8083C12.7409 48.6451 9.17532 47.1959 6.43177 45.4606C3.68168 43.7494 1.55191 41.9183 0.0424419 39.9673C-0.0871224 38.2271 0.0799566 36.5008 0.543704 34.7885C1.00745 33.0763 1.66032 31.5822 2.50232 30.3062C3.34432 29.0303 4.31835 28.0866 5.42454 27.4752C6.08993 28.2979 7.42252 29.3101 9.42219 30.5123C11.4219 31.7144 13.3114 32.5513 15.0909 33.023C16.8704 33.4947 18.0942 33.7029 18.7624 33.6474C19.4062 33.5854 19.7901 33.3253 19.9143 32.8671C19.973 32.6501 19.992 32.4354 19.9711 32.2231C19.0592 32.214 17.9329 32.0317 16.5922 31.6763C11.8388 30.4163 8.26343 28.2795 5.86608 25.266C3.04997 21.6762 2.36047 17.2287 3.79736 11.9232C5.06454 7.24463 8.02964 3.86922 12.6928 1.79695C17.7316 -0.408465 23.7489 -0.583789 30.7449 1.27073C34.5964 2.29165 37.8575 3.46632 40.5284 4.79474C43.2058 6.09896 45.6925 7.81782 47.9885 9.95157C49.1048 13.0648 49.2971 15.972 48.5656 18.6729C47.8275 21.398 46.2783 23.4041 43.9181 24.691C41.5578 25.9781 39.0125 26.2597 36.2824 25.536C33.5279 24.8058 31.4355 23.6567 30.0053 22.0886C28.5506 20.514 27.7486 18.3628 27.599 15.635Z" fill="#FDFBF9"/>
        <path d="M18.6409 17.0383C20.3134 17.0383 21.6693 15.6969 21.6693 14.0423C21.6693 12.3877 20.3134 11.0463 18.6409 11.0463C16.9684 11.0463 15.6126 12.3877 15.6126 14.0423C15.6126 15.6969 16.9684 17.0383 18.6409 17.0383Z" fill="#21272B"/>
        </svg>
        
                </div>
        <h1 className={styles.createAccountHeading}>Create Account</h1>
        <button
          className={styles.signUpWithGoogleButton}
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <p className={styles.guideForEmailSignUp}>
          or use your email for registration
        </p>

        <form className="inputFieldsContainer" onSubmit={handleSubmit}>
          <input
            className="inputFields"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="inputFields"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="inputFields"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={styles.registerButton}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <div className={styles.message}>
        {/* {loading && "Signing Up..."} */}
        {error && error}
      </div>
      <div className={styles.signUpReroutingDiv}>
        <span className={styles.signUpRerouteText}>
          Already have an Account?{" "}
          <Link className={styles.signUpRerouteLink} to="/login">
            Sign In
          </Link>
        </span>
      </div>
    </div>
    </>

  );
}

export default SignUp;
