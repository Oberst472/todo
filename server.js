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

app.get('/api/allTodo', (req, res) => {
    let filePath = path.join(__dirname, './src/mocks/', 'items.json')

    async function readFile(path) {
        try {
            const data = await fs.promises.readFile(path, 'utf8')
            res.status(200).json({message: 'Все элементы получены', data: JSON.parse(data), isSuccess: true})
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Список не поучен', isSuccess: false})
        }
    }

    readFile(filePath)
})

app.post('/api/create', async (req, res) => {
    let filePath = path.join(__dirname, './src/mocks/', 'items.json')
    const readFile = async path => {
        try {
            return await fs.promises.readFile(path, 'utf8')
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Новый список не добавлен', isSuccess: false})
        }
    }
    const writeFile = async (path, items) => {
        try {
            await fs.promises.writeFile(path, JSON.stringify(items))
            res.status(201).json({message: 'Новый список добавлен', isSuccess: true})
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Новый список не добавлен', isSuccess: false})
        }
    }
    const items = await readFile(filePath)
    const itemsIson = JSON.parse(items)
    itemsIson.push(req.body)
    await writeFile(filePath, itemsIson)
})

// eslint-disable-next-line no-unused-vars
app.delete('/api/delete/:id', async (req, res) => {
    console.log(req)

    let filePath = path.join(__dirname, './src/mocks/', 'items.json')
    const readFile = async path => {
        try {
            return await fs.promises.readFile(path, 'utf8')
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Новый список не удален', isSuccess: false})
        }
    }
    const writeFile = async (path, items) => {
        try {
            await fs.promises.writeFile(path, JSON.stringify(items))
            res.status(201).json({message: 'Новый список удален', isSuccess: true})
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Новый список не удален', isSuccess: false})
        }
    }
    const items = await readFile(filePath)
    const itemsIson = JSON.parse(items)
    let del = itemsIson.filter(item => item.id !== req.params.id)
    await writeFile(filePath, del)
})


app.use(express.static('dist'))
app.use(history())
app.listen(process.env.PORT || 3000, () => {
    console.log('сервер запущен')
})
