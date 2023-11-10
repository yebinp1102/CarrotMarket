import { Link, useLocation } from "react-router-dom"
import { bottombarLinks } from "@/constants";

const BottomBar = () => {
  const {pathname} = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        
        return (
          <Link 
            to={link.route} 
            key={`bottombar-${link.label}`} 
            className={`${isActive && "rounded-[10px] bg-[#f97516]"} flex-center flex-col gap-1 p-2 transition`}
          >
            <img 
              width={24}
              height={24}
              className={`${isActive && "invert-white"}`}
              src={link.imgURL}
              alt={link.label}
            />
            <p className="text-sm text-light-2">{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default BottomBar