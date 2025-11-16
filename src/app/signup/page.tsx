"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // App Router
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, fullName, email, password }),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "ลงทะเบียนไม่สำเร็จ");
      }

      Swal.fire({
        title: "ลงทะเบียนสำเร็จ!",
        icon: "success",
        draggable: true,
      });

      router.push("/login");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 font-ubuntu p-4">
      <div className="bg-white w-full max-w-sm p-6 md:p-8 rounded-2xl shadow-lg">
        <p className="text-2xl md:text-3xl font-bold text-blue-600 text-center mb-6">
          Sign up
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-full border border-gray-200 bg-gray-100 text-center focus:border-blue-400 outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-full border border-gray-200 bg-gray-100 text-center focus:border-blue-400 outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-full border border-gray-200 bg-gray-100 text-center focus:border-blue-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-full border border-gray-200 bg-gray-100 text-center focus:border-blue-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-full py-2 px-10 mx-auto shadow-lg hover:opacity-90"
          >
            {loading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
          </button>
        </form>
        <p className="text-center mt-4 text-blue-500">
          <Link href="/login" className="hover:underline">
            เข้าสู่ระบบ
          </Link>
        </p>
      </div>
    </div>
  );
}
