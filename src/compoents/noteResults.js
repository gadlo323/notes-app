import React from "react";
import "../App.css";

const ResultsNote = (props) => {
  return (
    <li className="Note">
      <div className="left-side">
        &#128204;
        <strong>{props.title}</strong>
        <p>{props.text}</p>
      </div>
      <div>
        <div>
          <span className="nowDate">{props.date}</span>
          <button
            className="removeNote"
            onClick={() => props.handleOpenModal()}
          >
            <i className="fa fa-trash fa-2x"></i>
          </button>
        </div>
        <small className="update-tag">
          {props.Updatedate ? "✎ Update in " + props.Updatedate : ""}
        </small>
      </div>
    </li>
  );
};

export default ResultsNote;
