import React from "react";
import { useContext, useState } from "react";
import SubjectInputForm from "./SubjectInputForm";

function SubjectListItem({
  id = "",
  lecture = "idk",
  sbjt = "NoName",
  deadline = "11/23",
  onRemove = (f) => f,
  onUpdate = (f) => f,
}) {
  const [editable, setEditable] = useState(false);
  const handleClick = () => {
    onRemove(id);
  };

  return (
    <div>
      <h3 onClick={() => (editable ? setEditable(false) : setEditable(true))}>
        {lecture}, {sbjt}, {deadline}
        <button onClick={handleClick}>삭제</button>
      </h3>
      {editable ? (
        <SubjectInputForm
          id={id}
          lecture={lecture}
          sbjt={sbjt}
          deadline={deadline}
          onUpdate={onUpdate}
        ></SubjectInputForm>
      ) : null}
    </div>
  );
}

export default SubjectListItem;
