import { JsonDB } from 'node-json-db'
import { EventEmitter } from 'events'

import Turtle from './Turtle'

class World extends EventEmitter {
    db: JsonDB
    
    constructor() {
        super()
        this.db = new JsonDB('world.json')
        if (!this.db.exists('/world')) this.db.push('/world', {})
        this.emit('update', this.getAllBlocks())
    }

    updateTurtle(turtle: Turtle, x: Number, y: Number, z: Number, d: Number) {
        this.db.push(`/turtle/${turtle.id}`, [x, y, z, d])
    }

    getTurtle(turtle: Turtle) {
        let path = `/turtle/${turtle.id}`
        if (this.db.exists(path)) return this.db.getData(path)
        else return [0, 0, 0, 0]
    }

    updateBlocks(x: Number, y: Number, z: Number, block: any) {
        let path = `/world/${x},${y},${z}`
        if (block === 'No block to inspect') {
            if (this.db.exists(path)) {
                this.db.delete(path)
                this.emit('update', this.getAllBlocks())
            }
        }
        this.db.push(path, block)
        this.emit('update', this.getAllBlocks())
    }

    getBlock(x: Number, y: Number, z: Number): any {
		return this.db.getData(`/world/${x},${y},${z}`)
	}

    getAllBlocks(): { [index: string]: any } {
        return this.db.getData('/world')
    }
}

export default World