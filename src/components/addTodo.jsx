import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';

import "assets/styles/addTodo.css";

const AddTodo = (props) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [showDescription, setShowDescription] = React.useState(false);

  const handleTitleChange = event => {
    setTitle(event.target.value);
    setShowDescription(Boolean(event.target.value));
  }

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  }

  const addTodo = () => {
    if (title) {
      setTitle("");
      setDescription("");
      setShowDescription(false);
      props.onAdd({
        title, description, timestamp: Date.now()
      });
    }
  }

  return (
    <div className="row w-100 pl-5 pr-5 pt-3 pb-3 justify-content-center">
      <InputGroup className="mt-2 ml-2 w-100 mb-3">
        <Input id="title-input" placeholder="What would you like to do today?" onChange={handleTitleChange} value={title} />
        <InputGroupAddon addonType="append"><Button id="add" onClick={addTodo} className="add-button pl-4 pr-4">Add</Button></InputGroupAddon>
      </InputGroup>
      <Input id="description-input" type="textarea" style={{ display: `${showDescription ? "block" : "none"}` }} placeholder="Description (optional)" className="description-input" onChange={handleDescriptionChange} value={description} />
    </div>
  )
}

export default AddTodo
