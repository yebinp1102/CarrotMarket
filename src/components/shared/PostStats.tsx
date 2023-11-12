import { Models } from "appwrite"
import {FcLike} from 'react-icons/fc';
import {AiOutlineHeart} from 'react-icons/ai';
import {FaBookmark} from 'react-icons/fa';

type Props = {
  post: Models.Document,
  userId: string,
}

const PostStats = ({post, userId} : Props) => {
  return (
    <div className="flex justify-between items-center z-20">

      {/* Like btn */}
      <div className="flex items-center gap-2 mr-5">
        <AiOutlineHeart size={28} color="#f97516" onClick={()=>{}} className="cursor-pointer"  />
        <p className="text-lg">0</p>
      </div>

      {/* Save btn */}
      <div className="flex">
        <FaBookmark  className="cursor-pointer" size={20} color="#f97516" onClick={()=>{}}  />
      </div>
    </div>
  )
}

export default PostStats