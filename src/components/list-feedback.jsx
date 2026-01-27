const FeedbackRender = ({ feedback, deleteList, editList }) => {
  if (!feedback || feedback.length === 0) {
    return <p>no Feedback available!</p>;
  }

  const handleDelete = (index) => {
    deleteList(index);
  };

  const handleEdit = (index) => {
    editList(index);
  };

  return (
    <>
      <div>
        {feedback.map((fb, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <button onClick={() => handleEdit(index)}>Edit</button>
            <br />
            <button onClick={() => handleDelete(index)}>Delete</button>
            <p>
              <strong>Name:</strong> {fb.name}
            </p>
            <p>
              <strong>Email:</strong> {fb.email}
            </p>
            <p>
              <strong>Course:</strong> {fb.course}
            </p>
            <p>
              <strong>Semester:</strong> {fb.semester}
            </p>
            <p>
              <strong>Department:</strong> {fb.department}
            </p>
            <p>
              <strong>Instructor:</strong> {fb.instructor}
            </p>
            <p>
              <strong>Rating:</strong> {fb.rating}
            </p>
            <p>
              <strong>Feedback:</strong> {fb.feedbackText}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeedbackRender;
