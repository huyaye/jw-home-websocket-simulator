exports.getControlResponsePayload = (data) => {
  return {
    type: "controlResult",
    data: {
      transactionId: data.transactionId,
      status: "SUCCESS",
      states: makeResponseStates(data),
    },
  };
};

exports.getChangeStatePayloadByApp = (data) => {
  return {
    type: "changeState",
    data: {
      trigger: "APP",
      states: makeResponseStates(data),
    },
  };
};

exports.getTraits = (traitTypes) => {
  const traits = [];
  for (const type of traitTypes) {
    traits.push(getTrait(type));
  }
  return traits;
};

const getTrait = (type) => {
  let trait = {
    type: type,
  };
  switch (type) {
    case "action.devices.traits.OnOff":
      trait.state = {
        on: false,
      };
      break;
    case "action.devices.traits.Brightness":
      trait.state = {
        brightness: 0,
      };
      break;
    case "action.devices.traits.ColorSetting":
      trait.state = {
        color: {
          temperatureK: 2000,
        },
      };
      trait.attr = {
        colorTemperatureRange: {
          temperatureMinK: 2000,
          temperatureMaxK: 6500,
        },
      };
      break;
    default:
      console.log("Not supported trait type : " + type);
  }
  return trait;
};

const makeResponseStates = (data) => {
  if (data.command == "action.devices.commands.ColorAbsolute") {
    return {
      color: { temperatureK: data.params.color.temperature },
    };
  }
  return data.params;
};
