
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { FormField, Form, FormControl, FormLabel, FormMessage, FormItem  } from '../ui/form';
import { PostValidation } from '@/lib/validation';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import FileUploader from './FileUploader';
import { Models } from 'appwrite';

type Props = {
  post?: Models.Document
}

const PostForm = ({post}: Props) => {
  const navigate = useNavigate();

  // example
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tag.join(',') : "",
    }
  })

  const handleCreatePost = () => {

  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreatePost)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        
        {/* caption */}
        <FormField
          control={form.control}
          name="caption"
          render={({ field}) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea 
                  className='shad-textarea custom-scrollbar'
                  placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage className='shad-form_messagae' />
            </FormItem>
          )}
        />

        {/* file */}
        <FormField 
          control={form.control}
          name="file"
          render={({ field}) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage className='shad-form_messagae' />
            </FormItem>
          )}
        />

        {/* location */}
        <FormField 
          control={form.control}
          name="location"
          render={({field}) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Location</FormLabel>
              <FormControl>
                <Input {...field} type='text' className='shad-input' />
              </FormControl>
              <FormMessage className='shad-form_messagae' />
            </FormItem>
          )}
        />

        {/* tags */}
        <FormField 
          control={form.control}
          name="tags"
          render={({field}) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Add Tags (seperated by comma " , ")</FormLabel>
              <FormControl>
                <Input {...field} type='text' className='shad-input' />
              </FormControl>
              <FormMessage className='shad-form_messagae' />
            </FormItem>
          )}
        />


        <div className='flex gap-4 items-center justify-end'>
          <Button
            type='button'
            className='shad-button_dark_4'
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='shad-button_primary whitespace-nowrap'
          >
            Post
          </Button>
        </div>
        
      </form>
    </Form>
  )
}

export default PostForm