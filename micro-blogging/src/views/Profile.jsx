import "./Profile.css";
import { useContext } from "react";
import { AppContext } from "../App";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

function InputUserName(props) {
  const { newUserName } = useContext(AppContext);
  return (
    <div>
      <div className="prof-title">Login</div>
      <div className="user-name">User Name</div>
      <input
        className="user-name-input"
        onChange={props.onChange}
        value={newUserName}
      ></input>
    </div>
  );
}
function InputUserMail(props) {
  return (
    <div>
      <div className="user-name">Mail</div>
      <input
        className="user-name-input"
        onChange={props.onChange}
        value={props.newUserMail}
      ></input>
    </div>
  );
}
function InputUserPass(props) {
  return (
    <div>
      <div className="user-name">Password</div>
      <input
        className="user-name-input"
        onChange={props.onChange}
        value={props.newUserPass}
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
        Save Profile
      </button>
    </div>
  );
}

function Login(props) {
  return (
    <div>
      <button type="submit" className="login-button" onClick={props.onClick}>
        Login
      </button>
    </div>
  );
}

function Profile() {
  const { newUserName, setNewUserName } = useContext(AppContext);
  const { newUserMail, setNewUserMail } = useState("");
  const { newUserPass, setNewUserPass } = useState("");
  const userRef = collection(db, "user");

  const handleChangeTextName = (event) => {
    setNewUserName(event.target.value);
  };
  const handleChangeTextMail = (event) => {
    setNewUserMail(event.target.value);
  };
  const handleChangeTextPass = (event) => {
    setNewUserPass(event.target.value);
  };

  const handleChangesMailNamePass = (event) => {
    handleChangeTextName();
    handleChangeTextMail();
    handleChangeTextPass();
  };

  const createUser = async () => {
    if (newUserName === "") {
      return;
    } else {
      await addDoc(userRef, { name: newUserName });
    }
    setNewUserName("");
    setNewUserMail("");
    setNewUserPass("");
  };

  return (
    <div className="Profile">
      <InputUserName onChange={handleChangesMailNamePass} />
      <br></br>
      <InputUserMail newUserMail={newUserMail} />
      <br></br>
      <InputUserPass newUserPass={newUserPass} />
      <SaveProfileButton onClick={createUser} />
      <Login />
    </div>
  );
}

export default Profile;
