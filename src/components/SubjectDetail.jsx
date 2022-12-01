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
        {/* <p>{subject.lecture}</p>
        <p>{subject.sbjt}</p>
        <p>{subject.deadline}</p>
        <pre>{subject.content}</pre> */}

        <button
          onClick={() => (editable ? setEditable(false) : setEditable(true))}
        >
          변경하기
        </button>
        {editable ? (
          <SubjectInputForm
            id={subject.id}
            onUpdate={onUpdate}
          ></SubjectInputForm>
        ) : (
          <div>
            <p className={styles.sblock}>
              과목 : {subject.lecture} 과제 : {subject.sbjt} 마감일 :{" "}
              {subject.deadline}
            </p>
            <pre className={styles.detailbox}>{subject.content}</pre>
          </div>
        )}
        <Link to="/">
          <button>돌아가기</button>
        </Link>
      </div>
    </div>
  );
}

export default SubjectDetail;
