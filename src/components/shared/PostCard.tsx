import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite"
import { Link } from "react-router-dom";
import {AiOutlineSetting} from 'react-icons/ai'
import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";

type Props = {
  post: Models.Document
}

const PostCard = ({post} : Props) => {
  const {user} = useUserContext();

  if(!post.creator) return ;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">

          {/* route to profile page */}
          <Link to={`/profile/${post.creator.$id}`}>

            {/* Profile Img */}
            <img 
              src={post.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">

            {/* name */}
            <div className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </div>

            <div className="flex-center gap-2 text-light-3">
              {/* created info */}
              <p className="subtitle-semibold lg:small-regular">
                {multiFormatDateString(post.$createdAt)}
              </p>
              -
              {/* location */}
              <p className="subtitle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        {/* route to edit page */}
        <Link to={`/update-post/${post.$id}`} className={`${user.id !== post.creator.$id  && 'hidden'}`}>
          <AiOutlineSetting size={30} color="#f97516" />
        </Link>
      </div>


      {/* route to post detail page */}
      <Link
        to={`/posts/${post.$id}`}
      >
        <div className="small-medium lg:base-medium py-5">

          {/* title */}
          <p>{post.caption}</p>

          {/* tags */}
          <ul>
            {post.tags.map((tag: string, idx:string) => {
              <li key={`${tag}${idx}`} className="">
                #{tag}
              </li>
            })}
          </ul>
        </div>

        {/* Img */}
        <img 
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />

    </div>
  )
}

export default PostCard