import PostCard from "@/components/shared/PostCard"
import { useGetRecentPosts } from "@/lib/react-query/queries"
import { Models } from "appwrite"
import { Loader } from "lucide-react"

const Home = () => {
  const {data: posts, isLoading: isPostLoading, isError : isErrorPosts} = useGetRecentPosts()
  
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          {/* Page title */}
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>

          {isPostLoading && !posts ? (
            <Loader />
          ): (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} key={post.caption} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home