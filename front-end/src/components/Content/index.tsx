import React from "react";
import "./Content.css";

import TaskCard from "../TaskCard";

const Content = () => {
  return (
    <div className="content">
      <header>
        <div className="content__user" />
        <span>Logout</span>
      </header>
      <h2 className="content__welcome-msg">Hey Fred,</h2>
      <div className="content__tasks">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </div>
  );
};

export default Content;
