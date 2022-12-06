# 소개실 개인 프로젝트 CRUD

## Basic Setting

1. npm create-react-app “name”
2. npm install react-router-dom 
    1. index.js 들어가서 import { BrowserRouter } from “react-router-dom”; 추가 
    2. index.js 내 **<App /> →**  <BrowserRouter>**<App />**</BrowserRouter> 

## Code

- App.js
    
    ```jsx
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
    ```
    
- **components (9개의 컴포넌트)**
    - Header.jsx
        
        ```jsx
        import React from "react";
        import styles from "../styles/Header.module.css";
        function Header(props) {
          return (
            <div>
              <h3 className={styles.header}>
                <span className="material-symbols-outlined">subject</span> 과제 관리
                시스템{" "}
              </h3>
            </div>
          );
        }
        
        export default Header;
        ```
        
    - Main.jsx
        
        ```jsx
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
                <span className="material-symbols-outlined">assignment_add</span>
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
        ```
        
    - PageNotFound.jsx
        
        ```jsx
        import React from "react";
        import { Link } from "react-router-dom";
        
        function PageNotFound(props) {
          return (
            <div>
              <h1> 잘못된 접근입니다.</h1>
              <Link to="/">
                <span> 돌아가기 </span>
              </Link>
            </div>
          );
        }
        
        export default PageNotFound;
        ```
        
    - SubjectList.jsx
        
        ```jsx
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
        ```
        
    - SubjectListItem.jsx
        
        ```jsx
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
        ```
        
    - SubjectInputForm.jsx
        
        ```jsx
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
        ```
        
    - SubjectDetail.jsx
        
        ```jsx
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
        ```
        
    - AddSubject.jsx
        
        ```jsx
        import React, { useState } from "react";
        import { Link, useNavigate } from "react-router-dom";
        import styles from "../styles/AddSubject.module.css";
        //Create, Routing 완료
        
        function AddSubject({ lecture, sbjt, deadline, content, onAddSubject }) {
          const [txtLecture, setLecture] = useState("");
          const [txtSubject, setSubject] = useState("");
          const [txtDeadline, setDeadline] = useState("");
          const [txtContent, setContent] = useState("");
        
          const navigation = useNavigate();
        
          const onSubmit = (event) => {
            event.preventDefault();
            onAddSubject(txtLecture, txtSubject, txtDeadline, txtContent);
            setLecture("");
            setSubject("");
            setDeadline("");
            setContent("");
            navigation("/");
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
              <button type="click" className={styles.backbtn}>
                <Link to="/">
                  <span class="material-symbols-outlined">arrow_back</span>
                </Link>
              </button>
            </div>
          );
        }
        
        export default AddSubject;
        ```
        
    - Footer.jsx
        
        ```jsx
        import React from "react";
        import styles from "../styles/Footer.module.css";
        function Footer(props) {
          return (
            <div>
              <h4 className={styles.footer}>20191437 김경민</h4>
            </div>
          );
        }
        
        export default Footer;
        ```
        
- **data**
    - subject.data.json
        
        ```json
        {
          "subjectList": [
            {
              "id": "sdfadsf",
              "lecture": "소프트웨어개발실습2",
              "sbjt": "개인 프로젝트 만들기",
              "deadline": "2022-11-09",
              "content": "개인 프로젝트 일정\n- 프로젝트 기획 및 계획서 제출(~11/27)\n\n- 프로젝트 구현 및 소스코드 제출(~12/6)\n\n- 프로젝트 시연(12/7)\n\n- 프로젝트 보완 및 결과보고 제출(~12/10)\n\n  * 계획서 및 결과보고서 양식은 과제 공지 시 업로드 예정"
            },
            {
              "id": "eofejfo",
              "lecture": "소프트웨어실무영어",
              "sbjt": "Homework 1",
              "deadline": "2022-11-29",
              "content": "Hello,\n\nThis is Homework 1.\n\nSubmit homework to e-class.\n\nHomework can be typed or handwritten.\n\nIf it is typed, submit the file.\n\nIf it is handwritten, submit a photo.\n\nPlease make sure your NAME is in the filename and on the homework.\n\nIf you have questions, please send me a message.\n\nGood luck and hope to see you in class.\n\nRegards,"
            },
            {
              "id": "eofejfddo",
              "lecture": "컴퓨터네트워크",
              "sbjt": "OSS 커뮤니티 과제",
              "deadline": "2022-12-07",
              "content": "동서대학교 OSS 커뮤니티 (https://cafe.naver.com/dsuoss) 가입을 하고,\n\nwireshark 게시판 중 (자료(정보)공유, Q&A)에 1개의 게시글과 1개 이상의 댓글을 달고 해당 내용에 대해서 캡처를 해서 올리기 바랍니다.\n\n\n\n실제로 컴퓨터네트워크 관련된 질문, 카카오 사태와 관련된 내용, Wireshark 와 관련된 내용 등 수업시간과 관련된 내용은 모두 가능합니다.\n\n\n\n과제 제출은 수업콘텐츠 13주차 1차시에 제출해주면 됩니다,."
            },
            {
              "id": "adfjasd",
              "lecture": "컴퓨터구조",
              "sbjt": "5장 용어정리, 기본문제, 연습문제 풀이",
              "deadline": "2022-12-01",
              "content": "챕터5를 공부하고 용어 정리 및 기본문제 풀이, 연습문제 풀이 정리 후 \n\n PDF 파일로 만들어서 올리세요."
            },
            {
              "id": "dfasdfasdfads",
              "lecture": "사용자인터페이스기획및설계",
              "sbjt": "과제1. 용어정리",
              "deadline": "2022-10-02",
              "content": "첫 시간에 공지한 과제 마감일이 얼마 남지 않았습니다.\n\n이번 리포트는 꼭 제출하시길 바랍니다. (기간 엄수)\n\n또한  각 항목은 지필고사에 반영되니 \n\n정리를 잘 해서 작성 해 주기를 바랍니다.\n\n=============================================\n\n \n형식 : PDF제출 (A4지, 3장이내, 12폰트, 줄간격 160이내)\n\n제출 : 과제란에 첨부\n\n마감일 : 10월2일\n\n 다음 각 항목을 요약 정의 시오.\n1. Design 정의\n2. 아이디어 발상기법 조사 (하나만 조사해도 됨)\n3. 멀티미디어, 하이퍼미디어 정의 및 전통적 미디어와의 비교 설명\n4. HCI 정의\n5. UI / UX 정의\n6. UI / UX가적용된 디자인을 예를 드시오.\n7. Information Architecture 의정의및 해당 분야 예시\n8. Html5 기본 특징 및기본구조\n9. CSS 기본 형식\n10. 이미지 종류"
            }
          ]
        }
        ```
        
