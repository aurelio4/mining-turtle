import { randomBytes } from 'crypto'
import EventEmitter from 'events'
import WebSocket from 'ws'

import World from './World'

interface Slot {
    count: Number
    name: String
}

const nonces = new Set()
const getNonce = (): String => {
    let nonce = ''

	while (nonce === '' || nonces.has(nonce)) {
		nonce = randomBytes(4).toString('hex')
	}

	nonces.add(nonce)
	return nonce
}

class Turtle extends EventEmitter {
    
    id: number = 0
    label: String = ''
    inventory: Slot[] = []
    selectedSlot: Number = 0
    ws: WebSocket
    world: World
    x: Number = 0
    y: Number = 0
    z: Number = 0
    d: Number = 0
    fuel: Number = 0
    maxFuel: Number = 0
    mining: Boolean = false

    constructor(ws: WebSocket, world: World) {
        super()
        this.world = world
        this.ws = ws
    }

    toJSON = () => {
        return {
            label: this.label,
            inventory: this.inventory,
            selectedSlot: this.selectedSlot,
            x: this.x,
            y: this.y,
            z: this.z,
            d: this.d,
            fuel: this.fuel,
            maxFuel: this.maxFuel,
            id: this.id,
            mining: this.mining
        }
    }

    execute = (command: String) => {
        return new Promise(r => {
            const nonce = getNonce()
    
            this.ws.send(JSON.stringify({ type: 'eval', function: `return ${command}`, nonce }))
    
            const listener = (resp: any) => {
                try {
                    let res = JSON.parse(resp)
                    if (res.nonce === nonce) {
                        r(res.data)
                        this.ws.off('message', listener)
                    }
                } catch (err) {
                    console.error(err)
                }
            }
    
            this.ws.on('message', listener)
        })
    }

    async forward() {
        let r = await this.execute('turtle.forward()')
        if (r) {
            console.log(r)
        }
        return r
    }

    async back() {
        await this.execute('turtle.back()')
    }

    async getFuel() {
        await this.execute('turtle.getFuelLeve()')
    }
}

export default Turtle