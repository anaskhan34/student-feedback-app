import { useState } from "react";
import FeedbackRender from "./components/list-feedback";
import Swal from "sweetalert2";

function App() {
  const [feedback, setFeedback] = useState({
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
  const [editIndex, setEditIndex] = useState(null);

  const [allFeedbackList, setAllFeedbackList] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      if (feedback && editIndex !== null) {
        const updateEdit = allFeedbackList.map((item, i) =>
          i === editIndex ? feedback : item,
        );
        setAllFeedbackList(updateEdit);
        setIsEdit(false);
        setEditIndex(null);
      }
    } else {
      setAllFeedbackList((prev) => [...prev, feedback]);
    }

    // Clear form after submission
    setFeedback({
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

  const deleteList = (index) => {
    let confirmDel = window.confirm("Are you Sure to delete");
    // Swal.fire("delete!", "Your action was completed successfully.", "success");

    if (!confirmDel) return;

    let updateFromDelete = allFeedbackList.filter((val, i) => i !== index);
    setAllFeedbackList(updateFromDelete);
  };

  const editList = (index) => {
    setIsEdit(true);
    setEditIndex(index);
    setFeedback(allFeedbackList[index]);
  };

  return (
    <>
      <center>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              placeholder="name"
              required
            />
            <br />
            <br />
            {/* email */}
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              placeholder="email"
              required
            />
            <br />
            <br />
            {/* course */}
            <label htmlFor="course">course</label>
            <input
              type="text"
              id="course"
              name="course"
              value={feedback.course}
              onChange={handleChange}
              placeholder="course"
              required
            />
            <br />
            <br />
            {/* semester */}
            <label htmlFor="semester">semester</label>
            <select
              type="text"
              id="semester"
              name="semester"
              value={feedback.semester}
              onChange={handleChange}
            >
              <option value="">select your semester</option>
              <option value="one">one</option>
              <option value="two">two</option>
              <option value="three">three</option>
              <option value="four">four</option>
              <option value="five">five</option>
              <option value="six">six</option>
              <option value="seven">seven</option>
              <option value="eight">eight</option>
            </select>
            <br />
            <br />
            {/* department */}
            <label htmlFor="department">department</label>
            <select
              type="text"
              id="department"
              name="department"
              value={feedback.department}
              onChange={handleChange}
              required
            >
              <option value="">Select your Department</option>
              <option value="computer science">CS</option>
              <option value="software engineering">SE</option>
              <option value="artificial intelligence">AI</option>
            </select>
            <br />
            <br />
            {/* instructor */}
            <label htmlFor="instructor">instructor</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              placeholder="instructor"
              value={feedback.instructor}
              onChange={handleChange}
              required
            />
            <br /> <br />
            {/* rating */}
            <p>give rating</p>
            <br />
            <div>
              {[1, 2, 3, 4, 5].map((num) => {
                return (
                  <span key={num}>
                    <input
                      type="radio"
                      id={`rating-${num}`}
                      name="rating"
                      value={num}
                      checked={feedback.rating === String(num)}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor={`rating-${num}`}>{num}</label>
                  </span>
                );
              })}
            </div>
            <br />
            <br />
            {/* feedback Text */}
            <label htmlFor="feedbackText">Feedback</label>
            <textarea
              type="text"
              id="feedbackText"
              name="feedbackText"
              placeholder="Minimum 50 words are allowed"
              cols={50}
              rows={10}
              value={feedback.feedbackText}
              onChange={handleChange}
              required
            />
            <br /> <br />
            {isEdit ? (
              <button type="submit">save</button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </form>
        </div>
        <br />
        <br />
        <hr />
        <FeedbackRender
          feedback={allFeedbackList}
          deleteList={deleteList}
          editList={editList}
        />
      </center>
    </>
  );
}

export default App;
