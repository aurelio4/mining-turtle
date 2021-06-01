-- MAKE YOUR OWN NAME VERSION

-- args = {...}

-- function setName()
--     name = args[1]

--     os.setComputerLabel(name)
-- end

-- setName()

-- GET A RANDOM NAME VERSION

names = { "Åke Hall", "Joséphine Bouette", "Simplifiés Klement", "Eléa Robet", "Noëlla Heymes", "Yóu McKernon", "Anaëlle Dowdle", "Maëline Simper", "Illustrée Belasco", "Pål Benoey", "Loïc Gritskov", "Annotée Knok", "Björn Vernon", "Réservés Elintune", "Stéphanie Beecraft", "Akmal Nurmatov" }
nameIndex = math.random(1, 16)
turtleName = names[nameIndex]

function setName()
    os.setComputerLabel(turtleName)
    string.gsub("The turtles new name is {name}", "{name}", turtleName)
end

setName()