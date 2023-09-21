import React, { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { Link, useParams } from "react-router-dom";
import ProfileComponent from "../../components/UserComponents/ProfileComponent";
import UserBookings from "../../components/UserComponents/UserBookings";

function ProfilePage() {

  const { user, ready } = useContext(UserContext); 
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }


  function linkClasses(type=null) {
    let classes = "inline-flex gap-2 py-2 px-6 rounded-full ";
    if (type === subpage ) {
      classes += "bg-gradient-to-l from-primary to-primary text-black ";
    } else {
      classes += "bg-gray-100 ";
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2">
        <Link className={linkClasses("profile")} to={"/profile"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/profile/bookings"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          My Bookings
        </Link>
      </nav>
      {subpage === "profile" && (
        <ProfileComponent />
      )}
      {subpage === "bookings" &&(<UserBookings />)}
    </div>
  );
}

export default ProfilePage;