- **styles (8개의 모듈)**
    - Header.module.css
        
        ```css
        .header {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #f6f6f6;
          color: #666;
          font-size: 36px;
        }
        ```
        
    - Main.module.css
        
        ```css
        .addbutton {
          background-color: rgb(192, 181, 181);
          color: black;
          border: 2px solid #e7e7e7;
          padding: 16px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          margin: 4px 2px;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
          cursor: pointer;
          border-radius: 20px;
          position: relative;
          top: 55px;
          right: 1px;
        }
        .addbutton:hover {
          background-color: #113f67;
          color: white;
        }
        ```
        
    - SubjectList.module.css
        
        ```css
        .sbar {
          height: 32px;
          border-radius: 48px;
          border: 0.5px solid lightgrey;
          width: 30%;
        
          position: relative;
          top: -90px;
          display: inline-block;
        }
        ```
        
    - SubjectListItem.module.css
        
        ```css
        .dnu {
          color: gray;
          font-size: 12px;
        }
        
        .mablock {
          display: inline-block;
          border: 2px solid #b4b7d1;
          margin-top: 50px;
          background-color: #f3f5f7;
          border-radius: 20px;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
        }
        .mablock:hover {
          background-color: #d7dcf8;
        }
        
        .sblock {
          border: 2px solid #f3f5f7;
          border-radius: 20px;
          margin-left: 50px;
          margin-right: 1px;
          margin-top: 1px;
          margin-bottom: 1px;
          padding: 10px 30px;
          cursor: pointer;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
          background-color: #f3f5f7;
        
          display: inline-block;
        }
        
        .sblock:hover {
          background-color: #d7dcf8;
          border: 2px solid #d7dcf8;
        }
        
        .rmvbtn {
          background-color: #a2a8d3;
          border: 2px solid #e7e7e7;
          border-radius: 10px;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
          padding: 3px 10px;
          cursor: pointer;
          display: inline-block;
        }
        .rmvbtn:hover {
          background-color: #f95959;
          color: white;
        }
        ```
        
    - SubjectInputForm.module.css
        
        ```css
        .add {
          border: 2px solid #e7e7e7;
          border-radius: 5px;
          cursor: pointer;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
        }
        
        .add:hover {
          background-color: #cbf078;
        }
        ```
        
    - SubjectDetail.module.css
        
        ```css
        .ssblock {
          border: 1px solid #333;
          border-radius: 5px;
          margin-right: 10px;
        }
        
        .editbtn {
          border: 2px solid #e7e7e7;
          border-radius: 5px;
          cursor: pointer;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
        }
        .editbtn:hover {
          color: white;
          background-color: #9fd3c7;
        }
        /* .canbtn {
          border: 2px solid #e7e7e7;
          cursor: pointer;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
        } */
        
        .canbtn {
          border: 2px solid #e7e7e7;
          border-radius: 5px;
          cursor: pointer;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
        }
        
        .canbtn:hover {
          background-color: #cf4444;
        }
        
        .detailbox {
          width: 800px;
          border: 1px solid #333;
          border-radius: 10px;
          box-shadow: 8px 8px 5px #444;
          padding: 8px 12px;
          margin: auto;
          font-size: 12px;
        }
        ```
        
    - AddSubject.module.css
        
        ```css
        .add {
          border: 2px solid #e7e7e7;
          border-radius: 5px;
          cursor: pointer;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
        }
        
        .add:hover {
          background-color: #cbf078;
        }
        
        .backbtn {
          border: 2px solid #e7e7e7;
          border-radius: 5px;
          cursor: pointer;
          -webkit-transition-duration: 0.4s;
          transition-duration: 0.4s;
        }
        
        .backbtn:hover {
          background-color: #cf4444;
        }
        ```
        
    - Footer.module.css
        
        ```css
        .footer {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #f6f6f6;
          color: #666;
          font-size: 18px;
        }
        ```
        
- index.js
    
    ```jsx
    import React from "react";
    import ReactDOM from "react-dom/client";
    import "./index.css";
    import App from "./App";
    import reportWebVitals from "./reportWebVitals";
    import { BrowserRouter } from "react-router-dom";
    
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
    ```
    
- App.css
    
    ```css
    .App {
      text-align: center;
      border: 3px solid #a2a8d3;
      border-radius: 20px;
      width: 1000px;
      margin: auto;
      background: #f3f5f7;
    }
    
    .App-logo {
      height: 40vmin;
      pointer-events: none;
    }
    
    @media (prefers-reduced-motion: no-preference) {
      .App-logo {
        animation: App-logo-spin infinite 20s linear;
      }
    }
    
    .App-header {
      background-color: #282c34;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      color: white;
    }
    
    .App-link {
      color: #61dafb;
    }
    
    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    ```
