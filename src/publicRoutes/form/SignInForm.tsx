import * as z from 'zod';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/shared/Loader';
import { useToast } from '@/components/ui/use-toast';

import {SigninValidation} from '@/lib/validation';
import { useSignInAccount } from '@/lib/react-query/queries';
import { useUserContext } from '@/context/AuthContext';
import { FaCarrot } from 'react-icons/fa';

const SignInForm = () => {
  const {toast} = useToast();
  const navigate = useNavigate();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  // Query
  const {mutateAsync: signInAccount, isLoading} = useSignInAccount();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    const session = await signInAccount(user);

    if(!session){
      toast({title: "Login failed. Please try again. 로그인에 실패 했습니다. 다시 시도 해주세요."})
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      navigate("/");
    }else{
      toast({title: "Login failed. Please try again. 로그인에 실패 했습니다. 다시 시도 해주세요."})
      return;
    }

  }


  return (
    <Form {...form}>
      <div className='sm:w-420 flex-center flex-col'>

        {/* Logo */}
        <div className='flex text-[#f97516]  h2-bold gap-2 '>
          <FaCarrot size={40} color="#f97516" />Carrot <span className='text-white'>Market</span>
        </div>

        <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>
          Login to your account
        </h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          Welcome back! Please enter your details.
        </p>

        <form
          onSubmit={form.handleSubmit(handleSignin)}
          className='flex flex-col gap-5 w-full mt-4'
        >
          {/* Email field */}
          <FormField 
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Email</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField 
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel className='shad-form_label'>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button type='submit' className='shad-button_primary'>
            {isLoading || isUserLoading ? (
              <div className='flex-center gap-2'>
                <Loader /> Loading. . .
              </div>
            ): (
              "로그인"
            )}
          </Button>

          {/* route to sign up */}
          <p className='text-small-regular text-light-2 text-center mt-2'>
            Don&apos;t have an account?
            <Link to="/sign-up" className='text-[#f97516] text-small-semibold ml-1'>
              Sign up
            </Link>
          </p>

        </form>

      </div>
    </Form>
  )
}

export default SignInForm