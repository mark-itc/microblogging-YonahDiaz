import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

function WriteATweet(props) {
  return (
    <div>
      <textarea
        className="text-area"
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
      {props.tweets.map((element, index) => (
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
function Loading(props) {
  if (props.isPending === true) {
    return (
      <div>
        <div className="loader"></div>
      </div>
    );
  }
}
function Error140(props) {
  if (props.text.length > 140) {
    return (
      <div className="error-140">
        <div>The tweet can't contain more then 140 chars.</div>
      </div>
    );
  }
}

function App() {
  const [text, setText] = useState("");

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
  const [tweets, setTweets] = useState([]);
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    fetchTweets();
  }, []);
  const handleChangeText = (event) => {
    setText(event.target.value);
  };
  const sendTweet = () => {
    setIsPending(true);
    const tweetToSend = {
      content: text,
      userName: "Yonah",
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
        fetchTweets();
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
    <div className="App">
      <div className="text-and-button-container">
        <WriteATweet onChange={handleChangeText} />
        <Button onClick={addTweetOnClick} />
        <Error140 text={text} />
      </div>
      {
        <div className="tweets-list-container">
          <Loading isPending={isPending} />
          {<Tweets tweets={tweets} />}
        </div>
      }
    </div>
  );
}

export default App;
