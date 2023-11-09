import { getCurrnetUser } from "@/lib/appwrite/api"
import { IUser } from "@/types"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const InitialUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: ""
}

const InitialState = {
  user: InitialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async() => false as boolean
}

type IContextType = {
  user: IUser,
  isLoading: boolean,
  setUser: React.Dispatch<React.SetStateAction<IUser>>,
  isAuthenticated: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  checkAuthUser: () => Promise<boolean>
}

const AuthContext = createContext<IContextType>(InitialState);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(InitialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try{
      const currentAccount = await getCurrnetUser();
      if(currentAccount){
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    }catch(err){
      console.log(err);
      return false;
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if(cookieFallback === "[]" || cookieFallback === null) navigate("/sign-in");

    checkAuthUser();
  },[])

  const value = {user, setUser, isLoading, isAuthenticated, setIsAuthenticated, checkAuthUser}

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>)
}

export const useUserContext = () => useContext(AuthContext);

