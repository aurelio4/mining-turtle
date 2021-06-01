os.loadAPI("dkjson")
local ws, err = http.websocket("ws://68.132.33.193:5757")

if err then
    print(err)
elseif ws then
    while true do
        term.clear()
        term.setCursorPos(1, 1)
        print("     :)\n")
        print("Chelk OS v0.1\n")
        print("The New Turtle Experience\n")

        local hasBlock, data = turtle.inspectDown()
        if hasBlock == true then
            ws.send(json.encode(data))
        else
            ws.send("no block under turtle!")
        end
        
        local message = ws.receive()

        if message == nil then
            break
        end

        local obj = json.decode(message)

        if obj.type == 'eval' then
            local func = loadstring(obj['function'])
            local res = func()
            ws.send(json.encode({ data = result }))
        end
    end
    
    if ws then
        ws.close()
    end
end