import './global.css';
import { Routes, Route } from 'react-router-dom';
import SignInForm from './publicRoutes/form/SignInForm';
import SignupFrom from './publicRoutes/form/SignupFrom';
import AuthLayout from './publicRoutes/AuthLayout';
import RootLayout from './privateRoutes/RootLayout';
import { Toaster } from './components/ui/toaster';
import {Home, Explore, Saved, CreatePost, Profile, EditPost, PostDetails, UpdateProfile, AllUsers} from '@/privateRoutes/pages'

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes 모두 접근 가능한 라우트 */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path='/sign-up' element={<SignupFrom />} />
        </Route>

        {/* private routes 로그인 한 유저만 접근 가능한 라우트 */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App