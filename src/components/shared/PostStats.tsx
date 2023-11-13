import { Models } from "appwrite"
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai';
import {FaBookmark} from 'react-icons/fa';
import { useDeleteSavedPost, useLikePost, useSavePost, useGetCurrentUser} from "@/lib/react-query/queries";
import { useEffect, useState } from "react";
import { checkIsLiked } from "@/lib/utils";
import {BsBookmark} from 'react-icons/bs'
import { Loader } from "lucide-react";

type Props = {
  post?: Models.Document,
  userId: string,
}

const PostStats = ({post, userId} : Props) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);


  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isLoading: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isLoading: isDeletingSaved } = useDeleteSavedPost();

  const {data: currentUser} = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find((record: Models.Document) => 
  record.post.$id === post?.$id);

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  },[currentUser])


  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation(); // 버블링 방지. like 처리 도중 상세 페이지로 이동하는 것 방지

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId)

    if(hasLiked){
      newLikes = newLikes.filter((id) => id !== userId); // userId에 해당하지 않는 아이디만 likes에 남김
    }else{
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({postId: post?.$id || '', likesArray: newLikes})
  }

  const handleSavedPost = (e: React.MouseEvent) => {
    e.stopPropagation(); // 버블링 방지. save 처리 도중 상세 페이지로 이동하는 것 방지
  
    
    // 이미 saved 된 상태에서 다시 save를 누른 경우, save 목록에서 제거함 
    if(savedPostRecord){
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    }else{
      savePost({postId: post?.$id || '', userId});
      setIsSaved(true);
    }
  }


  return (
    <div className="flex justify-between items-center z-20">

      {/* Like btn */}
      <div className="flex items-center gap-2 mr-5">
        {checkIsLiked(likes, userId) ? 
          <>
            <AiFillHeart 
              size={28} 
              color="#f97516" 
              onClick={handleLikePost} 
              className="cursor-pointer"  
            />
            <p className="text-lg">{likes.length}</p>
          </>
        :         
          <>
            <AiOutlineHeart 
              size={28} 
              color="#f97516" 
              onClick={handleLikePost} 
              className="cursor-pointer"  
            />
            <p className="text-lg">0</p>
        </>
        }
      </div>

      {/* Save btn */}
      <div className="flex">
        {isSavingPost || isDeletingSaved ?(
          <Loader />
        ) : (
          <>
            {isSaved ?
              <FaBookmark 
                className="cursor-pointer" 
                size={20} 
                color="#f97516" 
                onClick={handleSavedPost}  
              />
            : 
              <BsBookmark
                className="cursor-pointer" 
                size={20} 
                color="#f97516" 
                onClick={handleSavedPost}  
              />         
            }
          </>
        )}
      </div>
    </div>
  )
}

export default PostStats