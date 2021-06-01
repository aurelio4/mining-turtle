import { Server } from 'ws'

import Turtle from './Turtle'
import World from './World'

const wss = new Server({ port: 5757 })

let turtles: { [id: number]: Turtle } = {}
const world = new World()

wss.on('connection', async function connection(ws) {
    console.log('> Client connected!')
    let turtle = new Turtle(ws, world)
    turtle.on('init', async () => {
        turtles[turtle.id] = turtle
        console.log('>> Turtle Added')
    })
    ws.on('close', async () => {
        delete turtles[turtle.id]
        console.log('> Client closed')
    })
})