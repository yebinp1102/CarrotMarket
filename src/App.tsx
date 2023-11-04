import './global.css';
import { Routes, Route } from 'react-router-dom';
import SignInForm from './privateRoutes/form/SignInForm';
import SignupFrom from './privateRoutes/form/SignupFrom';
import AuthLayout from './privateRoutes/AuthLayout';
import RootLayout from './publicRoutes/RootLayout';
import Home from './publicRoutes/pages/Home';

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
    </main>
  )
}

export default App