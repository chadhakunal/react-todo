import React from "react";
import TodoItem from "./todoItem";
import PropTypes from 'prop-types';

import "assets/styles/todoSection.css";

const TodoSection = (props) => {
  const propsWithoutItems = {...props}
  delete propsWithoutItems["items"];
  return (
    <div className="container-fluid">
      <div className="row mb-3 mt-3">
        <big className="headers">{props.name}</big>
      </div>
      <div className="container bordered-box pt-4" style={{ height: "60vh", overflowY: "scroll" }}>
        {props.items.map((data, index) => {
          return ( <TodoItem key={index} {...data} {...propsWithoutItems} index={index} /> )
        })}
      </div>
    </div>
  )
}

TodoSection.propTypes = {
  type: PropTypes.oneOf(['todo', 'completed']).isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onMove: PropTypes.func,
  onEdit: PropTypes.func
};


export default TodoSection
