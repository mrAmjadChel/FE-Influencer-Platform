"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { authData, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(authData?.token) {
      router.push("/");
    }
  }, [authData, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }

      const data = await res.json();

      // เซฟ token
      login(data.token, data.user);

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 font-ubuntu p-4">
      <div className="bg-white w-full max-w-sm p-6 md:p-8 rounded-2xl shadow-lg">
        <p className="text-2xl md:text-3xl font-bold text-blue-600 text-center mb-6">
          Log in
        </p>

        {error && (
          <p className="text-red-500 text-center mb-3 text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-full border bg-gray-100 text-center"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-full border bg-gray-100 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-full 
                       py-2 px-10 mx-auto shadow-lg hover:opacity-90"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <p className="text-center mt-4 text-blue-500 text-sm md:text-base">
          <Link href="/signup" className="hover:underline ml-2">
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}
