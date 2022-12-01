import React from "react";
import { useState } from "react";

function SubjectInputForm({
  id = "",
  lecture = "",
  sbjt = "",
  deadline = "",
  content = "",
  onUpdate = (f) => f,
}) {
  const [txtLecture, setLecture] = useState(lecture);
  const [txtSubject, setSubject] = useState(sbjt);
  const [txtDeadline, setDeadline] = useState(deadline);
  const [txtContent, setContent] = useState(content);

  const onSubmit = (event) => {
    event.preventDefault();
    onUpdate(id, txtLecture, txtSubject, txtDeadline, txtContent);
    setLecture("");
    setSubject("");
    setDeadline("");
    setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={txtLecture}
          placeholder="과목명을 입력하세요."
          onChange={(event) => setLecture(event.target.value)}
        ></input>
        <input
          type="text"
          value={txtSubject}
          placeholder="과제명을 입력하세요"
          onChange={(event) => setSubject(event.target.value)}
        ></input>
        <input
          type="date"
          value={txtDeadline}
          placeholder="마감 날짜를 정해주세요"
          onChange={(event) => setDeadline(event.target.value)}
        ></input>
        <textarea
          rows="20"
          cols="100"
          value={txtContent}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <input type="submit" value={"수정"}></input>
      </form>
    </div>
  );
}

export default SubjectInputForm;
