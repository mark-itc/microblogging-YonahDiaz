import "./Home.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import {
  query,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

function Profile() {
  const { name, email, profilePic } = useContext(AppContext);
  return (
    <div className="profile-container">
      <img className="profile-pic" alt="" src={profilePic} />
      <br></br>
      <div>User Name: {name}</div>
      <br></br>
      <div>Email: {email}</div>
    </div>
  );
}

function WriteATweet(props) {
  const { text } = useContext(AppContext);
  return (
    <div>
      <textarea
        className="text-input"
        value={text}
        placeholder="What you have in mind..."
        onChange={props.onChange}
      ></textarea>
    </div>
  );
}

function Button(props) {
  return (
    <div>
      <button className="tweet-button" onClick={props.onClick}>
        Tweet
      </button>
    </div>
  );
}

function Tweets(props) {
  return (
    <div>
      {props.tweet.map((element, index) => (
        <div key={index} className="tweets-container">
          <div className="name-date">
            <div>{element.name}</div>
            <div>{element.date}</div>
          </div>
          <div className="tweet-content">{element.content}</div>
        </div>
      ))}
    </div>
  );
}

function Loading() {
  const { isPending } = useContext(AppContext);
  if (isPending === true) {
    return (
      <div>
        <div className="loader"></div>
      </div>
    );
  }
}

function Error140() {
  const { text } = useContext(AppContext);
  if (text.length > 140) {
    return (
      <div className="error-140">
        <div>The tweet can't contain more then 140 chars.</div>
      </div>
    );
  }
}

function BotonNext(props) {
  return (
    <div>
      <button className="boton-next" onClick={props.onClick}>
        Next
      </button>
    </div>
  );
}

function Home() {
  const [stopNext, setStopNext] = useState(false);
  let [latestDoc, setLatestDoc] = useState(10);
  const [tweets, setTweets] = useState([]);
  const { text, setText, isPending, setIsPending, name } =
    useContext(AppContext);
  const tweetCollectionRef = collection(db, "tweet");
  const qRef = query(
    tweetCollectionRef,
    orderBy("date", "desc"),

    limit(latestDoc)
  );
  const getTweet = async () => {
    onSnapshot(qRef, (snapshot) => {
      setTweets(snapshot.docs.map((doc) => ({ ...doc.data() })));
      setLatestDoc((latestDoc += 10));
      if (snapshot.empty) {
        setStopNext(true);
      }
      console.log(snapshot.docs);
      console.log(stopNext);
    });
  };
  useEffect(() => {
    getTweet();
  }, []);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const createTweet = async () => {
    if (name === "" || text === "") {
      return;
    } else {
      setIsPending(true);
      await addDoc(tweetCollectionRef, {
        name: name,
        content: text,
        date: String(new Date().toISOString()),
      });
      setIsPending(false);
    }
  };

  const addTweetOnClick = () => {
    if (text.length > 140 || isPending === true || text.length < 1) {
      return;
    } else createTweet();
    setText("");
  };

  const next = () => {
    if (stopNext === true) {
      return;
    } else {
      getTweet();
    }
  };

  return (
    <div className="Home">
      <Profile />
      <div className="text-and-button-container">
        <WriteATweet onChange={handleChangeText} />
        <Button onClick={addTweetOnClick} />
        <Error140 />
      </div>
      <div className="tweets-list-container">
        <Loading />
        <Tweets tweet={tweets} />
        <BotonNext onClick={next} />
      </div>
    </div>
  );
}

export default Home;
