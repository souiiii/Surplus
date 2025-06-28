import styles from "./BackButton.module.css";
import { useNavigate, useLocation } from "react-router-dom";
function BackButton({ selectedDate }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Check if on exercise details page
    const isExerciseDetailsPage = location.pathname.startsWith("/exercise/");
    const isHistoryPage = location.pathname.startsWith("/history");
    const fromPage = location.state?.from || "/home";

    if (isExerciseDetailsPage || isHistoryPage) {
      navigate(fromPage, { replace: true, state: { selectedDate } }); // go to Home directly
    } else {
      navigate(-1); // default back
    }
  };

  return (
    <div className={styles.backButton}>
      <div className={styles.backSvgContainer} onClick={handleBack}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.8125 10.3125H18.5625C18.7448 10.3125 18.9197 10.3849 19.0486 10.5139C19.1776 10.6428 19.25 10.8177 19.25 11C19.25 11.1823 19.1776 11.3572 19.0486 11.4861C18.9197 11.6151 18.7448 11.6875 18.5625 11.6875H4.8125C4.63016 11.6875 4.4553 11.6151 4.32636 11.4861C4.19743 11.3572 4.125 11.1823 4.125 11C4.125 10.8177 4.19743 10.6428 4.32636 10.5139C4.4553 10.3849 4.63016 10.3125 4.8125 10.3125Z"
            fill="#FDFBF9"
          />
          <path
            d="M5.09713 11L10.7993 16.7008C10.9284 16.8299 11.0009 17.0049 11.0009 17.1875C11.0009 17.3701 10.9284 17.5452 10.7993 17.6743C10.6702 17.8034 10.4951 17.8759 10.3125 17.8759C10.1299 17.8759 9.95485 17.8034 9.82576 17.6743L3.63826 11.4868C3.57423 11.4229 3.52344 11.347 3.48878 11.2635C3.45412 11.18 3.43628 11.0904 3.43628 11C3.43628 10.9096 3.45412 10.82 3.48878 10.7365C3.52344 10.653 3.57423 10.5771 3.63826 10.5133L9.82576 4.32576C9.95485 4.19667 10.1299 4.12415 10.3125 4.12415C10.4951 4.12415 10.6702 4.19667 10.7993 4.32576C10.9284 4.45486 11.0009 4.62995 11.0009 4.81251C11.0009 4.99508 10.9284 5.17017 10.7993 5.29926L5.09713 11Z"
            fill="#FDFBF9"
          />
        </svg>
      </div>
    </div>
  );
}

export default BackButton;
