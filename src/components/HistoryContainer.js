import { useContext } from "react";
import { HistoryContext } from "../context/HistoryContext";

const HistoryContainer = () => {
  const { state: historyState } = useContext(HistoryContext);
  return (
    <div
      style={{
        float: "right",
        marginRight: "20px",
        width: "200px",
        maxHeight: "90vh",
        overflow: "scroll",
      }}
    >
      {historyState.map((his) => {
        return <p style={{ border: "1px solid black" }} key={his}>{his}</p>;
      })}
    </div>
  );
};

export default HistoryContainer;
