import { useState } from "react";
import {
  FaUser,
  FaIdCard,
  FaGraduationCap,
  FaEnvelope,
  FaPhone,
  FaHourglassHalf,
  FaEdit,
  FaSave,
  FaTimes
} from "react-icons/fa";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";


// ✅ MOVE THIS OUTSIDE
const InfoItem = ({ icon: Icon, label, value, name, editable, isEditing, editData, setEditData }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
      <Icon />
    </div>
    <div className="flex-1">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>

      {isEditing && editable ? (
        <input
          type="text"
          className="w-full bg-white border border-indigo-200 rounded px-2 py-1 mt-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          value={editData[name] || ""}
          onChange={(e) =>
            setEditData((prev) => ({
              ...prev,
              [name]: e.target.value
            }))
          }
        />
      ) : (
        <p className="font-medium text-slate-700">{value || "N/A"}</p>
      )}
    </div>
  </div>
);


const ProfileSection = () => {
  const { user, setUser } = useAuth();
  const axiosSecure = useAxios();
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    name: user?.name || user?.displayName || "",
    phone: user?.phone || "",
    batch: user?.batch || "",
    session: user?.session || "",
    department: user?.department || "",
  });

  const handleSave = async () => {
    try {
      const res = await axiosSecure.patch(`/users/${user.email}`, editData);

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        toast.success("Profile updated successfully!");
        setUser({ ...user, ...editData });
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FaUser className="text-indigo-600" /> Student Profile
        </h2>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors font-medium text-sm"
          >
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium text-sm"
            >
              <FaTimes /> Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium text-sm"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InfoItem
            icon={FaUser}
            label="Full Name"
            value={user?.name || user?.displayName}
            name="name"
            editable={true}
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
          />

          <InfoItem
            icon={FaIdCard}
            label="Student ID"
            value={user?.studentId}
            editable={false}
            isEditing={isEditing}
          />

          <InfoItem
            icon={FaGraduationCap}
            label="Batch"
            value={user?.batch}
            name="batch"
            editable={true}
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
          />

          <InfoItem
            icon={FaHourglassHalf}
            label="Session"
            value={user?.session}
            name="session"
            editable={true}
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
          />

          <InfoItem
            icon={FaGraduationCap}
            label="Department"
            value={user?.department}
            name="department"
            editable={true}
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
          />

          <InfoItem
            icon={FaEnvelope}
            label="Email Address"
            value={user?.email}
            editable={false}
            isEditing={isEditing}
          />

          <InfoItem
            icon={FaPhone}
            label="Phone Number"
            value={user?.phone}
            name="phone"
            editable={true}
            isEditing={isEditing}
            editData={editData}
            setEditData={setEditData}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;