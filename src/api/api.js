import customFetch from './fetch'

const baseUrl = 'http://localhost:3000/api'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const apiAllTodo = async function() {
    await timeout(2000)
    const [data] = await Promise.all([customFetch('get', `${baseUrl}/allTodo/`, null)])
    return data
}

export const apiCreateTodo = async function(info) {
    await timeout(2000)
    const [data] = await Promise.all([customFetch('post', `${baseUrl}/create/`, info)])
    return data
}

export const apiDeleteTodo = async function(id) {
    await timeout(2000)
    const [data] = await Promise.all([customFetch('delete', `${baseUrl}/delete/${id}`, null)])
    return data
}
