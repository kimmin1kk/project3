import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState } from "react";

import subjectData from "./data/subject.data.json";
import { Routes, Route } from "react-router-dom";
import { v4 } from "uuid";

import SubjectInputForm from "./components/SubjectInputForm";
import SubjectList from "./components/SubjectList";
import Main from "./components/Main";
import PageNotFound from "./components/PageNotFound";
import AddSubject from "./components/AddSubject";
import SubjectDetail from "./components/SubjectDetail";
import Updater from "./components/Updater";
// import NewSubjectForm from "./components/NewSubjectForm";
// import SubjectInfo from "./components/SubjectInfo";

function App() {
  const [subjects, setSubjects] = useState(subjectData.subjectList);

  const removeSubjects = (id) => {
    const newSubjects = subjects.filter((subject) => subject.id !== id);
    setSubjects(newSubjects);
  };

  const addSubject = (lecture, sbjt, deadline, content) => {
    const subject = {
      id: v4(),
      lecture: lecture,
      sbjt: sbjt,
      deadline: deadline,
      content: content,
    };
    const newSubjects = [...subjects, subject];
    setSubjects(newSubjects);
  };

  const updateSubject = (id, lecture, sbjt, deadline, content) => {
    const newSubjects = subjects.map((subject) =>
      subject.id === id ? { id, lecture, sbjt, deadline, content } : subject
    );

    setSubjects(newSubjects);
  };

  return (
    <div className="App" align="center">
      <Header></Header>

      <Routes>
        <Route
          path="/"
          element={
            <Main
              subjects={subjects}
              removeSubjects={removeSubjects}
              updateSubject={updateSubject}
            />
          }
        />
        <Route
          path="/subject/:id"
          element={
            <SubjectDetail subjects={subjects} onUpdate={updateSubject} />
          }
        ></Route>
        <Route
          path="/add"
          element={<AddSubject onAddSubject={addSubject}></AddSubject>}
        />
        <Route path="/updater/:id" element={<Updater></Updater>}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <SubjectList
        subjects={subjects}
        onRemoveSubject={removeSubjects}
        onUpdateSubject={updateSubject}
      ></SubjectList> */}
      {/* <SubjectInputForm onAddSubject={addSubject}></SubjectInputForm> */}
      <Footer></Footer>
    </div>
  );
}

export default App;
