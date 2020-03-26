/**
 * Collection of starting games;
 * ===== SCHEMA =====
    const Game = mongoose.model('Game', new mongoose.Schema({
        gameName: 
        gamPictures: 
        publisher: 
        developer: 
        introductionText: 
        releaseDate: 
        genre:
        thumbUp:
        thumbDown: 
    }));
   ==================
 */

const bleedingEdge = {
    gameName: "Bleeding Edge",
    gamePictures: [
        
    ],
    publisher: "Ninja Theory",
    developer: "Ninja Theory",
    introductionText: "Grab your team and tear it up in Bleeding Edge, an electrifying online brawler where every fighter comes mechanically enhanced for mayhem!",
    releaseDate: "2020, 3, 24",
    genre: "action",
    thumbUp: 0,
    thumbDown: 0
}

const halfLifeAlyx = {
    gameName: "Half-Life: Alyx",
    gamePictures: [
        
    ],
    publisher: "Valve",
    developer: "Valve",
    introductionText: "Half-Life: Alyx is Valve’s VR return to the Half-Life series. It’s the story of an impossible fight against a vicious alien race known as the Combine, set between the events of Half-Life and Half-Life 2. Playing as Alyx Vance, you are humanity’s only chance for survival.",
    releaseDate: "2020, 3, 23",
    genre: "shooting",
    thumbUp: 0,
    thumbDown: 0
}

const doomEternal = {
    gameName: "DOOM Eternal",
    gamePictures:[

    ],
    publisher: "Bethesda Softworks",
    developer: "id Software",
    introductionText: "Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you.",
    releaseDate: "2020, 3, 20",
    genre: "action",
    thumbUp: 0,
    thumbDown: 0
}

const monsterHunderWorld = {
    gameName: "MONSTER HUNTER: WORLD",
    gamePictures: [

    ],
    publisher: "CAPCOM Co., Ltd.",
    developer: "CAPCOM Co., Ltd.",
    introductionText: "Welcome to a new world! In Monster Hunter: World, the latest installment in the series, you can enjoy the ultimate hunting experience, using everything at your disposal to hunt monsters in a new world teeming with surprises and excitement.",
    releaseDate: "2018, 8, 9",
    genre: "action",
    thumbUp: 0,
    thumbDown: 0
}

const oriAndTheWillOfTheWisps = {
    gamaName: "Ori and the Will of the Wisps",
    gamePictures: [

    ],
    publisher: "Xbox Game Studios",
    developer: "Moon Studios GmbH",
    introductionText: "Play the critically acclaimed masterpiece. Embark on a new journey in a vast, exotic world where you’ll encounter towering enemies and challenging puzzles on your quest to unravel Ori’s destiny.",
    releaseDate: "2020, 3, 11",
    genre: "action",
    thumbUp: 0,
    thumbDown: 0
}

const theWitcher3WildHunt = {
    gamaName: "The Witcher 3: Wild Hunt",
    gamePictures: [

    ],
    publisher: "CD PROJEKT RED",
    developer: "CD PROJEKT RED",
    introductionText: "As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.",
    releaseDate: "2015, 5, 18",
    genre: "RPG",
    thumbUp: 0,
    thumbDown: 0
}

const theElderScrollsVSkyrimSpecialEdition = {
    gameName: "The Elder Scrolls V: Skyrim Special Edition",
    gamePictures: [

    ],
    publisher: "Bethesda Softworks",
    developer: "Bethesda Game Studios",
    introductionText: "Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic fantasy to life in stunning detail. The Special Edition includes the critically acclaimed game and add-ons with all-new features like remastered art and effects, volumetric god rays, dynamic depth of field, screen-space...",
    releaseDate: "2016, 10, 27",
    genre: "RPG",
    thumbUp: 0,
    thumbDown: 0
}


const assasinsCreedOdyssey = {
    gameName: "Assasin's Creed Odyssey",
    gamePictures: [

    ],
    publisher: "Ubisoft",
    developer: "Ubisoft",
    introductionText: "Choose your fate in Assassin's Creed® Odyssey. From outcast to living legend, embark on an odyssey to uncover the secrets of your past and change the fate of Ancient Greece.",
    releaseDate: "2018, 10, 5",
    genre: "RPG", 
    thumbDown: 0,
    thumbUp: 0
}

const darkSouls3 = {
    gameName: "DARK SOULS III",
    gamePictures: [

    ],
    developer: "FromSoft, Inc",
    publisher: "FromSoft, Inc",
    introductionText: "Dark Souls continues to push the boundaries with the latest, ambitious chapter in the critically-acclaimed and genre-defining series. Prepare yourself and Embrace The Darkness!",
    releaseDate: "2016, 4, 11",
    genre: "RPG",
    thumbDown: 0,
    thumbUp: 0
}

