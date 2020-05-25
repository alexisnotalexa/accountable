import React from "react";
import "./Group.css";

interface GroupProps {
  members: number;
}

const Group = ({ members }: GroupProps) => {
  const getMembers = () => {
    switch (members) {
      case 1:
        return (
          <div className="group__user group__user--top">
            <span>ao</span>
          </div>
        );
      case 2:
        return [
          <div className="group__user group__user--mid" />,
          <div className="group__user group__user--top" />,
        ];
      case 3:
        return [
          <div className="group__user group__user--bottom" />,
          <div className="group__user group__user--mid" />,
          <div className="group__user group__user--top" />,
        ];
      default:
        return [
          <div className="group__user group__user--bottom" />,
          <div className="group__user group__user--mid" />,
          <div className="group__user group__user--top" />,
        ];
    }
  };
  return (
    <div className="group">
      <div className="group__members">
        {getMembers()}
        <span>+ 15</span>
      </div>
    </div>
  );
};

export default Group;
