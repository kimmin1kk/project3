import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState } from "react";

import subjectData from "./data/subject.data.json";
import { Routes, Route } from "react-router-dom";
import { v4 } from "uuid";

import SubjectInputForm from "./components/SubjectInputForm";
import SubjectList from "./components/SubjectList";
// import NewSubjectForm from "./components/NewSubjectForm";
// import SubjectInfo from "./components/SubjectInfo";

function App() {
  const [subjects, setSubjects] = useState(subjectData.subjectList);

  const removeSubjects = (id) => {
    const newSubjects = subjects.filter((subject) => subject.id !== id);
    setSubjects(newSubjects);
  };

  const addSubject = (lecture, sbjt, deadline) => {
    const subject = {
      id: v4(),
      lecture: lecture,
      sbjt: sbjt,
      deadline: deadline,
    };
    const newSubjects = [...subjects, subject];
    setSubjects(newSubjects);
  };

  const updateSubject = (id, lecture, sbjt, deadline) => {
    const newSubjects = subjects.map((subject) =>
      subject.id === id ? { id, lecture, sbjt, deadline } : subject
    );

    setSubjects(newSubjects);
  };

  return (
    <div className="App">
      <Header></Header>
      <SubjectList
        subjects={subjects}
        onRemoveSubject={removeSubjects}
        onUpdateSubject={updateSubject}
      ></SubjectList>
      <SubjectInputForm onAddSubject={addSubject}></SubjectInputForm>
      <Footer></Footer>
    </div>
  );
}

export default App;
