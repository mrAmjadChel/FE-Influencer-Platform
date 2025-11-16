"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../../context/AuthContext";
import { FormData } from "../../../../types/Interfaces";
import { toNumberOrNull, formatDate } from "../../../../utils/formHelper";
import { ConfirmModal } from "@/components/ConfirmModal";

export default function EditProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { authData } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState<FormData | null>(null);

  const categories = ["Beauty", "Lifestyle", "Food", "Travel", "Technology"];
  const platforms = ["Instagram", "TikTok", "Facebook", "YouTube"];

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/people/${id}`,
          {
            headers: { Authorization: `Bearer ${authData.token}` },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "โหลดข้อมูลผิดพลาด");

        const p = data;
        const inf = data.influencerProfiles?.[0] || null;

        setForm({
          type: p.type,
          fullName: p.fullName || "",
          preferredName: p.preferredName || "",
          gender: p.gender || "",
          birthDate: formatDate(p.birthDate),
          email: p.email || "",
          phone: p.phone || "",
          city: p.city || "",
          country: p.country || "",
          occupation: p.occupation || "",
          interests: p.interests || "",
          notes: p.notes || "",
          collaborationStatus: p.collaborationStatus || "",
          languages: p.languages || "",
          lastContactDate: formatDate(p.lastContactDate),
          portfolioUrl: p.portfolioUrl || "",

          category: inf?.category || "",
          primaryPlatform: inf?.primaryPlatform || "",
          primaryFollowers: toNumberOrNull(inf?.primaryFollowers),
          totalFollowersCount: toNumberOrNull(inf?.totalFollowersCount),
          engagementRate: toNumberOrNull(inf?.engagementRate),
          engagementRateTier: inf?.engagementRateTier || "",
          secondaryPlatform: inf?.secondaryPlatform || "",
          secondaryFollowersCount: toNumberOrNull(inf?.secondaryFollowersCount),
          averageMonthlyReach: toNumberOrNull(inf?.averageMonthlyReach),
        });
      } catch (err: any) {
        setErrorMsg(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, authData.token]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!form) return <p className="p-6 text-red-500">{errorMsg}</p>;

  const isInfluencer = form.type === "INF";

  async function submitForm() {
    if (!form) return;
    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/people/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.token}`,
          },
          body: JSON.stringify({
            ...form,
            primaryFollowers: toNumberOrNull(form.primaryFollowers),
            totalFollowersCount: toNumberOrNull(form.totalFollowersCount),
            engagementRate: toNumberOrNull(form.engagementRate),
            secondaryFollowersCount: toNumberOrNull(
              form.secondaryFollowersCount
            ),
            averageMonthlyReach: toNumberOrNull(form.averageMonthlyReach),
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "อัปเดตไม่สำเร็จ");

      alert("อัปเดตสำเร็จ!");
      router.push(`/profile/${id}`);
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirm() {
    setShowConfirm(false);
    await submitForm();
  }

  return (
    <div className="bg-blue-100">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">แก้ไขโปรไฟล์</h1>

        {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowConfirm(true);
          }}
          className="grid grid-cols-1 gap-4 bg-white p-6 rounded-xl shadow"
        >
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

          {/* ---- Influencer Section ---- */}
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
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition mt-4"
          >
            {saving ? "กําลังบันทึก..." : "ตกลง"}
          </button>
        </form>

        <ConfirmModal
          open={showConfirm}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          title="ยืนยันการแก้ไข"
          message="คุณแน่ใจหรือไม่ว่าต้องการบันทึกการเปลี่ยนแปลงนี้?"
        />
      </div>
    </div>
  );
}
