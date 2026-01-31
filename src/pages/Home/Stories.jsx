import rayhan from "../../assets/rayhan.png";
import image from "../../assets/image.png";
import avatar from "../../assets/avatar.png";
import mypic from "../../assets/mypic3.jpg";

const Stories = () => {
  const reviews = [
    {
      name: "Rayhanul Islam Rony",
      role: "Student, Dept of CSE",
      img: image,
      comment:
        "আগে ম্যানুয়ালি ভোট দিতে ঘন্টার পর ঘন্টা লাইনে দাঁড়াতে হতো। Vote Ballot সেটাকে ২ মিনিটের কাজে পরিণত করেছে!",
    },
    {
      name: "Israt Jahan Tamanna",
      role: "Student, Dept of English",
      img: avatar,
      comment:
        "Vote Ballot made campus elections simple and stress-free. I could vote securely from my phone without missing a single update.",
    },
    {
      name: "MD Rayhan",
      role: "Student, Dept of CSE",
      img: rayhan,
      comment:
        "এতো স্বচ্ছ ফলাফল আগে কখনো দেখিনি। ড্যাশবোর্ড থেকে আমরা সবাই আপডেট দেখতে পারছিলাম।",
    },
    {
      name: "Ismita Jahan",
      role: "Student, Dept of Biochemistry",
      img: avatar,
      comment:
        "The transparency of the voting process really impressed me. Results were clear, fast, and completely trustworthy.",
    },
    {
      name: "Sazzad Hossain",
      role: "Student, Dept of Mathematics",
      img: avatar,
      comment:
        "With Vote Ballot, I can cast my vote from home or anywhere on campus—quick, secure, and hassle‑free.",
    },
    {
      name: "Shaida Khanom Sharna",
      role: "Student, Dept of CSE",
      img: mypic,
      comment:
        "Vote Ballot made campus elections simple and stress-free. I could vote securely from my phone without missing a single update.",
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden" id="stories">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-slate-900">
              Stories of <span className="text-indigo-600">Impact</span>
            </h2>
            <p className="mt-2 text-slate-600">
              Trusted by thousands of students across the campus.
            </p>
          </div>
          <button className="bg-indigo-50 text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-all">
            View All Stories
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-indigo-50/50 p-10 rounded-[40px] border border-indigo-100 flex flex-col md:flex-row gap-6 items-start"
            >
              <img
                src={r.img}
                alt={r.name}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-lg"
              />
              <div>
                <p className="text-lg italic text-slate-700 mb-6">
                  "{r.comment}"
                </p>
                <h4 className="font-bold text-slate-900">{r.name}</h4>
                <p className="text-sm text-indigo-600">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;