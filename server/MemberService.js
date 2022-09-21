const Member = require("./model/MemberModel");
const Home = require("./model/HomeModel");

exports.getHomes = async (userId) => {
  const member = await Member.findMember(userId);
  if (member == null) {
    return { exist: false };
  }
  let homes = [];
  for (home of member.homes) {
    if (home.state !== "shared") {
      continue;
    }
    const targetHome = await Home.findHome(home.homeId);
    homes.push({
      id: home.homeId,
      name: targetHome.homeName,
    });
  }
  return {
    exist: true,
    homes: homes,
  };
};
