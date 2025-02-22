'use client';
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import GoogleIcon from "@/public/google.webp"
import { createClient } from '@/db/supabase/client';

export default function SignInBtn() {
    const handleSignIn = async () => {
        let origin = "";
        const isLocalEnv = process.env.NODE_ENV === "development";
        if (isLocalEnv) {
          origin = "http://localhost:3000";
        } else {
          origin = "https://orbitai.vercel.app";
        }
        const supabase = createClient();
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${origin}/api/oauth`,
          },
        });
      };
  return (
    <Button size="lg" onClick={handleSignIn} className="h-10 scale-95 group hover:scale-100 px-3 gap-1 bg-white hover:bg-gray-50 hover:shadow-lg transition ease-in-out text-black border rounded-xl border-gray-300 shadow-md">
            <Image src={GoogleIcon} alt="Google Logo" width={32} height={32} className="scale-105" />
            Continue with Google
          </Button>
  )
}
