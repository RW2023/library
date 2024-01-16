//src/components/forms/Auth.tsx
'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/components/ui/Loading';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const supabase = createClientComponentClient();

interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: any; // or a more specific type if you know the structure
  // Include other fields if necessary
}


  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
     setUser(user as User | null);

      setLoading(false);
    }

    getUser();
  }, [supabase.auth]);

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
   setUser(user as User | null);

    router.refresh();
    setEmail('');
    setPassword('');
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(user as User | null);

    router.refresh();
    setEmail('');
    setPassword('');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  // console.log({ loading, user });

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-base">
        <div className="bg-black p-8 rounded-lg shadow-md w-96 text-center">
          <h1 className="mb-4 text-xl font-bold">
            You&apos;re  logged in!
          </h1>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full p-3 rounded-md bg-red-500 hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
          <button
            type="button"
            onClick={() => router.push('/devdash')}
            className="w-full mt-4 p-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          >
            Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleSignUp}
          className="w-full mb-2 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={handleSignIn}
          className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
        >
          Sign In
        </button>
      </div>
    </main>
  );
}