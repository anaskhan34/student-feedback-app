import { useState } from "react";
// import FeedbackRender from "./components/FeedbackRender";
import Swal from "sweetalert2";
import FeedbackRender from "./components/list-feedback";

function App() {
  const [feedback, setFeedback] = useState({
    id: null,
    name: "",
    email: "",
    course: "",
    semester: "",
    department: "",
    instructor: "",
    rating: "",
    feedbackText: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [allFeedbackList, setAllFeedbackList] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("all");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      setAllFeedbackList((prev) =>
        prev.map((item) => (item.id === editId ? feedback : item)),
      );
      setIsEdit(false);
      setEditId(null);

      Swal.fire("Updated!", "Feedback updated successfully", "success");
    } else {
      setAllFeedbackList((prev) => [...prev, { ...feedback, id: Date.now() }]);
    }

    setFeedback({
      id: null,
      name: "",
      email: "",
      course: "",
      semester: "",
      department: "",
      instructor: "",
      rating: "",
      feedbackText: "",
    });
  };

  const deleteList = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setAllFeedbackList((prev) => prev.filter((f) => f.id !== id));
        Swal.fire("Deleted!", "", "success");
      }
    });
  };

  const editList = (id) => {
    setIsEdit(true);
    setEditId(id);
    setFeedback(allFeedbackList.find((item) => item.id === id));
  };

  const filteredFeedback = allFeedbackList.filter((item) => {
    const r = Number(item.rating);
    if (ratingFilter === "all") return true;
    if (ratingFilter === "4") return r >= 4;
    if (ratingFilter === "5") return r === 5;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-8 text-center shadow mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Student Feedback Portal
          </h1>
          <p className="text-blue-100 mt-2">
            Share your thoughts & help us improve
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 space-y-4"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              Submit Your Feedback
            </h2>

            {[
              ["name", "Name"],
              ["email", "Email"],
              ["course", "Course"],
              ["instructor", "Instructor"],
            ].map(([key, label]) => (
              <input
                key={key}
                name={key}
                value={feedback[key]}
                onChange={handleChange}
                placeholder={label}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            ))}

            <select
              name="semester"
              value={feedback.semester}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>

            <select
              name="department"
              value={feedback.department}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Mechanical Engineering">
                Mechanical Engineering
              </option>
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Cybersecurity Engineering">
                Cybersecurity Engineering
              </option>
            </select>

            {/* STARS */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num} className="cursor-pointer text-3xl">
                  <input
                    type="radio"
                    name="rating"
                    value={num}
                    checked={feedback.rating === String(num)}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span
                    className={
                      Number(feedback.rating) >= num
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                </label>
              ))}
            </div>

            <textarea
              name="feedbackText"
              value={feedback.feedbackText}
              onChange={handleChange}
              rows="4"
              placeholder="Write your feedback..."
              className="w-full border rounded-lg px-4 py-2"
              required
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer">
              {isEdit ? "Save Changes" : "Submit Feedback"}
            </button>
          </form>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* FILTER */}
            <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-3">
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="border px-4 py-2 rounded-lg"
              >
                <option value="all">All</option>
                <option value="4">4★ & Above</option>
                <option value="5">5★ Only</option>
              </select>
            </div>

            <FeedbackRender
              feedback={filteredFeedback}
              deleteList={deleteList}
              editList={editList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
