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
      {props.tweets
        .slice(0)
        .reverse()
        .map((element, index) => (
          <div key={index} className="tweets-container">
            <div className="name-date">
              <div>{element[0]}</div>
              <div>{element[1]}</div>
            </div>
            <div className="tweet-content">{element[2]}</div>
          </div>
        ))}
    </div>
  );
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
  const [tweets, setTweets] = useState(() => {
    return JSON.parse(localStorage.getItem("saved-tweets")) || [];
  });

  const handleChangeText = (event) => {
    setText(event.target.value);
  };
  const addTweetOnClick = () => {
    if (text.length > 140) {
      return;
    } else {
      setTweets((tweetsArray) => [
        ...tweetsArray,
        [["Name"], [new Date().toLocaleString()], [text]],
      ]);
    }
  };
  useEffect(() => {
    if (tweets !== null)
      localStorage.setItem("saved-tweets", JSON.stringify(tweets));
  }, [tweets]);
  return (
    <div className="App">
      <div className="text-and-button-container">
        <WriteATweet onChange={handleChangeText} />
        <Button onClick={addTweetOnClick} />
        <Error140 text={text} />
      </div>
      <div className="tweets-list-container">
        <Tweets tweets={tweets} />
      </div>
    </div>
  );
}

export default App;
