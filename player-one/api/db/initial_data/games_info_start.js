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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/bleeding_edge5_qbwkra.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/bleeding_edge4_wk6lpj.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/bleeding_edge3_whvbkf.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/bleeding_edge2_atvpxo.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/bleeding_edge1_bneqny.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/half_life_alyx5_eegnsb.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/half_life_alyx4_u36frv.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/half_life_alyx3_u25swn.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/half_life_alyx2_rjpji8.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/half_life_alyx1_e6zu5d.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/doom_eternal5_mibhar.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/doom_eternal4_oy66xf.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/doom_eternal3_mmz5io.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/doom_eternal2_wivlzl.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/doom_eternal1_nbeija.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/monster_hunter_world5_aqo8it.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/monster_hunter_world4_aa7cjg.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/monster_hunter_world3_t0rsvr.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/monster_hunter_world2_jdcpkc.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/monster_hunter_world1_hoaqra.jpg"
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
    gameName: "Ori and the Will of the Wisps",
    gamePictures: [
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/ori_and_the_will_of_the_wisps5_zers2n.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/ori_and_the_will_of_the_wisps4_k4mx5e.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/ori_and_the_will_of_the_wisps3_mcqnop.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/ori_and_the_will_of_the_wisps2_soa2ea.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/ori_and_the_will_of_the_wisps1_zbf8c8.jpg"
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
    gameName: "The Witcher 3: Wild Hunt",
    gamePictures: [
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585150054/Games/TheWitcher3WildHunt/image3_fnnu0i.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585150054/Games/TheWitcher3WildHunt/image2_oq5whx.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585150054/Games/TheWitcher3WildHunt/image0_fhrqhn.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585150054/Games/TheWitcher3WildHunt/image1_ljtc3e.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585150054/Games/TheWitcher3WildHunt/background_ux1v3m.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191981/Games/the_elder_scrolls_v_skyrim_special_edition5_datvs5.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/the_elder_scrolls_v_skyrim_special_edition3_ij4c3q.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/the_elder_scrolls_v_skyrim_special_edition4_jsndhr.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/the_elder_scrolls_v_skyrim_special_edition2_q6cam4.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/the_elder_scrolls_v_skyrim_special_edition1_ut5rja.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585249752/Games/assasins_creed_odyssey1_xhoucr.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585249752/Games/assasins_creed_odyssey3_r4gigw.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585249752/Games/assasins_creed_odyssey5_vdkdzk.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585249752/Games/assasins_creed_odyssey4_h5vyn3.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585249752/Games/assasins_creed_odyssey2_awjlew.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/dark_souls3_5_pp5yob.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/dark_souls3_4_go4tmx.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/dark_souls3_3_yotyns.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/dark_souls3_2_lfh2sr.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/dark_souls3_1_jz64m5.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/boardland3_5_lmv7cb.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/boardland3_4_lwhi5j.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/boardland3_3_jsii54.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/boardland3_2_mrr8uw.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/boardland3_1_z4lypd.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/wolcen_lords_of_mayhem5_vj3sdi.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/wolcen_lords_of_mayhem4_ndxqd3.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/wolcen_lords_of_mayhem3_lv0mkm.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/wolcen_lords_of_mayhem2_qpe7ss.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/wolcen_lords_of_mayhem1_u1gx80.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/grand_theft_auto5_5_otbxcy.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/grand_theft_auto5_4_pp63ko.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/grand_theft_auto5_3_vyjmnj.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/grand_theft_auto5_2_udtztg.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/grand_theft_auto5_1_bxwosf.jpg"
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
    gameName: "Bright Memory",
    gamePictures: [
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/bright_memory5_byilkr.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/bright_memory4_jveosk.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/bright_memory3_bloqe9.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/bright_memory2_e1cgup.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/bright_memory1_e4wtdy.jpg"
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
    gameName: "Total Lockdown",
    gamePictures: [
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/total_lockdown5_nxgdc0.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/total_lockdown4_vmki8h.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/total_lockdown3_esclw4.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/total_lockdown2_bc1snt.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/total_lockdown1_oqhasd.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/tomb_raider5_fnuxfw.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/tomb_raider4_sw73yw.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/tomb_raider3_llj3n3.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/tomb_raider2_vgffpn.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191983/Games/tomb_raider1_xjijs4.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/slime_rancher5_ta5tf6.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/slime_rancher4_dktbed.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/slime_rancher3_gl9egw.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/slime_rancher2_fi3yjx.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/slime_rancher1_fdtyjy.jpg"
    ],
    publisher: "Monomi Park",
    developer: "Monomo Park",
    introductionText: "Slime Rancher is the tale of Beatrix LeBeau, a plucky, young rancher who sets out for a life a thousand light years away from Earth on the ‘Far, Far Range’ where she tries her hand at making a living wrangling slimes.",
    releaseDate: "2017, 8, 1",
    genre: "adventure",
    thumbDown: 0,
    thumbUp: 0
}

const blackMasa = {
    gameName: "Black Masa",
    gamePictures: [
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/black_mesa5_o7yequ.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/black_mesa4_cazlzq.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/black_mesa3_oiqksm.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/black_mesa2_p6s6rv.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/black_mesa1_oofsyc.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/counter_strike__global_offensive5_ytxt6z.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/counter_strike__global_offensive4_qzbu4c.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/counter_strike__global_offensive3_klyalz.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/counter_strike__global_offensive2_bw1wg3.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/counter_strike__global_offensive1_qej9nl.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191982/Games/tom_clancys_rainbow_six_siege5_kcfpdr.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191982/Games/tom_clancys_rainbow_six_siege4_refnnx.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191982/Games/tom_clancys_rainbow_six_siege3_gtpahp.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191982/Games/tom_clancys_rainbow_six_siege2_qcz6g3.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191982/Games/tom_clancys_rainbow_six_siege1_okkpk1.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/metro_exodus5_kf1ytz.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191976/Games/metro_exodus4_fuyeqo.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/metro_exodus3_wgq9am.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/metro_exodus2_pguyep.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191975/Games/metro_exodus1_ou7j2k.jpg"
    ],
    developer: "4A Games",
    publisher: "Deep Silver",
    introductionText: "lee the shattered ruins of the Moscow Metro and embark on an epic, continent-spanning journey across the post-apocalyptic Russian wilderness. Explore vast, non-linear levels, lose yourself in an immersive, sandbox survival experience, and follow a thrilling story-line that spans an entire year in the...",
    releaseDate: "2019, 2, 14",
    genre: "shooting",
    thumbDown: 0,
    thumbUp: 0
}

const battleBlockTheatre = {
    gameName: "BattleBlock Theater",
    gamePictures: [
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/battleBlockTheater5_joxrsb.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/battleBlockTheater4_vy6uqm.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/battleBlockTheater3_skdw53.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/battleBlockTheater2_sz86ty.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/battleBlockTheater1_dmoodl.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191972/Games/battle_ram5_yqsgsw.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191971/Games/battle_ram4_gdpiuk.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191971/Games/battle_ram3_yqcygv.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191971/Games/battle_ram2_pnxh91.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191971/Games/battle_ram1_gjrjkb.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/stardew_valley5_tf1pcj.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/stardew_valley4_zzy4ad.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/stardew_valley3_a2sch4.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/stardew_valley2_gjoyjo.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191980/Games/stardew_valley1_ilmqyt.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/drawful2_5_hl8ipc.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/drawful2_4_o89ya1.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/drawful2_3_fqnse0.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/drawful2_2_xhdfk0.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191974/Games/drawful2_1_jgmrfx.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/overcooked5_n8wybr.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/overcooked4_tv6xuy.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/overcooked3_tinmgz.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/overcooked2_exssof.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191979/Games/overcooked1_wxv6el.jpg"
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
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines5_ihohqj.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines4_eyxbyu.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines3_w4pyi8.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines2_mpg0bu.jpg",
        "https://res.cloudinary.com/dzld6bb6y/image/upload/v1585191973/Games/cities_skylines1_vjkvvh.jpg"
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
    battleBlockTheatre,
    citiesSkylines
]

module.exports = { allGames };
