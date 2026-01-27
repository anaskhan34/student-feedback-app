import { useState } from "react";

function App() {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    course: "",
    semester: "",
    department: "",
    instructor: "",
    rating: "",
    feedback: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {};

  return (
    <>
      <center>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">name</label>
            <input type="text" id="name" name="name" onChange={handleChange} />
            <br />
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={feedback.name}
              onChange={handleChange}
            />
            <br />
            <label htmlFor="course">course</label>
            <input
              type="text"
              id="course"
              name="course"
              onChange={handleChange}
            />
            <br />
            <label htmlFor="course">semester</label>
            <select
              type="text"
              id="course"
              name="course"
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
          </form>
        </div>
      </center>
    </>
  );
}

export default App;
