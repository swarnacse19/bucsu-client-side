import { useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const AddDepartmentStudent = () => {
  const axiosSecure = useAxios();
  const [form, setForm] = useState({
    name: "",
    studentId: "",
    department: "CSE",
    batch: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosSecure.post("/department-students", form);
      toast.success("Student added successfully");

      setForm({
        name: "",
        studentId: "",
        department: "CSE",
        batch: "",
        email: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add student"
      );
    }
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Add Department Student
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Student Name"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          placeholder="Student ID"
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="batch"
          value={form.batch}
          onChange={handleChange}
          placeholder="Batch / Session"
          className="w-full border p-2 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="University Email"
          className="w-full border p-2 rounded"
        />

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="CSE">CSE</option>
          <option value="EEE">EEE</option>
          <option value="BBA">BBA</option>
        </select>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded"
        >
          Save Student
        </button>
      </form>
    </div>
  );
};

export default AddDepartmentStudent;