export default async function(method = 'GET', url, body, token = '') {
    try {
        if (method.toUpperCase() === 'GET') {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            })
            const data = await response.json()
            return !response.ok || response.status > 300 || !data['isSuccess'] ? false : data
        } else if (method.toUpperCase() === 'DELETE') {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: token
                }
            })
            const data = await response.json()
            return !response.ok || response.status > 300 || !data['isSuccess'] ? false : data
        } else {
            const response = await fetch(url, {
                method: method.toUpperCase(),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: token
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            return !response.ok || response.status > 300 || !data['isSuccess'] ? false : data
        }
    } catch (e) {
        console.log(e)
        return false
    }
}
