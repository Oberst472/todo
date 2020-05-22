const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

const filePath = path.join(__dirname, './src/mocks/', 'items.json')
const readFile = async path => {
    try {
        const response = await fs.promises.readFile(path, 'utf8')
        return JSON.parse(response)
    } catch (e) {
        console.log(e)
        return false
    }
}
const updateFile = async (path, file) => {
    try {
        await fs.promises.writeFile(path, JSON.stringify(file))
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

app.get('/api/allTodo', async (req, res) => {
    console.log('Запрос получен')
    try {
        const response = await readFile(filePath)
        response ?
            res.status(200).json({message: 'Все элементы получены', data: response, isSuccess: true}) :
            res.status(404).json({message: 'Список не поучен', isSuccess: false})
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Список не поучен', isSuccess: false})
    }
})
app.get('/api/:id', async (req, res) => {
    try {
        const id = req.params.id
        const response = await readFile(filePath)
        if (response) {
            const item = response.find(item => item.id === id)
            res.status(200).json({message: 'Todo успешно получен', data: item, isSuccess: true})
        }
        else {
            res.status(404).json({message: 'Todo успешно получен', isSuccess: false})
        }
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Todo успешно получен', isSuccess: false})
    }
})

app.post('/api/create', async (req, res) => {
    try {
        const response = await readFile(filePath)
        if (response) {
            response.push(req.body)
            const updated = await updateFile(filePath, response)
            updated ?
                res.status(201).json({message: 'Todo создан', isSuccess: true}) :
                res.status(404).json({message: 'Todo не создан', isSuccess: false})
        } else {
            res.status(404).json({message: 'Todo не создан', isSuccess: false})
        }
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Todo не создан', isSuccess: false})
    }
})

app.patch('/api/:id', async (req, res) => {
    try {
        const response = await readFile(filePath)
        if (response) {
            const newItem = req.body
            const itemId = response.findIndex(item => item.id === newItem.id)
            response.splice(itemId, 1, newItem)
            const updated = await updateFile(filePath, response)
            updated ?
                res.status(200).json({message: 'Список обновлен', isSuccess: true}) :
                res.status(404).json({message: 'Список не обновлен', isSuccess: false})
        } else {
            res.status(404).json({message: 'Список не обновлен', isSuccess: false})
        }
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Список не обновлен', isSuccess: false})
    }
})
app.delete('/api/:id', async (req, res) => {
    try {
        const response = await readFile(filePath)
        if (response) {
            let updatedFile = response.filter(item => item.id !== req.params.id)
            const updated = await updateFile(filePath, updatedFile)
            updated ?
                res.status(200).json({message: 'Список удален', isSuccess: true}) :
                res.status(404).json({message: 'Список не удален', isSuccess: false})
        }
        else {
            res.status(404).json({message: 'Список не удален', isSuccess: false})
        }
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Список не удален', isSuccess: false})
    }
})


app.use(express.static('dist'))
app.use(history())
app.listen(process.env.PORT || 3000, () => {
    console.log('сервер запущен')
})
