import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";

const VotePage = ({ electionId, userId, onBack }) => {
  const axiosSecure = useAxios();
  const [grouped, setGrouped] = useState({});
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!electionId) return;

    axiosSecure
      .get(`/candidates/${electionId}`)
      .then((res) => {
        const group = {};
        res.data.forEach((c) => {
          if (!group[c.position]) group[c.position] = [];
          group[c.position].push(c);
        });
        setGrouped(group);
      })
      .finally(() => setLoading(false));
  }, [axiosSecure, electionId]);

  const handleSelect = (position, studentId) => {
    setSelected((prev) => ({ ...prev, [position]: studentId }));
  };

  const handleSubmit = async () => {
    const positions = Object.keys(grouped);

    if (positions.length !== Object.keys(selected).length) {
      return toast.error("You didn't cast vote on every position");
    }

    const votes = Object.entries(selected).map(([position, studentId]) => ({
      position,
      studentId,
    }));

    try {
      await axiosSecure.post("/votes", {
        electionId,
        userId,
        votes,
      });

      toast.success("Vote submitted successfully");
      onBack(); 
    } catch (err) {
      toast.error("Failed to submit vote");
    }
  };

  if (loading) return <p>Loading candidates...</p>;

  return (
    <div className="space-y-6">
      {Object.keys(grouped).map((position) => (
        <div key={position} className="bg-white p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4 uppercase">{position}</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {grouped[position].map((c) => (
              <label
                key={c.studentId}
                className={`border p-4 rounded-lg cursor-pointer text-center transition
    ${
      selected[position] === c.studentId ? "border-green-500" : "border-black"
    }`}
              >
                <input
                  type="radio"
                  name={position}
                  className=""
                  onChange={() => handleSelect(position, c.studentId)}
                />
                <img
                  src={c.photo}
                  className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">{c.studentId}</p>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <button onClick={onBack} className="w-1/2 bg-gray-300 py-3 rounded-lg">
          Back
        </button>

        <button
          onClick={handleSubmit}
          className="w-1/2 bg-green-500 text-white py-3 rounded-lg"
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
};

export default VotePage;
