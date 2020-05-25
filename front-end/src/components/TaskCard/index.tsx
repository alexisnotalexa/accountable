import React from "react";
import "./TaskCard.css";

const TaskCard = () => {
  return (
    <div className="task-card">
      <span className="task-card__group-name">Group Name</span>
      <h3 className="task-card__title">Task Title</h3>
      <p className="task-card__desc">
        I'm baby edison bulb PBR&B hammock knausgaard jean shorts humblebrag
        bicycle rights. Meggings jean shorts tattooed, four dollar toast banh mi
        shoreditch tilde locavore intelligentsia kitsch.
      </p>
    </div>
  );
};

export default TaskCard;
