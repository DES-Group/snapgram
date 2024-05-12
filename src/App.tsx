import AuthLayout from './_auth/AuthLayout';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';
import './global.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"


export const App = () => {

  return (
    <main className='flex h-screen'>
        <Routes>
          {/** Public routes */}
          <Route element={<AuthLayout />} >
            <Route path='/sign-up' element={<SignUpForm />} /> {/** Create account */}
            <Route path='/sign-in' element={<SignInForm />} /> {/** Login */}
          </Route>

          {/** Private routes */}
          <Route element={<RootLayout />} >
            <Route index element={<Home />} />
          </Route>
        </Routes>
      <Toaster />
    </main>
  )
}