import PostForm from "@/components/shared/PostForm"
import { useGetPostById } from "@/lib/react-query/queries";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom"

const EditPost = () => {
  const {id} = useParams();
  const {data: post, isLoading} = useGetPostById(id);

  if(isLoading) return <Loader />

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img 
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  )
}

export default EditPost