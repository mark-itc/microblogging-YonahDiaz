import "./Home.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
function WriteATweet(props) {
  return (
    <div>
      <textarea
        className="text-input"
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

function Tweets() {
  const { tweets } = useContext(AppContext);
  return (
    <div>
      {tweets.map((element, index) => (
        <div key={index} className="tweets-container">
          <div className="name-date">
            <div>{element.userName}</div>
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
  const { text, setText, setTweets, isPending, setIsPending, tweets } =
    useContext(AppContext);
  const [userName] = useState(() => localStorage.getItem("userName"));
  async function fetchTweets() {
    try {
      const response = await fetch(
        "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet"
      );
      const results = await response.json();
      setTweets(results.tweets);
    } catch (err) {
      throw err;
    }
  }

  const setLocalTweet = () => {
    const localTweet = {
      content: text,
      userName: userName,
      date: String(new Date().toISOString()),
    };
    tweets.unshift(localTweet);
  };

  useEffect(() => {
    fetchTweets();
    setInterval(() => {
      fetchTweets();
    }, 10000);
  }, []);

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const sendTweet = () => {
    setLocalTweet();
    setIsPending(true);
    const tweetToSend = {
      content: text,
      userName: userName,
      date: String(new Date().toISOString()),
    };

    fetch(
      "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tweetToSend),
      }
    )
      .then(() => {
        setIsPending(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const addTweetOnClick = () => {
    if (text.length > 140 || isPending === true || text.length < 1) {
      return;
    } else sendTweet();
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
        <Tweets />
      </div>
    </div>
  );
}

export default Home;
