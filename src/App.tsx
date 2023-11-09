import './global.css';
import { Routes, Route } from 'react-router-dom';
import SignInForm from './publicRoutes/form/SignInForm';
import SignupFrom from './publicRoutes/form/SignupFrom';
import AuthLayout from './publicRoutes/AuthLayout';
import RootLayout from './privateRoutes/RootLayout';
import Home from './privateRoutes/pages/Home';
import { Toaster } from './components/ui/toaster';

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
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App