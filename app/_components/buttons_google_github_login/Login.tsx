'use client';   

import { signIn } from 'next-auth/react';
//buttons pour connction avec github et google pense a bien depalce cette composant pour le faire fonctioner avec une librerie
const Login = () => {
  return (
    <div>
      <button onClick={() => signIn("github", { redirectTo: "/user-dashboard"})}>Sign In with GitHub</button>
      <button onClick={() => signIn("google", { redirectTo: "/user-dashboard"})}>Sign In with Google</button>
    
    </div>
  )
}

export default Login
