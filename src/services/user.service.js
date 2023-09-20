import axios from "axios";
import { BASEURL } from "./auth.service";

export const getAllUsers = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASEURL}/users/all`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};

export const deleteUserById = async (userId) => {
  try {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASEURL}/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
  }
};

