import React, { useState } from "react";
import SubjectListItem from "./SubjectListItem";

function SubjectList({
  subjects = [],
  onRemoveSubject = (f) => f,
  onUpdateSubject = (f) => f,
}) {
  const [txtFind, setFind] = useState("");
  return (
    <div>
      <label>
        검색할 과제명 입력 :
        <input
          type="text"
          placeholder="입력할 과제명"
          value={txtFind}
          onChange={(event) => setFind(event.target.value)}
        ></input>
      </label>
      {subjects
        .filter((subject) => subject.sbjt.includes(txtFind))
        .map((subject) => (
          <SubjectListItem
            key={subject.id}
            {...subject}
            onRemove={onRemoveSubject}
            onUpdate={onUpdateSubject}
          ></SubjectListItem>
        ))}
    </div>
  );
}

export default SubjectList;
