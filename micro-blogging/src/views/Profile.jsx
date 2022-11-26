import "./Profile.css";
import { useState } from "react";

function InputUserName(props) {
  return (
    <div>
      <div className="prof-title">Profile</div>
      <div className="user-name">User Name</div>
      <textarea className="user-name-area" onChange={props.onChange}></textarea>
    </div>
  );
}

function SaveProfileButton(props) {
  return (
    <div>
      <button className="save-prof-button" onClick={props.onClick}>
        Save
      </button>
    </div>
  );
}

function Profile() {
  const [userName, setUserName] = useState("");
  const handleChangeText = (event) => {
    setUserName(event.target.value);
  };
  const saveUserOnClick = () => {
    if (userName === "") {
      return;
    } else localStorage.setItem("userName", userName);
  };
  return (
    <div className="Profile">
      <InputUserName onChange={handleChangeText} />
      <SaveProfileButton onClick={saveUserOnClick} />
    </div>
  );
}

export default Profile;
