import customFetch from './fetch'

const baseUrl = 'http://localhost:3000/api'

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const apiAllTodo = async function() {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('get', `${baseUrl}/allTodo/`, null)])
    return data
}

export const apiCreateTodo = async function(info) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('post', `${baseUrl}/create/`, info)])
    return data
}

export const apiEditTodo = async function(info) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('patch', `${baseUrl}/${info.id}`, info)])
    return data
}

export const apiDeleteTodo = async function(id) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('delete', `${baseUrl}/${id}`, null)])
    return data
}

export const stApiGetTodoById = async function(id) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('get', `${baseUrl}/${id}`, null)])
    return data
}
