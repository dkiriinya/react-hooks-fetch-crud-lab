// QuestionList.js
import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setItems(questions));
  }, []);

  const handleDelete = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setItems((prevItems) => prevItems.filter((question) => question.id !== questionId));
          alert("Item succesfuly deleted")
          window.location.reload()
        } else {
          console.error("Failed to delete question from the server");
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {items.map((question) => (
          <QuestionItem key={question.id} question={question} onDelete={handleDelete} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
