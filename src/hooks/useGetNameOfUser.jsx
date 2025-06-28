import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

function useGetNameOfUser() {
  const [uId, setUId] = useState("");
  const [uName, setUName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uEmail, setUEmail] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        setLoading(true);

        // Wait for auth to load if needed
        const waitForUser = () =>
          new Promise((resolve) => {
            const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
              if (firebaseUser) {
                unsubscribe();
                resolve(firebaseUser);
              }
            });
          });

        const user = auth.currentUser || (await waitForUser());

        const uid = user.uid;
        setUId(uid);

        setUEmail(user.email || "");

        const userRef = doc(db, "users", uid);
        let userSnap;
        let attempts = 0;
        const maxAttempts = 5;

        // Retry mechanism
        while (attempts < maxAttempts) {
          userSnap = await getDoc(userRef);
          if (userSnap.exists()) break;
          await new Promise((res) => setTimeout(res, 500)); // Wait 500ms
          attempts++;
        }
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const name = userData.name;
          setUName(name || "User");
        } else {
          setUName("User");
          console.warn("No user document found for UID:", uid);
        }
      } catch (err) {
        setError(err.message || "Failed to load user");
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  return [loading, setLoading, error, setError, uId, uName, uEmail];
}

export default useGetNameOfUser;
