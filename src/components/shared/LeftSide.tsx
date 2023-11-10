import React from "react";
import { InitialUser, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { FaCarrot } from "react-icons/fa";
import Loader from "./Loader";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Button } from "../ui/button";
import { GrLogout } from "react-icons/gr";

const LeftSide = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {user, setUser, setIsAuthenticated, isLoading} = useUserContext();

  const {mutate: signOut} = useSignOutAccount();

  const handleSignOut = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(InitialUser);
    navigate("/sign-in");
  }

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className='flex text-[#f97516] font-bold gap-2 items-center'>
            <FaCarrot size={36} color="#f97516" className="stroke-[#f97516]" />
            <div className=" text-xl">
              Carrot<span className='text-white'> Market</span>
            </div>
          </div>
        </Link>

        {/* User profile */}
        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ): (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}
        
        {/* Menu */}
        <ul className="flex flex-col gap-6 mt-5">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && "bg-[#f97516]"}`} >
                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                  <img 
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && "invert-white"}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Logout btn */}
      <Button 
        variant="ghost" 
        className="shad-button_ghost" onClick={(e) => handleSignOut(e)}
        >
        <GrLogout size={27} color="#f97516" className="grIcon"/>
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSide