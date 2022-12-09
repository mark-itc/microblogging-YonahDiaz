import "./Profile.css";
import { useContext } from "react";
import { AppContext } from "../App";

function InputUserName(props) {
  const { newUserName } = useContext(AppContext);
  return (
    <div>
      <div className="prof-title">Profile</div>
      <div className="user-name">User Name</div>
      <input
        className="user-name-input"
        onChange={props.onChange}
        value={newUserName}
      ></input>
    </div>
  );
}

function SaveProfileButton(props) {
  return (
    <div>
      <button
        type="submit"
        className="save-prof-button"
        onClick={props.onClick}
      >
        Save
      </button>
    </div>
  );
}

function Profile() {
  const { newUserName, setNewUserName } = useContext(AppContext);

  const handleChangeText = (event) => {
    setNewUserName(event.target.value);
  };
  const saveUserOnClick = () => {
    if (newUserName === "") {
      return;
    } else localStorage.setItem("userName", newUserName);
    setNewUserName("");
  };
  return (
    <div className="Profile">
      <InputUserName onChange={handleChangeText} />
      <SaveProfileButton onClick={saveUserOnClick} />
    </div>
  );
}

export default Profile;
