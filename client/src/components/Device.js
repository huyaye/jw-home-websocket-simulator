import React, { useState } from "react";

const Device = ({ device }) => {
  const [connected, setConnected] = useState(device.connected);
  const onChangeCheck = (event) => {
    const {
      target: { checked },
    } = event;
    setConnected(checked);

    fetch("/api/devices/connect", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serial: device.serial,
        connected: checked,
      }),
    }).then((response) => console.log(response));
  };

  return (
    <div className="device">
      <input type="checkbox" checked={connected} onChange={onChangeCheck} />
      <div className="device_content">{device.serial}</div>
      <div className="device_content">{device.type}</div>
      <div className="device_content">{device.name}</div>
    </div>
  );
};

export default Device;
