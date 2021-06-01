args = {...}

function moveDirection()
    directionToMove = args[1]
    blocksToMove = args[2]

    if not blocksToMove then
        if directionToMove == "forward" then
            turtle.forward()
        elseif directionToMove == "back" then
            turtle.back()
        elseif directionToMove == "left" then
            turtle.turnLeft()
        elseif directionToMove == "right" then
            turtle.turnRight()
        else
            error("Not a valid direction to move!")
        end
    else
        if directionToMove == "forward" then
            for i = 1, blocksToMove do
                turtle.forward()
            end
        elseif directionToMove == "back" then
            for i = 1, blocksToMove do
                turtle.back()
            end
        elseif directionToMove == "left" then
            for i = 1, blocksToMove do
                turtle.turnLeft()
            end
        elseif directionToMove == "right" then
            for i = 1, blocksToMove do
                turtle.turnRight()
            end
        else
            error("Not a valid direction to move!")
        end
    end
end

moveDirection()