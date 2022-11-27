import "./Profile.css";
import { useContext } from "react";
import { AppContext } from "../App";
function InputUserName(props) {
  return (
    <div>
      <div className="prof-title">Profile</div>
      <div className="user-name">User Name</div>
      <input className="user-name-area" onChange={props.onChange}></input>
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
  const { NewUserName, setNewUserName } = useContext(AppContext);

  const handleChangeText = (event) => {
    setNewUserName(event.target.value);
  };
  const saveUserOnClick = () => {
    if (NewUserName === "") {
      return;
    } else localStorage.setItem("userName", NewUserName);
  };
  return (
    <div className="Profile">
      <InputUserName onChange={handleChangeText} />
      <SaveProfileButton onClick={saveUserOnClick} />
    </div>
  );
}

export default Profile;
