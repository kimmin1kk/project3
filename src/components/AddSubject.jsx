import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/AddSubject.module.css";
//Create, Routing 완료

function AddSubject({ lecture, sbjt, deadline, content, onAddSubject }) {
  const [txtLecture, setLecture] = useState("");
  const [txtSubject, setSubject] = useState("");
  const [txtDeadline, setDeadline] = useState("");
  const [txtContent, setContent] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    onAddSubject(txtLecture, txtSubject, txtDeadline, txtContent);
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
          placeholder="마감날짜를 정해주세요"
          onChange={(event) => setDeadline(event.target.value)}
        ></input>
        <textarea
          rows="20"
          cols="100"
          value={txtContent}
          placeholder="세부내용을 적어주세요"
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
        <button type="submit" className={styles.add}>
          <span class="material-symbols-outlined">done</span>
        </button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Link to="/">
        <span>돌아가기</span>
      </Link>
    </div>
  );
}

export default AddSubject;
