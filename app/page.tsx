'use client'

import Link from "next/link";

export default function Home() {
  return (
   <div className="bg-yellow-300">
    <h1 className="bg-blue-200 text-2xl">Hello</h1>
    <Link href="/auth/login">Login</Link>
   </div>
  );
}
