import axios from "axios";

const api = axios.create({
    baseURL: `https://eventure-backend-api.onrender.com/api`,
  });

export const fetchEvents = () => {
    return api.get("/events")
    .then(({data}) => {
        return data
    })
}