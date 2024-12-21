import axios from "axios"




export const GetAllEmails = async ()=>{
    try {
        const response = await axios.get(`https://flipkart-email-mock.vercel.app/`)
        return response.data;
    } catch (error) {
        return error.message
    }
}


export const GetSingleEmails = async(id) =>{
    try {
        const response = await axios.get(`https://flipkart-email-mock.vercel.app/?id=${id}`)
        return JSON.parse(JSON.stringify(response.data));
    } catch (error) {
        console.log(error.message);
    }
}