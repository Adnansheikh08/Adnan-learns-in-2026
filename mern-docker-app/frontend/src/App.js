import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
   fetch("http://localhost:5000")
      .then(res => res.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MERN Docker App Re accha ulti topi wale re babu bhole bhale </h1>
      <p>{message}</p>
    </div>
  );
}

export default App;