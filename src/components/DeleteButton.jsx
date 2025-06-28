import styles from "./DeleteButton.module.css";
function DeleteButton({ onDelete }) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onDelete();
      }}
      className={styles.svgContainer}
    >
      <svg
        className={styles.svg}
        width="32"
        height="38"
        viewBox="0 0 32 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.4286 2.375C29.95 2.375 32 4.50508 32 7.125V30.875C32 33.4949 29.95 35.625 27.4286 35.625H4.57143C2.05 35.625 0 33.4949 0 30.875V7.125C0 4.50508 2.05 2.375 4.57143 2.375H27.4286ZM21.1429 17.2188H10.8571C9.90714 17.2188 9.14286 18.0129 9.14286 19C9.14286 19.9871 9.90714 20.7812 10.8571 20.7812H21.1429C22.0929 20.7812 22.8571 19.9871 22.8571 19C22.8571 18.0129 22.0929 17.2188 21.1429 17.2188Z"
          fill="#FDFBF9"
          fillOpacity="0.87"
        />
      </svg>
    </div>
  );
}

export default DeleteButton;
