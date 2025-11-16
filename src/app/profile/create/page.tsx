"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { FormData } from "../../../types/Interfaces";
import { toNumberOrNull } from "../../../utils/formHelper";
import { ConfirmModal } from "@/components/ConfirmModal";

export default function CreateProfilePage() {
  const router = useRouter();
  const { authData } = useAuth();

  const [form, setForm] = useState<FormData>({
    type: "INF",
    fullName: "",
    preferredName: "",
    gender: "",
    birthDate: null,
    email: "",
    phone: "",
    city: "",
    country: "",
    occupation: "",
    interests: "",
    notes: "",
    collaborationStatus: "",
    languages: "",
    lastContactDate: null,
    portfolioUrl: "",

    category: "",
    primaryPlatform: "",
    primaryFollowers: null,
    totalFollowersCount: null,
    engagementRate: null,
    engagementRateTier: "",
    secondaryPlatform: "",
    secondaryFollowersCount: null,
    averageMonthlyReach: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const categories = ["Beauty", "Lifestyle", "Food", "Travel", "Technology"];
  const platforms = ["Instagram", "TikTok", "Facebook", "YouTube"];

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  const isInfluencer = form.type === "INF";

  async function submitForm() {
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/people`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
        body: JSON.stringify({
          ...form,
          primaryFollowers: toNumberOrNull(form.primaryFollowers),
          totalFollowersCount: toNumberOrNull(form.totalFollowersCount),
          engagementRate: toNumberOrNull(form.engagementRate),
          secondaryFollowersCount: toNumberOrNull(form.secondaryFollowersCount),
          averageMonthlyReach: toNumberOrNull(form.averageMonthlyReach),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "สร้างโปรไฟล์ไม่สำเร็จ");

      alert("สร้างโปรไฟล์สำเร็จ!");
      router.push(`/profile/${data.person?.id || data.id}`);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleConfirm() {
    setShowConfirm(false);
    submitForm();
  }

  return (
    <div className="bg-blue-100">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">สร้างโปรไฟล์</h1>

        {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowConfirm(true);
          }}
          className="grid grid-cols-1 gap-4 bg-white p-6 rounded-xl shadow"
        >
          {/* Type */}
          <div>
            <label className="font-semibold">Record Type</label>
            <select
              className="w-full p-2 border rounded"
              value={form.type}
              onChange={(e) =>
                updateField("type", e.target.value as "INF" | "IND")
              }
            >
              <option value="IND">บุคคลทั่วไป (IND)</option>
              <option value="INF">Influencer (INF)</option>
            </select>
          </div>

          {/* Full Name */}
          <div>
            <label className="font-semibold">Full Name</label>
            <input
              className="w-full p-2 border rounded"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              className="w-full p-2 border rounded"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold">Phone</label>
            <input
              className="w-full p-2 border rounded"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          {/* City */}
          <div>
            <label className="font-semibold">City</label>
            <input
              className="w-full p-2 border rounded"
              value={form.city}
              onChange={(e) => updateField("city", e.target.value)}
            />
          </div>

          {/* Interests */}
          <div>
            <label className="font-semibold">Interests</label>
            <input
              className="w-full p-2 border rounded"
              value={form.interests}
              onChange={(e) => updateField("interests", e.target.value)}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="font-semibold">Notes</label>
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
            />
          </div>

          {/* Collaboration Status */}
          <div>
            <label className="font-semibold">Status</label>
            <select
              className="w-full p-2 border rounded"
              value={form.collaborationStatus}
              onChange={(e) =>
                updateField("collaborationStatus", e.target.value)
              }
            >
              <option value="">เลือกสถานะ</option>
              <option value="open">เปิดรับงาน</option>
              <option value="busy">ไม่ว่าง</option>
              <option value="pending">รอดำเนินการ</option>
            </select>
          </div>

          {/* --- Influencer Only Section --- */}
          {isInfluencer && (
            <>
              <hr className="my-4" />
              <h2 className="text-lg font-bold">Influencer Profile</h2>

              {/* Category */}
              <div>
                <label className="font-semibold">Category</label>
                <select
                  className="w-full p-2 border rounded"
                  value={form.category}
                  required
                  onChange={(e) => updateField("category", e.target.value)}
                >
                  <option value="">เลือกหมวดหมู่</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Primary Platform */}
              <div>
                <label className="font-semibold">Primary Platform</label>
                <select
                  className="w-full p-2 border rounded"
                  value={form.primaryPlatform}
                  required
                  onChange={(e) =>
                    updateField("primaryPlatform", e.target.value)
                  }
                >
                  <option value="">เลือกแพลตฟอร์ม</option>
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Followers */}
              <div>
                <label className="font-semibold">Primary Followers</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={form.primaryFollowers ?? ""}
                  required
                  onChange={(e) =>
                    updateField(
                      "primaryFollowers",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                />
              </div>

              {/* Engagement Rate */}
              <div>
                <label className="font-semibold">Engagement Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full p-2 border rounded"
                  value={form.engagementRate ?? ""}
                  onChange={(e) =>
                    updateField(
                      "engagementRate",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                />
              </div>
            </>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4"
          >
            {loading ? "กําลังสร้าง..." : "ตกลง"}
          </button>
        </form>

        {/* Confirm Modal */}
        <ConfirmModal
          open={showConfirm}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          title="ยืนยันการสร้าง"
          message="คุณแน่ใจหรือไม่ว่าต้องการสร้างโปรไฟล์นี้?"
        />
      </div>
    </div>
  );
}
