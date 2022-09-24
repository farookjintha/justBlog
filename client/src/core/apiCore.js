import {API} from '../config';
import queryString from 'query-string';

export const getBlogs = (sortBy) => {
    return fetch(`${API}/blogs?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
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

export const getFilteredBlogs = (skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    }

    return fetch(`${API}/blogs/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            return res.json()
        })
        .catch(error => console.log(error));
}

export const list = (params) => {
    const query = queryString.stringify(params)
    console.log(query);
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const read = (blogId) => {
    return fetch(`${API}/blog/${blogId}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const getGenre = (genreId) => {
    return fetch(`${API}/genre/${genreId}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}

export const listRelated = (blogId) => {
    return fetch(`${API}/blogs/related/${blogId}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(error => console.log(error));
}