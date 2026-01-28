import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";

const FeedbackRender = ({ feedback, deleteList, editList }) => {
  if (feedback.length === 0) {
    return <p className="text-center text-gray-500">No feedback available</p>;
  }

  return (
    <div className="space-y-4">
      <p className="font-semibold text-gray-700">
        Total Feedbacks: {feedback.length}
      </p>

      {feedback.map((fb) => (
        <div
          key={fb.id}
          className="bg-white rounded-xl shadow p-5 flex flex-col gap-3"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">{fb.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => editList(fb.id)}
                className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
              >
                <FiEdit />
              </button>
              <button
                onClick={() => deleteList(fb.id)}
                className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer"
              >
                <RiDeleteBin2Line />
              </button>
            </div>
          </div>

          <div className="text-yellow-400 text-xl">
            {"★".repeat(fb.rating)}
            <span className="text-gray-300">{"★".repeat(5 - fb.rating)}</span>
          </div>

          <p className="text-sm text-gray-600">
            {fb.course} | Semester {fb.semester} | {fb.department}
          </p>

          <p className="text-gray-700">
            <strong>Instructor :</strong> : {fb.instructor}
          </p>
          <p className="text-gray-700">
            <strong>Feedback</strong> : {fb.feedbackText}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackRender;
