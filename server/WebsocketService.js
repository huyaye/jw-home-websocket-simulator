const { WebSocket, OPEN } = require("ws");
const {
  getControlResponsePayload,
  getChangeStatePayloadByApp,
} = require("./ProtocolService");

const sessionRegistry = {};

exports.establishSession = (serial) => {
  console.log("establish : " + serial);
  const session = new WebSocket(
    "ws://localhost:9090/websocket/connect?serial=" + serial
  );
  session.onopen = (event) => {
    console.log(`WebSocket open : ${serial}`);
    sessionRegistry[serial] = session;
  };
  session.onerror = (error) => {
    console.log(`WebSocket error: ${error}`);
  };
  session.onclose = (event) => {
    console.log(`WebSocket close: ${serial}`);
    delete sessionRegistry[serial];
  };
  /*
   * (ex)
   * {"type":"control","data":{"transactionId":"8813a4d7-acf6-4bfd-8848-ec0d8b655f0c",
   * "serial":"01280002","command":"action.devices.commands.OnOff","params":{"on":false}}}
   */
  session.onmessage = ({ data }) => {
    console.log(data);
    const request = JSON.parse(data);
    switch (request.type) {
      case "control":
        // Echo succeeed
        const resPayload = getControlResponsePayload(request.data);
        console.log(resPayload);
        session.send(JSON.stringify(resPayload));
        const stateChangePayload = getChangeStatePayloadByApp(request.data);
        console.log(stateChangePayload);
        session.send(JSON.stringify(stateChangePayload));
        break;
      default:
        console.error("Received unknown message type : " + request.type);
    }
  };
};

exports.closeSession = (serial) => {
  let session = sessionRegistry[serial];
  session && session.close();
};

exports.validSession = (serial) => {
  let session = sessionRegistry[serial];
  return session != undefined && session.readyState === OPEN;
};

exports.sendMessage = (serial, message) => {
  let session = sessionRegistry[serial];
  console.log(serial);
  console.log(JSON.stringify(message));
  session && session.send(JSON.stringify(message));
};
