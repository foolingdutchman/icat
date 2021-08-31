export const getCurrentTimeStamp = () => {
  const timestamp = Date.parse(new Date());
  return timestamp;
};

export const timeStamp2Time = (timestamp) => {
  var date = new Date(parseInt(timestamp) + 8 * 3600 * 1000); // 增加8小时
  return date.toJSON().substr(0, 10).replace("T", " ");
};

export const isEmpty = (obj) => {
  if (typeof obj == "undefined" || obj == null || obj == "") {
    return true;
  } else {
    return false;
  }
};
export const getRandom = () => {
  return Math.round(Math.random());
};
