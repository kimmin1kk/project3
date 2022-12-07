import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Updater(props) {
  const subjectId = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    navigation(`/subject/${subjectId.id}`);
  }, []);

  return (
    <div>
      <h2>수정중입니다.</h2>
    </div>
    //평소에는 뜰 일이 없음
  );
}

export default Updater;
