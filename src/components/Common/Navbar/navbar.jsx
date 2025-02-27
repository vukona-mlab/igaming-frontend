import React from "react";
import "./navbar.css";
import { FaSearch } from "react-icons/fa";


export default function NavBar(){
    const [profilePicture, setProfilePicture] = useState("");
   const [loading, setLoading] = useState(false);
   const location = useLocation();
   const uid = localStorage.getItem("uid");
   const token = localStorage.getItem("token");
   const navigation = useNavigate();

   useEffect(() => {
         if (uid !== "") {
          getProfile();
        }
       }, [uid]);
       const getProfile = async () => {
         setLoading(true);
         try {
           const response = await fetch(
             `http://localhost:8000/api/auth/users/${uid}`,
             {
               method: "GET",
               headers: { Authorization: token },
             }
           );
           if (response.ok) {
             const data = await response.json();
             console.log({ data });
             setProfilePicture(data.user.profilePicture);
           }
           setLoading(false);
         } catch (error) {
           console.log(error);
         }
       };
    

  return(
    <>
    <div className="container">
      <div className="left-container"> <img
               src="/images/logo-ri-express.png"
               alt="logo"
               width="125"
               height="58px"
             ></img></div>
      <div className="right-container">
        <ul>
          <div className="list-items">
          <li className="nav-item">Home</li>
          <li className="nav-item">About</li>
          <li className="nav-item">Contact</li>
          <li className="nav-item">FAQ</li>
          </div>
        </ul>
        </div>
        <div className="placeholder">
           {profilePicture !== "" ? (
             <div style={{ display: "flex", gap: "15px" }}>
               {location.pathname === "/profile" && <LogoutButton />}
               <img
                 src={profilePicture}
                 alt="User"
                 className="user-profile"
                 onClick={() => navigation("/profile")}
               />
             </div>
           ) : (
             <FaSearch className="search-icon" />
           )}
         </div>

    </div>
    </>
  )
}