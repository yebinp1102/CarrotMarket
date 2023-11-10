import { FaCarrot } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import {GrLogout} from 'react-icons/gr';
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import {useSignOutAccount} from '@/lib/react-query/queries';

const Topbar = () => {
  const navigate = useNavigate();
  const {user} = useUserContext();
  const {mutate: signOut, isSuccess} = useSignOutAccount();

  useEffect(() => {
    if(isSuccess) navigate(0);
  },[isSuccess])

  
  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">

        {/* Logo */}
        <Link to="/" className="flex gap-3 items-center">
          <div className='flex text-[#f97516] font-bold gap-3 items-center'>
            <FaCarrot size={35} color="#f97516" className="stroke-[#f97516]" />
            <div>
              <p>Carrot</p>   
              <p className='text-white'>Market</p>
            </div>
          </div>
        </Link>

        <div className="flex gap-3">

          {/* User img */}
          <Link to={`/profile/${user.id}`} className="flex-center">
            <img 
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              className="h-8 w-8 rounded-full"
              alt="profile"
            />
          </Link>
          
        {/* Logout Btn */}
          <Button variant="ghost" onClick={() => signOut()}>
            <GrLogout size={27} color="#f97516" className="grIcon"/>
          </Button>
        </div>

      </div>
    </section>
  )
}

export default Topbar