const boarderlands3 = {
    gameName: "Boarderland 3",
    gamePictures: [

    ],
    developer: "Gearbox Software",
    publisher: "2K",
    introductionText: "The original shooter-looter returns, packing bazillions of guns and a mayhem-fueled adventure! Blast through new worlds & enemies and save your home from the most ruthless cult leaders in the galaxy.",
    releaseDate: "2020, 3, 13",
    genre: "action",
    thumbDown: 0,
    thumbUp: 0
}

const wolcenLordsOfMayhem = {
    gameName: "Wolcen: Lords of Mayhem",
    gamePictures: [

    ],
    developer: "WOLCEN Studio",
    publisher: "WOLCEN Studio",
    introductionText: "A dynamic hack’n’slash with no class restrictions. Choose your path as you level-up and play your character the way you want! Explore this shattered and corrupted world to uncover its ancient secrets and hidden truths.",
    releaseDate: "2020, 2, 13",
    genre: "RPG",
    thumbUp: 0,
    thumbDown: 0
}

const grandTheftAuto = {
    gameName: "Grand Theft Auto V",
    gamePictures: [

    ],
    developer: "Rockstar North",
    publisher: "Rockstar Games",
    introductionText: "Grand Theft Auto V for PC offers players the option to explore the award-winning world of Los Santos and Blaine County in resolutions of up to 4k and beyond, as well as the chance to experience the game running at 60 frames per second.",
    releaseDate: "2015, 4, 14",
    genre: "adventure",
    thumbDown: 0,
    thumbUp: 0
}

const brightMemory = {
    gameName = "Bright Memory",
    gamePictures: [

    ],
    publisher: "FYQD-Studio; PLAYISM",
    developer: "FYQD-Studio",
    introductionText: "Bright Memory is a lightning-fast fusion of the FPS and action genres, created by one-man development studio FYQD using Unreal Engine. Combine a wide variety of skills and abilities to unleash dazzling combo attacks.",
    releaseDate: "2020, 3, 25",
    genre: "adventure",
    thumbDown: 0,
    thumbUp: 0
}

const totalLockdown = {
    gameName = "Total Lockdown",
    gamePictures: [

    ],
    publisher: "OVALIS INVESTMENTS LIMITED",
    developer: "Panzar Studio",
    introductionText: "Total Lockdown is a battle royale on the top floors of a giant skyscraper. In this action shooter, the goal is to survive using any available weapons, gadgets, and tricks. Fight for fortune and fame in a battle to the death!",
    releaseDate: "2020, 3, 25",
    genre: "adventure",
    thumbDown: 0,
    thumbUp: 0
}

const tombRaider = {
    gameName: "Tomb Raider",
    gamePictures: [

    ],
    publisher: "Square Enix",
    developer: "Crystal Dynamics",
    introductionText: "Tomb Raider explores the intense origin story of Lara Croft and her ascent from a young woman to a hardened survivor.",
    releaseDate: "2013, 3, 5",
    genre: "adventure",
    thumbUp: 0,
    thumbDown: 0
}

const slimeRancher = {
    gameName: "Slime Rancher",
    gamePictures: [

    ],
    publisher: "Monomi Park",
    developer: "Monomo Park",
    introductionText: "Slime Rancher is the tale of Beatrix LeBeau, a plucky, young rancher who sets out for a life a thousand light years away from Earth on the ‘Far, Far Range’ where she tries her hand at making a living wrangling slimes.",
    releaseDate: "TODO: ",
    genre: "adventure",
    thumbDown: 0,
    thumbUp: 0
}

const blackMasa = {
    gameName: "Black Masa",
    gamePictures: [

    ],
    developer: "Crowbar Collective",
    publisher: "Crowbar Collective",
    introductionText: "Relive Half-Life in this fan-made re-imagining. ",
    releaseDate: "2020, 3, 6",
    genre: "shooting",
    thumbUp: 0,
    thumbDown: 0
}

const counterStrikeGlobalOffensive = {
    gameName: "Counter-Strike: Global Offensive",
    gamePictures: [

    ],
    developer: "Valve",
    publisher: "Valve",
    introductionText: " Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.). ",
    releaseDate: "2012, 8, 21",
    genre: "shooting",
    thumbUp: 0,
    thumbDown: 0
}

