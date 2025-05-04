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

export const fetchFavourites = (id) => {
    return api.get(`/favourites/${id}`)
    .then(({data: {events}}) => {
        return events
    })
}

export const fetchGoing = (id) => {
    return api.get(`/going/${id}`)
    .then(({data: {events}}) => {
        return events
    })
}

export const fetchMyEvents = (id) => {
    return api.get(`/my-events/${id}`)
    .then(({data: {events}}) => {
        return events
    })
    .catch((err) => {
        console.log(err)
    })
}

export const postNewEvent = (username, eventObj) => {
    return api.post(`/events/${username}`, eventObj)
    .then(({data}) => {
        return data
    })
}

export const patchEvent = (username, eventId, eventObj) => {
    return api.patch(`/events/${username}/event/${eventId}`, eventObj)
    .then(({data}) => {
        return data
    })
}

export const deleteEvent = (username, eventId) => {
    return api.delete(`/events/${username}/event/${eventId}`).then(({data}) => {
        return data
    })
}

export const postNewUser = (userObj) => {
    return api.post("/users", userObj).then(({data}) => {
        return data
    })
}

export const patchUser = (username, userObj) => {
    return api.patch(`/users/${username}`, userObj).then(({data}) => {
        return data
    })
}

export const deleteUser = (username) => {
    return api.delete(`/users/${username}`).then(({data}) => {
        return data
    })
}

export const postNewFave = (userId, faveObj) => {
    return api.post(`/favourites/${userId}`, faveObj).then(({data}) => {
        return data
    })
}

export const deleteNewFave = (userId, faveId) => {
    return api.delete(`/favourites/${userId}/event/${faveId}`).then(({data}) => {
        return data
    })
}

export const postNewGoing = (userId, goingObj) => {
    return api.post(`/going/${userId}`, goingObj).then(({data}) => {
        return data
    })
}

