import React, { useState, useEffect } from "react";
import API from "../api"; // مستدعى الـ API الخاص بك

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // الحالة تبدأ بقيم فارغة تماماً في انتظار البيانات الحقيقية من قاعدة البيانات
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    street_address: "",
    city: "",
    state: "",
    zip_code: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // جلب بيانات المستخدم الحقيقية من قاعدة البيانات
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // جلب التوكن المحفوظ عند تسجيل الدخول (عدل الاسم حسب ما تحفظه في الـ LocalStorage)
        const token = localStorage.getItem("token"); 

        // نرسل طلب للباكيند مع التوكن في الـ Headers ليتحقق من هوية المستخدم
        const response = await API.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        
        // هنا نستقبل البيانات الحقيقية القادمة من الداتابيز
        const user = response.data.user;
        
        setFormData({
          fullname: user.fullname || user.full_name || "",
          email: user.email || "",
          phone: user.phone || "",
          street_address: user.street_address || "",
          city: user.city || "",
          state: user.state || "",
          zip_code: user.zip_code || "",
        });
      } catch (err) {
        // إذا حدث خطأ، سنظهر رسالة الخطأ القادمة من السيرفر لنعرف المشكلة أين
        setError(err.response?.data?.message || "error in fetching data from server");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // إرسال التعديلات لحفظها في الداتابيز
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      // نرسل البيانات الجديدة للباكيند ليقوم بعمل UPDATE في الداتابيز
      await API.put("/api/auth/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("تم تحديث البيانات في قاعدة البيانات بنجاح! 🎉");
      setIsEditing(false); // إغلاق الفورم والعودة للجدول
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "فشل في حفظ البيانات في السيرفر !!");
    }
  };

  if (loading) {
    return <p className="text-center my-10 font-semibold text-blue-600">جاري جلب بياناتك من قاعدة البيانات...</p>;
  }

  return (
    <div className="max-w-6xl my-10 mx-2 flex flex-col gap-5">
      
      {/* رسائل النجاح أو الفشل */}
      {message && <p className="text-green-600 font-semibold text-center bg-green-50 p-2 rounded-md">{message}</p>}
      {error && <p className="text-red-600 font-semibold text-center bg-red-50 p-2 rounded-md">{error}</p>}

      {/* استمارة التعديل (تظهر وتختفي بالضغط على زر Edit Info) */}
      {isEditing && (
        <form
          onSubmit={handleUpdate}
          className="bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-5 py-2"
        >
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
            Edit Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="p-2 indent-4 bg-gray-100 outline outline-gray-300 rounded-md transition duration-200 focus:outline-2 focus:outline-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="p-2 indent-4 bg-gray-200 outline outline-gray-300 rounded-md text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="p-2 indent-4 bg-gray-100 outline outline-gray-300 rounded-md transition duration-200 focus:outline-2 focus:outline-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">Street Address</label>
              <input
                type="text"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
                className="p-2 indent-4 bg-gray-100 outline outline-gray-300 rounded-md transition duration-200 focus:outline-2 focus:outline-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="p-2 indent-4 bg-gray-100 outline outline-gray-300 rounded-md transition duration-200 focus:outline-2 focus:outline-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="p-2 indent-4 bg-gray-100 outline outline-gray-300 rounded-md transition duration-200 focus:outline-2 focus:outline-gray-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-700">ZIP Code</label>
              <input
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
                className="p-2 indent-4 bg-gray-100 outline outline-gray-300 rounded-md transition duration-200 focus:outline-2 focus:outline-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition font-semibold w-full max-w-xs m-auto"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* جدول عرض البيانات القادمة من قاعدة البيانات مباشرة */}
      <div className="bg-white shadow-2xl rounded-xl p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800">User Profile Summary</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`${
              isEditing ? "bg-gray-500 hover:bg-gray-600" : "bg-yellow-500 hover:bg-yellow-600"
            } text-white px-4 py-2 rounded-md font-semibold transition`}
          >
            {isEditing ? "Close Editor" : "Edit Info"}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 font-semibold">Field</th>
                <th className="py-3 px-6 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 font-semibold text-gray-700">Full Name</td>
                <td className="py-3 px-6 text-base font-normal text-gray-900">{formData.fullname || "—"}</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 font-semibold text-gray-700">Email</td>
                <td className="py-3 px-6 text-base font-normal text-gray-900">{formData.email || "—"}</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 font-semibold text-gray-700">Phone</td>
                <td className="py-3 px-6 text-base font-normal text-gray-900">{formData.phone || "—"}</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 font-semibold text-gray-700">Street Address</td>
                <td className="py-3 px-6 text-base font-normal text-gray-900">{formData.street_address || "—"}</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 font-semibold text-gray-700">City</td>
                <td className="py-3 px-6 text-base font-normal text-gray-900">{formData.city || "—"}</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 font-semibold text-gray-700">State</td>
                <td className="py-3 px-6 text-base font-normal text-gray-900">{formData.state || "—"}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-3 px-6 font-semibold text-gray-700">ZIP Code</td>
                <td className="py-3 px-6 text-base font-normal text-gray-900">{formData.zip_code || "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}