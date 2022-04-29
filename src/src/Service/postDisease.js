import axios from "../Axios";

const postDisease = async (datas) => {
    const result = await axios.post(`disease`, datas);
    return result;
    }
export default postDisease;