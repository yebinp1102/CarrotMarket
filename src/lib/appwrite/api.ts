import { ID } from "appwrite";
import { account } from "./config";
import { INewUser } from "@/types";



// Sign up
export async function createUserAccount(user: INewUser){
  try{
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )

    if(!newAccount) throw Error;

    return newAccount;
  }catch(err){
    console.log(err);
    return err;
  }
}