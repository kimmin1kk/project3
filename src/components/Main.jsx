import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Main.module.css";
import SubjectList from "./SubjectList";

function Main({
  subjects = [],
  removeSubjects = (f) => f,
  updateSubject = (f) => f,
}) {
  const navigate = useNavigate();

  const navigateToAddSbjt = () => {
    navigate("/add");
  };
  return (
    <div>
      <button onClick={() => navigateToAddSbjt()} className={styles.addbutton}>
        <span class="material-symbols-outlined">assignment_add</span>
      </button>

      <SubjectList
        subjects={subjects}
        onRemoveSubject={removeSubjects}
        onUpdateSubject={updateSubject}
      ></SubjectList>
    </div>
  );
}

export default Main;
