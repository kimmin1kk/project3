import React, { useState } from "react";
import SubjectListItem from "./SubjectListItem";
import styles from "../styles/SubjectList.module.css";

function SubjectList({
  subjects = [],
  onRemoveSubject = (f) => f,
  onUpdateSubject = (f) => f,
}) {
  const [txtFind, setFind] = useState("");
  return (
    <div>
      <label>
        <input
          className={styles.sbar}
          type="text"
          placeholder="검색할 과제 입력"
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
