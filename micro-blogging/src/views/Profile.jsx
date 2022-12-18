import "./Profile.css";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react";
import { AppContext } from "../App";
function Login(props) {
  return (
    <div>
      <button type="submit" className="login-button" onClick={props.onClick}>
        Login With Google
      </button>
    </div>
  );
}

function Profile() {
  const { setIsLogged, setName, setEmail, setProfilePic } =
    useContext(AppContext);
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setName(result.user.displayName);
        setEmail(result.user.email);
        setProfilePic(result.user.photoURL);
        setIsLogged(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="Profile">
      <Login onClick={signInWithGoogle} />
    </div>
  );
}

export default Profile;
