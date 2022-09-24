const {
  validSession,
  establishSession,
  closeSession,
  sendMessage,
} = require("./WebsocketService");
const { getTraits } = require("./ProtocolService");

const Device = require("./model/DeviceModel");

exports.getAllDevices = async () => {
  const allDevices = await Device.findAll();
  const devices = [];
  for (let device of allDevices) {
    devices.push({
      type: device.type,
      name: device.name,
      serial: device.serial,
      connected: validSession(device.serial),
    });
  }
  console.log(devices);
  return devices;
};

exports.setConnection = (serial, connected) => {
  closeSession(serial);
  if (connected) {
    establishSession(serial);
  }
};

exports.addDevice = (device) => {
  this.setConnection(device.serial, true);
  setTimeout(
    () =>
      sendMessage(device.serial, {
        type: "register",
        data: {
          userId: device.userId,
          homeId: device.homeId,
          connection: "websocket",
          serial: device.serial,
          type: device.type,
          name: device.name,
          online: true,
          traits: getTraits(device.traits),
        },
      }),
    2000 // delay 2 seconds waiting connection
  );
};
