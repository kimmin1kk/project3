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
  );
}

export default Updater;
