import React from "react";
import TodoItem from "components/TodoItem";
import PropTypes from 'prop-types';

import "assets/styles/todoSection.css";

const TodoSection = ({ name, items, ...remainingProps }) => {
  return (
    <div className="container-fluid">
      <div className="row mb-3 mt-3">
        <big className="headers">{name}</big>
      </div>
      <div className="container bordered-box pt-4" style={{ height: "60vh", overflowY: "scroll" }}>
        {items.map((data, index) => {
          return ( <TodoItem key={data.timestamp} {...data} {...remainingProps} index={index} /> )
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
