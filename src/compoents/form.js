import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import moment from "moment";
import Modal from "react-modal";
import "moment-timezone";
import "../dataBase.js";
import ResultsNote from "./noteResults";
import "../App.css";
import { AllData, removeItemdb, saveNote, updateDb } from "../dataBase.js";
Modal.setAppElement("#root");
class AddNote extends React.Component {
  constructor(props) {
    let DateTime = moment().format("hh:mm:ss DD.MM.YYYY");
    super(props);
    this.state = {
      idDelete: 0,
      showModal: false,
      modelTitle: "",
      modelText: "",
      Notes: [],
      noteVal: "",
      noteTitle: "",
      date: DateTime,
      id: 0,
    };
  }
  handleOpenModal(id) {
    this.setState({ showModal: true, idDelete: id });
    let idDelete = id;
    const objIndex = this.state.Notes.findIndex((item) => item.id === idDelete);
    const item = this.state.Notes[objIndex];
    this.setState({ modelTitle: item.noteTitle, modelText: item.noteVal });
  }
  async componentDidMount() {
    let item = await AllData();
    if (item.length > 0) {
      setTimeout(() => {
        this.setState(() => {
          return {
            Notes: item,
            id: item[item.length - 1].id,
          };
        });
      }, 100);
    }
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  onChange(e) {
    e.preventDefault();
    let note = e.target.value;
    switch (e.target.name) {
      case "title":
        this.setState({ noteTitle: note });
        break;
      case "note":
        this.setState({ noteVal: note });
        break;
      case "titleModel":
        this.setState({ modelTitle: note });
        break;
      case "modelText":
        this.setState({ modelText: note });
        break;
      default:
    }
  }
  addNote(event) {
    this.handleCloseModal();
    event.preventDefault();
    this.setState({ id: this.state.id + 1 });
    const item = {
      id: this.state.id + 1,
      noteTitle: this.state.noteTitle,
      noteVal: this.state.noteVal,
      date: this.state.date,
      updateDate: "",
    };
    this.setState((state) => {
      return {
        Notes: [...state.Notes, item],
        noteTitle: "",
        noteVal: "",
      };
    });
    saveNote(item);
  }

  deleteNote() {
    const NewNotes = this.state.Notes.filter(
      (item) => item.id !== this.state.idDelete
    );
    this.setState((state) => {
      return { Notes: NewNotes };
    });
    removeItemdb(this.state.idDelete);
  }
  updateNote() {
    if (this.state.modelTitle || this.state.modelText) {
      const id = this.state.idDelete;
      const objIndex = this.state.Notes.findIndex((item) => item.id === id);
      let Newnotes = [...this.state.Notes];
      let item = {
        noteTitle: this.state.modelTitle,
        noteVal: this.state.modelText,
        updateDate: this.state.date,
      };
      Newnotes[objIndex] = {
        ...Newnotes[objIndex],
        noteTitle: this.state.modelTitle,
        noteVal: this.state.modelText,
        updateDate: this.state.date,
      };
      this.setState((state) => {
        return { Notes: Newnotes };
      });
      updateDb(id, item);
    }
  }

  render() {
    return (
      <div>
        <form className="formNote" onSubmit={(event) => this.addNote(event)}>
          <input
            className="title_Note"
            type="text"
            placeholder="Title.."
            value={this.state.noteTitle}
            name="title"
            onChange={(e) => this.onChange(e)}
          />
          <TextareaAutosize
            className="noteText"
            name="note"
            id="noteId"
            placeholder="Note message&#128221;.."
            cols="50"
            value={this.state.noteVal}
            onChange={(e) => this.onChange(e)}
            required
          />

          <button className="addBtn" type="submit">
            <i className="fa fa-plus"></i>
            New Note
          </button>
        </form>
        <ul className="AllNotes">
          {this.state.Notes.map((item) => (
            <ResultsNote
              key={item.id}
              title={item.noteTitle}
              text={item.noteVal}
              date={item.date}
              Updatedate={item.updateDate}
              handleOpenModal={() => this.handleOpenModal(item.id)}
            />
          ))}
        </ul>
        <Modal className="model-close" isOpen={this.state.showModal}>
          <i
            className="fa fa-times-circle "
            onClick={() => this.handleCloseModal()}
          ></i>
          <form className="model-form">
            <input
              name="titleModel"
              className="title_Note"
              type="text"
              value={this.state.modelTitle}
              placeholder="Update title.."
              onChange={(e) => this.onChange(e)}
            />
            <TextareaAutosize
              name="modelText"
              className="note-Model"
              value={this.state.modelText}
              placeholder="Update Note..."
              onChange={(e) => this.onChange(e)}
            />
          </form>
          <p>Are you sure you want to delete your note?</p>
          <div className="btn-Group">
            <button
              className="btn delete-btn"
              onClick={() => this.deleteNote(this.handleCloseModal())}
            >
              <i className="fa fa-trash"></i>
              Delete
            </button>
            <button
              className="btn update-btn"
              onClick={() => this.updateNote(this.handleCloseModal())}
            >
              <i className="fa fa-pencil"></i>
              update
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddNote;
