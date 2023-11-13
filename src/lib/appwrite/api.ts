import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config.ts";
import { INewPost, INewUser, IUpdatePost } from "@/types";



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

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.name,
      imageUrl: avatarUrl
    })

    return newUser;
  }catch(err){
    console.log(err);
    return err;
  }
}


// save user to DB
export  async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string
}){
  try{
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    
    return newUser;
  }catch(err){
    console.log(err);
  }
}

export async function signInAccount(user: {email: string, password: string}) {
  try{
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  }catch(err){
    console.log(err);
  }
}

// Get account
export async function getAccount(){
  try{
    const currentAccount = await account.get();
    return currentAccount;
  }catch(err){
    console.log({err});
  }
}


// Get user
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
} 

export async function signOutAccount() {
  try{
    const session = await account.deleteSession("current");

    return session;
  }catch(err){
    console.log(err);
  }
}

// ============================================================
// POSTS
// ============================================================

export async function createPost(post: INewPost){
  try{
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0])

    if(!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);

    if(!fileUrl) {
      deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags in to arr
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    // Save post to DB
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags
      }
    )
    
    if(!newPost){
      await deleteFile(uploadedFile.$id);
      throw Error
    }

    return newPost;
  }catch(err){
    console.log(err);
  }
}


export async function uploadFile(file: File){
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile
  }catch(err) {
    console.log(err)
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFile(fileId: string){
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)

    return {status: 'ok'}
  }catch(err) {
    console.log(err)
  }
}

export async function getRecentPosts () {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(20)] // post 20개씩 fetch 하며, 제일 최근에 생성된 것이 제일 위로 오도록 정렬
  )

  if(!posts) throw Error;
  return posts;
}

export async function likePost(postId: string, likesArray: string[]){
  try{
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray
      }
    )

    if(!updatedPost) throw Error;

    return updatedPost;
  }catch(err){
    console.log(err);
  }
}

export async function savePost(postId: string, userId: string){
  try{
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId
      }
    )

    if(!updatedPost) throw Error;

    return updatedPost;
  }catch(err){
    console.log(err);
  }
}

export async function deleteSavedPost(savedId: string){
  try{
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedId
    )

    if(!statusCode) throw Error;

    return {status: 'ok'};
  }catch(err){
    console.log(err);
  }
}

export async function getPostById(postId: string) {
  try{
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )

    return post;
  }catch(err){
    console.log(err);
  }
}

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try{    
    let image = {
      imageUrl : post.imageUrl,
      imageId: post.imageId
    }

    if(hasFileToUpdate){
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0])  
      if(!uploadedFile) throw Error;
    
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);

      if(!fileUrl) {
        deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
    }

    // Convert tags in to arr
    const tags = post.tags?.replace(/ /g, '').split(',') || [];

    // Save post to DB
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags
      }
    )
    
    if(!updatedPost){
      await deleteFile(post.imageId);
      throw Error
    }

    return updatedPost;
  }catch(err){
    console.log(err);
  }
}

