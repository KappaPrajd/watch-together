const users = [];
const globalURL = [];

function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);

  return user;
}

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

function getRoomUrl(room) {
  const result = globalURL.filter(roomId => roomId.room === room);
  
  if (result.length > 0 ){
    return result[0];
  }

  return result
}

function changeRoomUrl(room, url, title) {
  const index = globalURL.findIndex((url) => url.room === room);

  if (index === -1) {
    globalURL.push({ room, url, title });
  } else {
    globalURL[index] = { room, url, title };
  }

  return globalURL[0];
}

module.exports = {
  userJoin,
  userLeave,
  getRoomUsers,
  getRoomUrl,
  changeRoomUrl,
};
