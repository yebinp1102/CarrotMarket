import { useGetPostById } from "@/lib/react-query/queries";
import { multiFormatDateString } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Link, useParams } from "react-router-dom"
import {AiOutlineSetting} from 'react-icons/ai'
import { useUserContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {ImBin} from 'react-icons/im';
import PostStats from "@/components/shared/PostStats";

const PostDetails = () => {
  const {id} = useParams();
  const {data: post , isLoading} = useGetPostById(id || '');
  const {user} = useUserContext();


  const handleDeletePost = () => {

  }

  return (
    <div className="post_details-container">
      {isLoading ? (
        <Loader />
      ): (
        <div className="post_details-card">
          {/* post img */}
          <img 
            src={post?.imageUrl}
            alt="post"
            className="post_details-img"
          />

          {/* post info */}
          <div className="post_details-info">

            <div className="flex-between w-full">
              {/* route to profile page */}
              <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">

                {/* Profile Img */}
                <img 
                  src={post?.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"}
                  alt="creator"
                  className="w-8 h-8 lg:h-12 lg:w-12 rounded-full"
                />

                <div className="flex flex-col">

                  {/* name */}
                  <div className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </div>

                  <div className="flex-center gap-2 text-light-3">
                    {/* created info */}
                    <p className="subtitle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    {/* location */}
                    <p className="subtitle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              {/* Buttons */}
              <div className="flex-center">
                {/* Edit btn */}
                <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                  <AiOutlineSetting size={26} color="#f97516" />
                </Link>

                {/* Delete btn */}
                <Button 
                  variant="ghost" 
                  onClick={handleDeletePost} 
                  className={`ost_details-delete_btn ${user.id !== post?.creator.$id && "hidden"}`}
                >
                  <ImBin size={22} color="#f97516"/>
                </Button>
              </div>

            </div>

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              {/* title */}
              <p>{post?.caption}</p>

              {/* tags */}
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li
                    key={`${tag}${index}`}
                    className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full ">
              <PostStats post={post} userId={user.id} />
            </div>


          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails