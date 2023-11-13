import GridPostList from '@/components/shared/GridPostList';
import SearchResults from '@/components/shared/SearchResults';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/useDebounce';
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queries';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import {BsSearch, BsFilter} from 'react-icons/bs';

const Explore = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data: posts, fetchNextPage: hasNextPage } = useGetPosts();

  // when searchValue changes, detect another change after 500 mil sec
  const debouncedValue = useDebounce(searchValue, 500); 
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue);

  if(!posts){
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 w-full rounded-lg bg-dark-4 items-center">
          <BsSearch size={20} className="ml-3" />
          <Input 
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
        <div className="flex-center gap-3 bg-dark-3 px-4 rounded-xl py-2 cursor-pointer">
          <p className='small-medium md:base-medium text-light-2'>All</p>
          <BsFilter size={24} color="#f97516" />
        </div>
      </div>

      {/* result of what's popular today */}
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults 
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ): shouldShowPosts ?  (
          <p className='text-light-4 mt-10 text-center w-full'>End of posts</p>
        ): posts.pages.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item.documents} />
        ))}
      </div>
    </div>
  )
}

export default Explore