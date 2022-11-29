import React from "react";
import { useState } from "react";

function SubjectInputForm({
  id = "",
  lecture = "",
  sbjt = "",
  deadline = "",
  onAddSubject = (f) => f,
  onUpdate = (f) => f,
}) {
  const [txtLecture, setLecture] = useState(lecture);
  const [txtSubject, setSubject] = useState(sbjt);
  const [txtDeadline, setDeadline] = useState(deadline);

  const onSubmit = (event) => {
    event.preventDefault();
    if (id) {
      onUpdate(id, txtLecture, txtSubject, txtDeadline);
      setLecture("");
      setSubject("");
      setDeadline("");
    } else {
      onAddSubject(txtLecture, txtSubject, txtDeadline);
      setLecture("");
      setSubject("");
      setDeadline("");
    }
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
          type="text"
          value={txtDeadline}
          placeholder="마감 날짜를 정해주세요"
          onChange={(event) => setDeadline(event.target.value)}
        ></input>
        <input type="submit" value={id ? "수정" : "추가"}></input>
      </form>
    </div>
  );
}

export default SubjectInputForm;
