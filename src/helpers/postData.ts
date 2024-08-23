import axios from "axios";

export const postData = async <T, R>(url: string, data: T): Promise<R> =>{
    try{
        const response = await axios.post<R>(url, data);
        return response.data;
    } catch(error) {
        console.log(error);
        throw error;
    }
};