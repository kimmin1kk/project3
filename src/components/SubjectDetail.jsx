import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SubjectInputForm from "./SubjectInputForm";
import styles from "../styles/SubjectDetail.module.css";
function SubjectDetail({ subjects = [], onUpdate = (f) => f }) {
  const subjectId = useParams();
  const [subject, setSubject] = useState({
    id: "",
    lecture: "",
    sbjt: "",
    deadline: "",
    content: "",
  });
  const [subList, setSubList] = useState(subjects);
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    setSubject(
      subList.find((subject) => {
        return subject.id == subjectId.id;
      })
    );
  }, [subjectId]);

  return (
    <div>
      <div>
        <button
          className={styles.editbtn}
          onClick={() => (editable ? setEditable(false) : setEditable(true))}
        >
          <span class="material-symbols-outlined">edit</span>
        </button>
        {editable ? (
          <SubjectInputForm
            subject={subjects}
            id={subjectId.id}
            onUpdate={onUpdate}
          ></SubjectInputForm>
        ) : (
          <div>
            <p>
              <span className={styles.ssblock}>과목 : {subject.lecture}</span>{" "}
              <span className={styles.ssblock}>과제 : {subject.sbjt}</span>{" "}
              <span className={styles.ssblock}>
                마감일 : {subject.deadline}
              </span>
            </p>
            <pre className={styles.detailbox}>{subject.content}</pre>
          </div>
        )}
        <Link to="/">
          <button className={styles.canbtn}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SubjectDetail;
