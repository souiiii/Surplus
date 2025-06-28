import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation, useParams } from "react-router-dom";

function NavBar() {
    const location = useLocation();
    const fromPage = location.state?.from ||'/home' ;
    const isHomePage = location.pathname.startsWith("/home");
    const isHistoryPage = location.pathname.startsWith("/history");
    const isAccountsPage = location.pathname.startsWith("/account");
    const isAboutPage = location.pathname.startsWith("/about");
  return (
    <div className="navContainer">
      <div className="navItemDiv">
       <NavLink to="/" className={({ isActive }) =>!isHistoryPage && !isAboutPage && !isAccountsPage && (isActive || fromPage==='/home')  ? "link active" : "link"}>
  {({ isActive }) => (
    <>
      <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.19603 10.5881L4.19603 23M23.3722 10.5881V23M1 13.7822L13.7841 1M13.7595 1.02455L26.5866 13.8516" stroke="#fdfbf9" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {(!isHistoryPage && !isAboutPage && !isAccountsPage && (isActive || fromPage==='/home') ) && <span className="navSelectedText">Home</span>}
    </>
  )}
</NavLink>
      </div>
      <div className="navItemDiv">
<NavLink className={({ isActive }) => isActive || fromPage==='/history'?"link active": "link"} to="/history">
  {({ isActive }) => (
    <>
        
<svg width="33" height="25" viewBox="0 0 33 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.0997 22.1962L12.1179 9.64235" stroke="#fdfbf9" strokeWidth="2" strokeLinecap="round"/>
<path d="M20.3954 14.3824L26.4136 1.82863" stroke="#fdfbf9" strokeWidth="2" strokeLinecap="round"/>
<path d="M12.0262 10.3703L20.3954 14.3824" stroke="#fdfbf9" strokeWidth="2" strokeLinecap="round"/>
<circle cx="6.04955" cy="22.3008" r="1.47663" transform="rotate(-19.3874 6.04955 22.3008)" fill="#fdfbf9"/>
<circle cx="20.3911" cy="14.1231" r="1.47663" transform="rotate(-19.3874 20.3911 14.1231)" fill="#fdfbf9"/>
<circle cx="26.2588" cy="1.88307" r="1.47663" transform="rotate(-19.3874 26.2588 1.88307)" fill="#fdfbf9"/>
<circle cx="11.9173" cy="10.0608" r="1.47663" transform="rotate(-19.3874 11.9173 10.0608)" fill="#fdfbf9"/>
</svg>
{(isActive || fromPage==='/history') && <span className="navSelectedText">Track</span>}
  

</>)}
        </NavLink>
      </div>
      <div className="navItemDiv">
        <NavLink className={({isActive})=> (isActive)?"link active": "link"} to="/account">
       { ({isActive})=>(<>
       <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.4098 22.6893C21.0253 19.9535 19.7419 17.4385 17.7972 15.6099C15.8525 13.7813 13.3782 12.763 10.8324 12.7434C8.28659 12.7238 5.84167 13.7044 3.95026 15.5035C2.05886 17.3026 0.849073 19.7985 0.544876 22.529L2.42323 22.8206C2.67278 20.5807 3.66521 18.5332 5.21681 17.0573C6.76841 15.5814 8.77408 14.7771 10.8625 14.7931C12.951 14.8091 14.9807 15.6445 16.576 17.1446C18.1713 18.6447 19.2241 20.7078 19.5396 22.9521L21.4098 22.6893Z" fill="#fdfbf9"/>
<path d="M10.8271 13.4932C13.1739 13.5113 15.4689 14.4504 17.2832 16.1562C18.9231 17.6983 20.0638 19.771 20.5361 22.0537L20.1503 22.1084C19.7022 19.9886 18.6358 18.0525 17.0898 16.5986C15.3642 14.976 13.1553 14.0605 10.8681 14.043C8.58002 14.0254 6.38856 14.9078 4.70015 16.5137C3.19603 17.9444 2.18533 19.8601 1.7939 21.9639L1.39351 21.9014C1.79437 19.6188 2.8743 17.5617 4.46675 16.0469C6.22127 14.378 8.48111 13.4751 10.8271 13.4932ZM10.332 0.75C12.9107 0.750179 15.0009 2.84114 15.0009 5.41992C15.0007 7.9985 12.9106 10.0887 10.332 10.0889C7.75324 10.0889 5.6623 7.99861 5.66206 5.41992C5.66206 2.84103 7.7531 0.75 10.332 0.75Z" stroke="#fdfbf9" strokeWidth="1.5"/>
</svg>
{isActive && <span className="navSelectedText">Account</span>}
</>)}


        </NavLink>
      </div>
      <div className="navItemDiv">
        <NavLink  className={({ isActive }) => isActive?"link active": "link"} to="/about">
        {({ isActive }) => (
    <>
<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.68 4.272L13.416 16.272H11.592L11.328 4.272H13.68ZM12.6 21.144C12.184 21.144 11.832 21 11.544 20.712C11.256 20.424 11.112 20.072 11.112 19.656C11.112 19.24 11.256 18.888 11.544 18.6C11.832 18.312 12.184 18.168 12.6 18.168C13 18.168 13.336 18.312 13.608 18.6C13.896 18.888 14.04 19.24 14.04 19.656C14.04 20.072 13.896 20.424 13.608 20.712C13.336 21 13 21.144 12.6 21.144Z" fill="#fdfbf9"/>
<path d="M25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4036 0 25 5.59644 25 12.5ZM1.7601 12.5C1.7601 18.4315 6.56852 23.2399 12.5 23.2399C18.4315 23.2399 23.2399 18.4315 23.2399 12.5C23.2399 6.56852 18.4315 1.7601 12.5 1.7601C6.56852 1.7601 1.7601 6.56852 1.7601 12.5Z" fill="#fdfbf9"/>
</svg>
{isActive && <span className="navSelectedText">About</span>}

</>)}

        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
