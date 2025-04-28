import axios from "axios";

const api = axios.create({
    baseURL: `https://eventure-backend-api.onrender.com/api`,
  });

export const fetchEvents = (params) => {
    const queries = []
    for (const key in params) {
        queries.push(`${key}=${params[key]}`)
    }
    const finalQuery = `?${queries.join("&")}`
    return api.get(`/events${queries.length > 0 ? finalQuery : ""}`)
    .then(({data}) => {
        return data
    })
}

export const fetchEventById = (id) => {
    return api.get(`/events/event/${id}`)
    .then(({data: {event}}) => {
        return event
    })
}

export const fetchUserByUsername = (username) => {
    return api.get(`/users/${username}`)
    .then(({data: {user}}) => {
        return user
    })
}
