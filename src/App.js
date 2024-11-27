import "./App.css";
import { useContext, useEffect, useState } from "react";
import HistoryContainer from "./components/HistoryContainer";
import { HistoryContext } from "./context/HistoryContext";

function App() {
  const [currentNum, setCurrentNum] = useState(1); // Start from 1
  const [fact, setFact] = useState("Loading...");
  const { dispatch: historyDispatch } = useContext(HistoryContext);
  const [showHistory, setShowHistory] = useState(false);

  // Function to fetch the number fact
  const fetchNumberFact = (num) => {
    // Fetch data from Numbers API using the current number
    fetch(`http://numbersapi.com/${num}`)
      .then((response) => response.text()) // API returns a text response
      .then((data) => {
        if (
          data.split(" ")[0] === fact.split(" ")[0] ||
          fact.split(" ")[0] === "Loading..."
        ) {
          setFact(data); // Update state with the fetched data
          historyDispatch({
            type: "ADD_HISTORY",
            payload: data,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setFact("Failed to load data");
      });
  };

  useEffect(() => {
    // Fetch initial data on component mount

    fetchNumberFact(currentNum);
    // Set interval to fetch new data every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentNum((prevNum) => {
        const newNum = prevNum + 2;
        fetchNumberFact(newNum); // Fetch new fact when number changes
        return newNum;
      });
    }, 5000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run this effect only once when the component mounts

  const handleShowHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <div>
      <button
        type="button"
        style={{ float: "right", marginRight: "20px" }}
        onClick={handleShowHistory}
      >
        {!showHistory ? "Show History" : "Hide History"}
      </button>
      {showHistory && <HistoryContainer />}
      <h1>Random Number Fact</h1>

      <p>Number: {currentNum}</p>
      <p>{fact}</p>
    </div>
  );
}

export default App;
