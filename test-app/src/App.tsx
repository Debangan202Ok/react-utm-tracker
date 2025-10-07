import { useState } from "react";
import { useUTM, deleteUTMCookie } from "react-utm-tracker";
import "./App.css";

function App() {
  const utm = useUTM();
  const [message, setMessage] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h2>UTM Test Demo</h2>
      <pre>{JSON.stringify(utm, null, 2)}</pre>
      <button
        onClick={() => {
          deleteUTMCookie();
          setMessage("UTM cookies cleared!");
        }}
      >
        Clear Cookies
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
