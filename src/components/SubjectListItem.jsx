import React from "react";
import { useState } from "react";
import SubjectInputForm from "./SubjectInputForm";
import { useNavigate, Link } from "react-router-dom";
import styles from "../styles/SubjectListItem.module.css";

//리스트 어떻게 뜨게할지 구현하는 페이지
function SubjectListItem({
  id = "g",
  lecture = "idk",
  sbjt = "NoName",
  deadline = "11/23",
  content = "아이아이",
  onRemove = (f) => f,
  onUpdate = (f) => f,
}) {
  const [editable, setEditable] = useState(false);
  const handleClick = () => {
    onRemove(id);
  };

  const navigate = useNavigate();
  return (
    //처음에 뜨는 거 (setEditable(false))
    <div>
      <div className={styles.mablock}>
        <h3
          className={styles.sblock}
          onClick={() =>
            // (editable ? setEditable(false) : setEditable(true))
            navigate(`/subject/${id}`)
          }
        >
          과제명 : {sbjt}{" "}
          <p className={styles.dnu}>
            {" "}
            세부 내용을 확인 및 수정하려면 클릭하세요
          </p>
        </h3>
        <button onClick={handleClick} className={styles.rmvbtn}>
          <span className="material-symbols-outlined">delete_forever</span>
        </button>
      </div>

      {editable ? ( //클릭했을 때 (setEditable(true))
        <SubjectInputForm
          id={id}
          lecture={lecture}
          sbjt={sbjt}
          deadline={deadline}
          content={content}
          onUpdate={onUpdate}
        ></SubjectInputForm>
      ) : null}
    </div>
  );
}

export default SubjectListItem;
