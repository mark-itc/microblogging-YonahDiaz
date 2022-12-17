import "./Home.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

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

function Home() {
  const [user, setUser] = useState("");
  const [tweets, setTweets] = useState([]);
  const usersCollectionRef = collection(db, "user");
  const tweetCollectionRef = collection(db, "tweet");
  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUser(data.docs.map((doc) => ({ ...doc.data() })));
  };
  const getTweet = async () => {
    const data = await getDocs(tweetCollectionRef);
    setTweets(data.docs.map((doc) => ({ ...doc.data() })));
  };
  useEffect(() => {
    getUsers();
    getTweet();
  }, []);

  const { text, setText, isPending, setIsPending } = useContext(AppContext);

  useEffect(() => {
    getTweet();
  }, []);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const createTweet = async () => {
    if (user === "" || text === "") {
      return;
    } else {
      setIsPending(true);
      await addDoc(tweetCollectionRef, {
        name: user[0].name,
        content: text,
        date: String(new Date().toISOString()),
      });
      setIsPending(false);
      getTweet();
    }
  };

  const addTweetOnClick = () => {
    if (text.length > 140 || isPending === true || text.length < 1) {
      return;
    } else createTweet();
    setText("");
  };

  return (
    <div className="Home">
      <div className="text-and-button-container">
        <WriteATweet onChange={handleChangeText} />
        <Button onClick={addTweetOnClick} />
        <Error140 />
      </div>
      <div className="tweets-list-container">
        <Loading />
        <Tweets tweet={tweets} />
      </div>
    </div>
  );
}

export default Home;
