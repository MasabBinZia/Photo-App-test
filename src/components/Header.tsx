"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Photo Gallery</h1>
        <div className="flex items-center">
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt={`${session.user.name || "User"}'s Profile`}
              width={40}
              height={40}
              className="rounded-full mr-2"
            />
          )}
          {session ? (
            <Button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
            >
              Sign Out
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
}
