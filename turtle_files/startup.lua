-- function websocketLoop()
--     os.loadAPI("json")
--     local ws, err = http.websocket("ws://68.132.33.193:5757")

--     if err then
--         print(err)
--     elseif ws then
--         while true do
--             term.clear()
--             term.setCursorPos(1,1)
--             print("     :)\n")
--             print("Chelk OS v0.1")
--             local message = ws.receive()

--             if message == nil then
--                 break
--             end

--             local obj = json.decode(message)

--             if obj.type == 'eval' then
--                 local func = loadstring(obj['function'])
--                 local result = func()
--                 ws.send(json.encode({data=result}))
--             end
--         end
        
--         if ws then
--             ws.close()
--         end
--     end
-- end

-- while true do
--     local status, res = pcall(websocketLoop)
--     term.clear()
--     term.setCursorPos(1,1)
--     if res == 'Terminated' then
--         os.sleep(1)
--         break
--     end
--     print("I'm currently offline. Please don't break me :)")
-- end

os.loadAPI("json")
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