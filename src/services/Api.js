import axios from "axios";

const makeRequestCreator = () => {
  let call;
  return async url => {
    if (call) {
      call.cancel("Only One request allowed at a time.");
    }
    call = axios.CancelToken.source();
    return await axios.get(url, {
      cancelToken: call.token
    });
  };
};

const normalRequest = () => {
  return axios.create({});
};

const apiGet = makeRequestCreator();

export { apiGet, normalRequest };
