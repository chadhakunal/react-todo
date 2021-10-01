import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ClearIcon from '@mui/icons-material/Clear';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import "assets/styles/todoItem.css";

const TodoItem = (props) => {
  const [editing, setEditing] = React.useState(false);

  const handleDelete = () => {
    props.onDelete(props.index, props.type);
  }

  const handleMove = () => {
    props.moveItem(props.index, props.type);
  }

  const toggleEditing = () => {
    setEditing(!editing)
  }

  const handleEdit = (event) => {
    event.preventDefault();
    props.onEdit(props.index, props.type, event.target[0].value, event.target[1].value);
    setEditing(false);
  }

  return (
    <div className="row align-items-center mt-1">
      <div className="col-1">
        {props.type === "completed" ?
          <Button id="move-button" onClick={handleMove} className="icon-button"><ClearIcon fontSize="medium" /></Button> :
          <Button id="move-button" onClick={handleMove} className="icon-button"><DoneOutlineIcon fontSize="14px" /></Button>
        }
      </div>
      <div className="col-11">
        <Accordion className="box">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "rgba(255, 255, 255, 0.5)" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="title">{props.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row">
              <Typography className="description">
                {props.description}
              </Typography>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <Button id="delete-button" className="icon-button" onClick={handleDelete}><DeleteIcon fontSize="10px" /></Button>
                <Button id="edit-button" className="icon-button" onClick={toggleEditing}><EditIcon fontSize="10px" /></Button>
              </div>
            </div>
            <div id="edit-form-div" className="row p-4" style={{ display: editing ? "block" : "none" }}>
              <Form id="edit-form" onSubmit={handleEdit}>
                <FormGroup className="mb-2">
                  <Label for="title-edit">Title</Label>
                  <Input type="text" name="title" id="title-edit" />
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label for="description-edit">Description</Label>
                  <Input type="textarea" name="description" id="description-edit" />
                </FormGroup>
                <Button type="submit" id="edit-form-submit" className="w-100">Save</Button>
              </Form>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['todo', 'completed']).isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
  onEdit: PropTypes.func
};

export default TodoItem;
