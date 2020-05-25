import React from "react";
import "./NavItem.css";

interface NavItemProps {
  color: string;
  icon?: any;
  label: string;
  notifications?: number;
  selected?: boolean;
}

const NavItem = ({
  color,
  icon,
  label,
  notifications,
  selected = false,
}: NavItemProps) => {
  const getNotifications = () =>
    notifications && notifications > 99 ? "99+" : notifications;

  return (
    <div className={`nav-item ${selected && "nav-item--selected"}`}>
      <div className="nav-item__label">
        <div className="nav-item__icon" style={{ background: color }}>
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {notifications && (
        <div className="nav-item__notification">
          <span>{getNotifications()}</span>
        </div>
      )}
    </div>
  );
};

export default NavItem;
