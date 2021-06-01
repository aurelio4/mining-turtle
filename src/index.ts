import { Server } from 'ws'
import { App, launch } from 'carlo';
import { resolve } from 'path'

import Turtle from './Turtle'
import World from './World'

const wss = new Server({ port: 5757 })

let app: App
let turtles: { [id: number]: Turtle } = {}
const world = new World();

(async () => {
    app = await launch()
    app.on('exit', () => process.exit())
    app.serveFolder(resolve(process.cwd()), "frontend/src")

    await app.load('http://localhost:3000')
    world.on('update', async (world) => {
        await app.evaluate(`if (window.setWorld) window.setWorld(${JSON.stringify(world)})`)
    })
});

function serializeTurtles() {
	return JSON.stringify(Object.values(turtles))
}

wss.on('connection', async function connection(ws) {
    console.log('> Client connected!')
    let turtle = new Turtle(ws, world)

    turtle.on('init', async () => {
        turtles[turtle.id] = turtle
        turtle.on('update', () => app.evaluate(`if (window.setTurtles) window.setTurtles(${serializeTurtles()})`))
        await app.evaluate(`if (window.setTurtles) window.setTurtles(${serializeTurtles()})`)
        await app.evaluate(`if (window.setWorld) window.setWorld(${JSON.stringify(world.getAllBlocks())})`)
    })

    ws.on('message', (data: any) => {
        const blockData = JSON.parse(data)
        console.log(blockData.name)
    })

    console.log(turtles)

    ws.on('close', async () => {
        delete turtles[turtle.id]
        await app.evaluate(`if (window.setTurtles) window.setTurtles(${serializeTurtles()})`)
        console.log('> Client closed')
    })
})