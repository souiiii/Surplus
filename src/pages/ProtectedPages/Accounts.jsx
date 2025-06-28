import { useState } from "react";
import LogoutButton from "../../components/LogoutButton";
import styles from "./Accounts.module.css";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import useGetNameOfUser from "../../hooks/useGetNameOfUser";
import { useNavigate } from "react-router-dom";
import Report from "../../components/Report";

function Accounts() {
  const navigate = useNavigate();
  const [loading, setLoading, error, setError, uId, uName, uEmail] =
    useGetNameOfUser();
  const [logOutLoading, setLogOutLoading] = useState(false);

  function handleClick() {
    navigate('/account/editName');
  }

  function getCapitalized(text) {
    if (!text) return "";
    const firstWord = text.trim().split(/\s+/)[0];
    const lastWord = text.trim().split(/\s+/).at(-1);
    if (firstWord === lastWord)
      return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
    return (
      firstWord.charAt(0).toUpperCase() +
      firstWord.slice(1) +
      " " +
      lastWord.charAt(0).toUpperCase() +
      lastWord.slice(1)
    );
  }
  return (
    <div className={styles.parent}>
      {error ? (
        <div className={styles.message}>error</div>
      ) : loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <>
          <div className={styles.accountWelcomeContainer}>
            <h1 className={styles.heading}>Profile</h1>
            <h1 className={styles.name}>{getCapitalized(uName)}</h1>
            <p className={styles.email}>{uEmail}</p>
          </div>
          <div className={styles.buttonDiv}>
            <button onClick={handleClick} className={styles.editButton}>
              Edit Name
            </button>
            <LogoutButton
              loading={logOutLoading}
              setLoading={setLogOutLoading}
            />
          </div>
          <Report uName={uName} uEmail={uEmail}/>
          <NavBar />
        </>
      )}
    </div>
  );
}

export default Accounts;
