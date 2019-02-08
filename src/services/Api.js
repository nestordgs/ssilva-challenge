import axios from "axios";

const makeRequestCreator = () => {
  let call;
  return url => {
    if (call) {
      call.cancel("Only One request allowed at a time.");
    }
    call = axios.CancelToken.source();
    return axios.get(url, {
      cancelToken: call.token
    });
  };
};

const apiGet = makeRequestCreator();

export { apiGet };
