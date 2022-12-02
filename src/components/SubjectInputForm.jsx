import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SubjectInputForm.module.css";

function SubjectInputForm({
  subject = [],
  id = "",
  // lecture = "",
  // sbjt = "",
  // deadline = "",
  // content = "",
  onUpdate = (f) => f,
}) {
  const [subjects, setSubjects] = useState({
    id: "",
    lecture: "",
    sbjt: "",
    deadline: "",
    content: "",
  });

  useEffect(() => {
    setSubjects(
      subject.find((sub) => {
        return sub.id === id;
      })
    );
  }, [id]);

  const changeSubjects = (key, value) => {
    setSubjects((current) => {
      let newSubjects = { ...current };
      newSubjects[key] = value;
      return newSubjects;
    });
  };
  // const [txtLecture, setLecture] = useState(lecture);
  // const [txtSubject, setSubject] = useState(sbjt);
  // const [txtDeadline, setDeadline] = useState(deadline);
  // const [txtContent, setContent] = useState(content);

  const navigation = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    onUpdate(
      subjects.id,
      subjects.lecture,
      subjects.sbjt,
      subjects.deadline,
      subjects.content
    );
    changeSubjects("lecture", "");
    changeSubjects("subject", "");
    changeSubjects("deadline", "");
    changeSubjects("content", "");
    navigation(`/updater/${id}`);

    // setLecture("");
    // setSubject("");
    // setDeadline("");
    // setContent("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={subjects.lecture}
          placeholder="과목명을 입력하세요."
          onChange={(event) => changeSubjects("lecture", event.target.value)}
        ></input>
        <input
          type="text"
          value={subjects.sbjt}
          placeholder="과제명을 입력하세요"
          onChange={(event) => changeSubjects("sbjt", event.target.value)}
        ></input>
        <input
          type="date"
          value={subjects.deadline}
          placeholder="마감 날짜를 정해주세요"
          onChange={(event) => changeSubjects("deadline", event.target.value)}
        ></input>
        <textarea
          rows="20"
          cols="100"
          value={subjects.content}
          onChange={(event) => changeSubjects("content", event.target.value)}
        ></textarea>
        <button type="submit" className={styles.add}>
          <span class="material-symbols-outlined">done</span>
        </button>
      </form>
    </div>
  );
}

export default SubjectInputForm;
