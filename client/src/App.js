import React, { useEffect, useState } from "react";
import AddNewDevice from "./components/AddNewDevice";
import Device from "./components/Device";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    fetch("/api/devices")
      .then((res) => res.json())
      .then((res) => setDevices(res))
      .then(setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <h1 align="center">Loading...</h1>
      ) : (
        <div>
          <h2 align="center">Websocket Simulator</h2>
          {devices.map((device) => (
            <Device device={device} />
          ))}
          <AddNewDevice />
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
