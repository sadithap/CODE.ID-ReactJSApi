import axios from "axios";
import config from "../config/config";

const list = async () => {
  try {
    const result = await axios.get(`${config.domain}/regions`);
    return result.data;
  } catch (error) {
    return await error.message;
  }
};

const deleted = async (id) => {
  try {
    const result = await axios.delete(`${config.domain}/regions/${id}`);
    return result;
  } catch (error) {
    return await error.message;
  }
};

const create = async(payload) => {
    try {
        const result = await axios.post(`${config.domain}/regions`,payload)
        return result
    } catch (error) {
        return await error.message;
    }
}

const upload = async(payload) => {
  console.log(payload.get("file"))
  console.log(payload.get("name"))
  try {
    const result = await axios.post(`${config.domain}/regions/upload`,payload)
    return result
  } catch (error) {
    return await error.message
  }
}

const update = async(payload) => {
  const id=payload.get("id");
  console.log(id)
  console.log(payload.get("file"))
  console.log(payload.get("name"))
  try {
    const result = await axios.put(`${config.domain}/regions/${id}`,payload,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    const result1 = await axios.get(`${config.domain}/regions/${id}`);
    return result1
  } catch (error) {
    return await error.message;
  }
}

export default { list, deleted, create, upload, update };
