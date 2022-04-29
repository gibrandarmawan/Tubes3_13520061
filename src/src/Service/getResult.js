import axios from "../Axios";

const getResult = async (data) => {
    const result = await axios.post(`result`, data );
    return result;
    }
export default getResult;