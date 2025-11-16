"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const { authData, logout } = useAuth();

  return (
    <header className="bg-gray-100 shadow-md sticky top-0 z-50">
      <div className="mx-auto px-6 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/">
            <h1 className="font-bold text-xl text-blue-600 cursor-pointer">
              Influencer Platform
            </h1>
          </Link>

          <nav className="md:flex space-x-4 items-center">
            {authData ? (
              <>
                <div className="flex items-center space-x-2 ">
                  <span>{authData.user.fullName}</span>
                  <button
                    onClick={logout}
                    className="border p-2 rounded-2xl text-red-600 hover:bg-gray-200"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="border p-2 rounded-2xl text-blue-600 hover:bg-gray-200"
                >
                  เข้าสู่ระบบ
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
