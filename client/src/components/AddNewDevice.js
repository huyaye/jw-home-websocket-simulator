import React, { useRef, useState } from "react";
import { DeviceTypes, TraitTypes } from "../DeviceMeta";
import { toast } from "react-toastify";

const AddNewDevice = () => {
  const userIdRef = useRef();
  const homeIdRef = useRef();
  const serialRef = useRef();
  const typeRef = useRef();
  const nameRef = useRef();
  const selectedTraitRef = useRef();
  const [traits, setTraits] = useState([]);
  const [homes, setHomes] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!checkInputData()) {
      toast.error("Please check input data.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }
    console.log({
      userId: userIdRef.current.value,
      homeId: homeIdRef.current.value,
      serial: serialRef.current.value,
      type: typeRef.current.value,
      name: nameRef.current.value,
      traits: traits,
    });
    fetch("/api/devices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userIdRef.current.value,
        homeId: homeIdRef.current.value,
        serial: serialRef.current.value,
        type: typeRef.current.value,
        name: nameRef.current.value,
        traits: traits,
      }),
    }).then((response) => console.log(response));
  };

  const onConfirmId = () => {
    const userId = userIdRef.current.value;
    if (userId.length <= 0) {
      return;
    }
    fetch("/api/users/" + userId + "/homes")
      .then((res) => res.json())
      .then((res) => {
        if (res.exist) {
          setHomes(res.homes);
        } else {
          setHomes([]);
          toast.error("Not exists ID.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
      });
  };

  const onAddTrait = () => {
    setTraits((prev) => {
      const index = prev.indexOf(selectedTraitRef.current.value);
      if (index >= 0) {
        prev.splice(index, 1);
      } else {
        prev.push(selectedTraitRef.current.value);
      }
      return [...prev]; // deep copy for re-rendering
    });
  };

  const checkInputData = () => {
    return (
      userIdRef.current.value.length > 0 &&
      homeIdRef.current.value.length > 0 &&
      serialRef.current.value.length > 0 &&
      typeRef.current.value.length > 0 &&
      nameRef.current.value.length > 0 &&
      traits.length > 0
    );
  };

  return (
    <>
      <div className="addDevice">
        <h4 className="addDevice_content">Add Device</h4>
        <form onSubmit={onSubmit}>
          <div className="addDevice_content">
            <input type="text" placeholder="user ID" ref={userIdRef} />
            <input type="button" value="Confirm ID" onClick={onConfirmId} />
          </div>
          <div className="addDevice_content">
            <select name="homeId" id="homeId" ref={homeIdRef}>
              {homes.map((home) => (
                <option value={home.id}>{home.name}</option>
              ))}
            </select>
          </div>
          <div className="addDevice_content">
            <select name="type" id="type" ref={typeRef}>
              {DeviceTypes.map((device) => (
                <option value={device.type}>{device.name}</option>
              ))}
            </select>
          </div>
          <div className="addDevice_content">
            <select name="trait" id="trait" ref={selectedTraitRef}>
              {TraitTypes.map((trait) => (
                <option value={trait.type}>{trait.name}</option>
              ))}
            </select>
            <input type="button" value="Add trait" onClick={onAddTrait} />
            <div className="addDevice_content">
              {traits.map((trait) => (
                <div>{trait}</div>
              ))}
            </div>
          </div>
          <div className="addDevice_content">
            <input type="text" placeholder="device serial" ref={serialRef} />
          </div>
          <div className="addDevice_content">
            <input type="text" placeholder="device name" ref={nameRef} />
          </div>
          <div align="right">
            <input type="submit" value="Add device" />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewDevice;
