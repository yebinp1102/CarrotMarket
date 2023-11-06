import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {SignupValidation} from '@/lib/validation'
import {zodResolver} from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {FaCarrot} from 'react-icons/fa'
import Loader from '@/components/shared/Loader';
import { createUserAccount } from '@/lib/appwrite/api';

const SignupFrom = () => {

  const isLoading = false;

  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues : {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  const handleSignup = async (user: z.infer<typeof SignupValidation>) => {
    const newUser = await createUserAccount(user)
    console.log(newUser);
  }

  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>

        {/* Logo */}
        <div className='flex text-[#f97516]  h2-bold gap-2 '>
          <FaCarrot size={40} color="#f97516" />Carrot <span className='text-white'>Market</span>
        </div>

        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
          Create a new account
        </h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          To use carrot market, please enter your informations.
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          {/* Name field */}
          <FormField 
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Name</FormLabel>
                <FormControl>
                  <Input type="text" className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Username field */}
          <FormField 
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Username</FormLabel>
                <FormControl>
                  <Input type="text" className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField 
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Email</FormLabel>
                <FormControl>
                  <Input type="text" className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pwd field */}
          <FormField 
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Password</FormLabel>
                <FormControl>
                  <Input type="text" className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Btn */}
          <Button type='submit' className='shad-button_primary'>
            {isLoading ? (
              <div className='flex-center gap-2'>
                <Loader /> Loading...
              </div>
            ) : (
              "회원가입"
            )}
          </Button>

          {/* Route to Login form */}
          <p className='text-small-regular text-light-2 text-center mt-2'>
            Already have an account?
            <Link
              to="/sign-in"
              className='text-[#f97516] text-small-semibold ml-1'
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </Form>
  )
}

export default SignupFrom