const tomClancysRainbowSixSiege = {
    gameName: "Tom Clancy's Rainbow Six Siege",
    gamePictures: [

    ],
    developer: "Ubisoft Montreal",
    publisher: "Ubisoft",
    introductionText: "Tom Clancy's Rainbow Six Siege is the latest installment of the acclaimed first-person shooter franchise developed by the renowned Ubisoft Montreal studio.",
    releaseDate: "2015, 12, 1",
    genre: "shooting",
    thumbUp: 0, 
    thumbDown: 0
}

const metroExodus = {
    gameName: "Metro Exodus",
    gamePictures: [

    ],
    developer: "4A Games",
    publisher: "Deep Silver",
    introductionText: "lee the shattered ruins of the Moscow Metro and embark on an epic, continent-spanning journey across the post-apocalyptic Russian wilderness. Explore vast, non-linear levels, lose yourself in an immersive, sandbox survival experience, and follow a thrilling story-line that spans an entire year in the...",
    releaseDate: "2019, 2, 14",
    genre: "shooting",
    thumbDown: 0,
    thumbUp: 0
},

const battleBlockTheatre = {
    gameName: "BattleBlock Theater",
    gamePictures: [

    ],
    developer: "The Behemoth",
    publisher: "The Behemoth",
    introductionText: "Welcome to BattleBlock Theater! You’ve got no where to go but up...on stage. Play single player or co-op to free your friends and save Hatty Hattington! Jump, solve and battle your way through a mysterious theater inhabited by highly technological felines.",
    releaseDate: "2014, 5, 15",
    genre: "casual",
    thumbDown: 0,
    thumbUp: 0
}

const battleRam = {
    gameName: "Battle Ram",
    gamePictures: [

    ],
    developer: "Wloop777",
    publisher: "khukhrovr",
    introductionText: "Battle Ram is a fun arcade game about A fighting RAM that fights robots.",
    releaseDate: "2020, 3, 21",
    genre: "casual",
    thumbDown: 0,
    thumbUp: 0
}

const stardewValley = {
    gameName: "Stardew Valley",
    gamePictures: [

    ],
    developer: "ConcernedApe",
    publisher: "ConcernedApe",
    introductionText: "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life. Can you learn to live off the land and turn these overgrown fields into a thriving home?",
    releaseDate: "2016, 2, 26",
    genre: "casual",
    thumbDown: 0,
    thumbUp: 0
}

const drawful2 = {
    gameName: "Drawful 2",
    gamePictures: [

    ],
    developer: "Jackbox Games, Inc.",
    publisher: "Jackbox Games, Inc.",
    introductionText: "For 3-8 players and an audience of thousands! Your phones or tablets are your controllers! The game of terrible drawings and hilariously wrong answers.",
    releaseDate: "2016, 6, 21",
    genre: "casual",
    thumbDown: 0,
    thumbUp: 0
}

const overcooked2 = {
    gameName: "Overcooked! 2",
    gamePictures: [

    ],
    publisher: "Team 17 Deigital Ltd",
    developer: "Ghost Town Games Ltd.",
    introductionText: "Overcooked returns with a brand-new helping of chaotic cooking action! Journey back to the Onion Kingdom and assemble your team of chefs in classic couch co-op or online play for up to four players. Hold onto your aprons… it’s time to save the world again! ",
    releaseDate: "2018, 8, 7",
    genre: "casual",
    thumbUp: 0,
    thumbDown: 0
}

const citiesSkylines = {
    gameName: "Cities: Skylines",
    gamePictures: [

    ],
    publisher: "Paradox Interactive",
    developer: "Colossal Order Ltd.",
    introductionText: "Cities: Skylines is a modern take on the classic city simulation. The game introduces new game play elements to realize the thrill and hardships of creating and maintaining a real city whilst expanding on some well-established tropes of the city building experience.",
    releaseDate: "2015, 3, 10",
    genre: "casual",
    thumbDown: 0,
    thumbUp: 0
}



const allGames = [
    bleedingEdge,
    halfLifeAlyx,
    doomEternal,
    monsterHunderWorld,
    oriAndTheWillOfTheWisps,
    theWitcher3WildHunt,
    theElderScrollsVSkyrimSpecialEdition,
    assasinsCreedOdyssey,
    darkSouls3,
    boarderlands3,
    wolcenLordsOfMayhem,
    grandTheftAuto,
    brightMemory,
    totalLockdown,
    tombRaider,
    slimeRancher,
    blackMasa,
    counterStrikeGlobalOffensive,
    tomClancysRainbowSixSiege,
    metroExodus,
    battleRam,
    stardewValley,
    drawful2,
    overcooked2,
    citiesSkylines
]

module.exports = { allGames };
