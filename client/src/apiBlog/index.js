import {API} from '../config';


export const createGenre = (userId, token, genre) => {
    return fetch(`${API}/genre/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(genre)
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error));
}

export const createBlog = (userId, token, blog) => {
    return fetch(`${API}/blog/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error));
}

export const getGenres = () => {
    return fetch(`${API}/genres`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}
