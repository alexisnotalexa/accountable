import React from "react";
import { HomeSmile, Smile } from "@styled-icons/boxicons-solid";
import { UserGroup } from "@styled-icons/heroicons-solid";
import Logo from "../Logo";
import NavItem from "../NavItem";
import "./Navigation.css";

const Navigation = () => {
  return (
    <aside>
      <div>
        <div className="navigation__logo">
          <Logo />
        </div>
        <nav>
          <NavItem
            label="Home"
            color="coral"
            icon={<HomeSmile size={18} />}
            selected
          />
          <NavItem
            label="Groups"
            color="skyblue"
            icon={<UserGroup size={18} />}
            notifications={125}
          />
          <NavItem label="Community" color="gold" icon={<Smile size={18} />} />
        </nav>
      </div>
      <div className="invite">
        <div className="invite__circle invite__circle--red" />
        <div className="invite__circle invite__circle--green" />
        <span className="invite__text">Invite a friend!</span>
      </div>
    </aside>
  );
};

export default Navigation;
