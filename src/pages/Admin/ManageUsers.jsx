import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../loading/Loading";
import { FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxios();
  const { createUser, updateUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [authorityData, setAuthorityData] = useState({
    name: "",
    email: "",
    password: "",
    photoFile: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // ---------------- FETCH USERS ----------------
  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE USER ----------------
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));

      Swal.fire("Deleted!", "User has been removed.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to delete user", "error");
    }
  };

  // ---------------- IMAGE UPLOAD ----------------
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axiosSecure.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.imageUrl;
  };

  // ---------------- CREATE AUTHORITY ----------------
  const handleCreateAuthority = async (e) => {
    e.preventDefault();

    try {
      let photoURL = "";

      if (authorityData.photoFile) {
        photoURL = await uploadImage(authorityData.photoFile);
      }

      // firebase create
      const result = await createUser(
        authorityData.email,
        authorityData.password
      );

      await updateUser({
        displayName: authorityData.name,
        photoURL,
      });

      // save to database
      const userInfo = {
        name: authorityData.name,
        email: authorityData.email,
        role: "authority",
        created_at: new Date().toISOString(),
        firebaseUid: result.user.uid,
        photo: photoURL,
      };

      await axiosSecure.post("/users", userInfo);

      Swal.fire("Success!", "Authority created successfully", "success");

      setShowModal(false);
      setAuthorityData({
        name: "",
        email: "",
        password: "",
        photoFile: null,
      });

      fetchUsers();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Authority registration failed", "error");
    }
  };

  if (loading) return <Loading message="Loading users..." />;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manage Users</h2>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <FaPlus /> Create Authority
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={user.photo}
                    className="w-10 h-10 border rounded-full object-cover"
                  />
                </td>
                <td>{user.name}</td>
                <td className="text-sm text-gray-500">{user.email}</td>
                <td>
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Create Authority</h3>

            <form onSubmit={handleCreateAuthority} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
                onChange={(e) =>
                  setAuthorityData({ ...authorityData, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
                onChange={(e) =>
                  setAuthorityData({ ...authorityData, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                required
                minLength={6}
                onChange={(e) =>
                  setAuthorityData({
                    ...authorityData,
                    password: e.target.value,
                  })
                }
              />

              <input
                type="file"
                accept="image/*"
                className="input input-bordered w-full"
                onChange={(e) =>
                  setAuthorityData({
                    ...authorityData,
                    photoFile: e.target.files[0],
                  })
                }
              />

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
