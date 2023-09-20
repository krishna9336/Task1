import axios from "axios";

export const BASEURL = `http://localhost:5000/api`;

export const addUser = async (userPayload) => {
  console.log("data sending..", userPayload);
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASEURL}/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data: userPayload,
    };

    axios.request(config).then((response) => {
      console.log(JSON.stringify(response?.data));
    });
  } catch (err) {
    console.log("Error: ", err);
  }
};


export const createUser = (userData) => ({
  type: "CREATE_USER",
  payload: userData,
});