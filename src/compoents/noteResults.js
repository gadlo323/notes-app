import React from "react";
import "../App.css";

export const ResultsNote = (props) => {
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

export const Archivnotes = (props) => {
  return (
    <li className="Note">
      <div className="left-side">
        <strong>{props.title}</strong>
        <span className="nowDate">{props.date}</span>
      </div>
      <div>
        <div>
          <div className="btn-archiv">
            <button
              className="removeNote"
              title="Note Recovery"
              onClick={() => props.recovery()}
            >
              <i className="fa fa-undo fa-2x"></i>
            </button>
            <button
              className="delete-archiv"
              title="delete from archiv"
              onClick={() => props.delForgood()}
            >
              <i className="fa fa-trash fa-2x"></i>
            </button>
          </div>
        </div>
        <small className="update-tag">
          {props.Updatedate ? "✎ Update in " + props.Updatedate : ""}
        </small>
      </div>
    </li>
  );
};
