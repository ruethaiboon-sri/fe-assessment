import React, { useState, useEffect, useContext } from "react";
import "./Card.css";
import ReactSwitch from "react-switch";
import { FocusContext } from "../App";

const Card = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [enability, setEnability] = useState("enabled");
  const [editedUser, setEditedUser] = useState({ ...user });

  const { onCardClick } = useContext(FocusContext);

  const toggleEnability = () => {
    setEnability((curr) => (curr === "disabled" ? "enabled" : "disabled"));
    if (isEditing === true) {
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    if (enability === "enabled") {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleSubmitClick = () => {
    if (enability === "enabled") {
      if (
        editedUser.name !== "" &&
        editedUser.email.includes("@") === true &&
        editedUser.phone.length >= 10
      ) {
        localStorage.setItem(
          `editedUser_${user.id}`,
          JSON.stringify(editedUser)
        );
        setIsEditing(false);
      } else {
        alert(
          "Please check your input. Name cannot be empty, email must includes '@', and phone must contains 10 or more numbers."
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const editedUserData = JSON.parse(
      localStorage.getItem(`editedUser_${user.id}`)
    );
    if (editedUserData) {
      setEditedUser(editedUserData);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="cards">
      <div className="card-container" id={enability}>
        <div className="back-cover">
          <div className="card-header">
            {isEditing ? (
              <i
                className="save-icon fa-regular fa-circle-check"
                onClick={handleSubmitClick}
              ></i>
            ) : (
              <i
                className="edit-icon fa-regular fa-pen-to-square"
                onClick={handleClick}
              ></i>
            )}
            <div className="react-switch">
              <ReactSwitch
                onChange={toggleEnability}
                checked={enability === "enabled"}
              />
            </div>
          </div>
          <div className="photo-container" onClick={() => onCardClick(user)}>
            <img
              src={user.photoUrl}
              alt={user.name}
              style={
                enability === "disabled" ? { opacity: "0.3" } : { opacity: "1" }
              }
            />
          </div>
          <div className="info-container">
            <span className="card-name">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                />
              ) : (
                editedUser.name
              )}
            </span>
            <span className="card-email">
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                />
              ) : (
                editedUser.email
              )}
            </span>
            <span className="card-phone">
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleChange}
                />
              ) : (
                editedUser.phone
              )}
            </span>
            <span className="card-company">{user.company.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
