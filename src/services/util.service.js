

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    debounce,
    getAssetSrc,
    randomTrueFalse,
    makeImage,
    getEmptyMsg,
    getEmptyReview,
    makeGroupId,
    makeBoardId,
    makeTaskId,
    timeStampToDate,
    getTimelineRange,
    getTimestampInDays,
    millisecondsToDays,
    calculateTimelineProgress,
    timeFormat,
    makePhoneNumber
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeBoardId(length = 6) {
    var txt = 'b'
    var possible = '0123456789'

    for (var i = 1; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
}

function makeGroupId(length = 6) {
    var txt = 'g'
    var possible = '0123456789'

    for (var i = 1; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function makeTaskId(length = 6) {
    var txt = 't'
    var possible = '0123456789'

    for (var i = 1; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))

    }
    return txt
}

// function readJsonFile(path) {
//     const str = fs.readFileSync(path, 'utf8')
//     const json = JSON.parse(str)
//     return json
// }

// function makeLorem(size = 100) {
//     var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
//     var txt = ''
//     while (size > 0) {
//         size--
//         txt += words[Math.floor(Math.random() * words.length)] + ' '
//     }
//     return txt
// }

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function getAssetSrc(name) {
    const path = `/src/assets/img/${name}`
    const modules = import.meta.globEager('/src/assets/img/*')
    const mod = modules[path]
    return mod.default
}

function timeStampToDate(timeStamp) {
    const timelineToSave = new Date(timeStamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    })
    return timelineToSave
}

function getTimelineRange(timeline) {

    if (!timeline || !timeline.from || !timeline.to) {
        return '-'
    }
    // Used by activity-preview, unlike "getTimelineRange" at timeline-summary.
    const startMonth = timeStampToDate(timeline.from).slice(0, 3)
    const endMonth = timeStampToDate(timeline.to).slice(0, 3)

    const startDay = timeStampToDate(timeline.from).slice(4)
    const endDay = timeStampToDate(timeline.to).slice(4)

    if (startMonth === endMonth) {
        if (startDay === endDay) {
            return `${startMonth} ${startDay}`
        } else {
            return `${startMonth} ${startDay}-${endDay}`
        }
    } else {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
    }
}

function millisecondsToDays(ms) {
    return Math.floor(ms / 86400000) //num of ms in day
}

function calculateTimelineProgress(timeline) {
    if (timeline === null) return
    if (!timeline.from || !timeline.to) return 0

    // Get the current date
    const currentDate = Date.now()

    // Convert the start and end dates to timestamps
    const startTimestamp = timeline.from
    const endTimestamp = timeline.to

    // Check if the current date is after the end date
    if (currentDate >= endTimestamp) {
        // If so, the progress is 100%
        return `100%`
    }

    const totalDuration = endTimestamp - startTimestamp

    // Calculate the elapsed time from the start date to the current date
    const timePassedSinceStart = currentDate - startTimestamp

    // Calculate the progress as a percentage of time passed
    const progress = (timePassedSinceStart / totalDuration) * 100

    // Round the progress to two decimal places and return as a whole number
    const result = Math.round(progress)
    return `${result}%`
}

function getTimestampInDays(Timeline) {
    if (!Timeline || !Timeline.from || !Timeline.to) return
    const estTime = Timeline.to - Timeline.from
    return utilService.millisecondsToDays(estTime) || 1
}

function timeFormat(time) {
    return time < 10 ? '0' + time : time
}

function debounce(fn, wait) {
    let timer
    return function (...args) {
        if (timer) {
            clearTimeout(timer) // clear any pre-existing timer
        }
        const context = this // get the current context
        timer = setTimeout(() => {
            fn.apply(context, args) // call the function if time expires
        }, wait)
    }
}

function makeLorem(size = 1) {
    var words = [
        "Superman", "Batman", "Wonder Woman", "Spider-Man", "Iron Man",
        "Captain America", "Thor", "Hulk", "Black Widow", "Wolverine",
        "The Flash", "Green Lantern", "Aquaman", "Black Panther", "Doctor Strange",
        "Deadpool", "Ant-Man", "Daredevil", "Green Arrow", "The Punisher",
        "Captain Marvel (Shazam)", "Jean Grey", "Cyclops", "Storm", "Nightcrawler",
        "Rogue", "Gambit", "Luke Cage", "Iron Fist", "Jessica Jones",
        "Hawkeye", "Scarlet Witch", "Quicksilver", "Vision", "Hawkman",
        "Hawkgirl", "Martian Manhunter", "The Atom", "Zatanna", "The Spectre",
        "Green Hornet", "The Shadow", "The Phantom", "The Spirit", "The Tick",
        "Spawn", "Hellboy", "Witchblade", "Invincible", "The Rocketeer",
        "The Crow", "The Tick", "Savage Dragon", "The Maxx", "V for Vendetta",
        "Rorschach", "Doctor Manhattan", "Nite Owl", "Silk Spectre", "Ozymandias",
        "Swamp Thing", "Constantine", "Blue Beetle", "Booster Gold", "Plastic Man",
        "The Question", "Red Tornado", "Firestorm", "Martian Manhunter", "Batwoman",
        "Batgirl", "Batwing", "Catwoman", "Huntress", "Oracle", "Supergirl",
        "Superboy", "Power Girl", "Hawkwoman", "Starfire", "Raven", "Cyborg",
        "Beast Boy", "Static Shock", "Blue Beetle", "Atom Smasher", "Sandman",
        "Death", "Dream (Morpheus)", "Lucifer", "Starman", "Jonah Hex",
        "Green Lantern (Alan Scott)", "Green Lantern (Jessica Cruz)", "Blue Devil", "Captain Atom",
        "Doctor Fate", "Etrigan the Demon", "The Creeper", "Plastic Man", "Ragman",
        "The Question (Renee Montoya)", "Black Canary", "Mr. Miracle", "Big Barda", "The Ray",
        "Elongated Man", "Fire", "Ice", "Animal Man"
    ]
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ''
    }
    return txt
}

function makeImage(size = 1) {
    const toyIcons = ["🧸", "🚗", "🎨", "🎆", "🌞", "☔", "⚡", "🎌", "🗼", "🗽", "🛴", "🛵", "🚍", "🚋", "🦼", "🚖", "🚜", "🦽", "🕋", "🚲", "⛑", "🏈", "🎱", "⛳", "💎", "👑", "⚽", "👓", "🏏", "🤿", "🎣", "🏐", "🏀", "🥎", "🏉", "🎲", "🎮", "🎯", /* Add more toy icons here */]
    var icon = ''
    while (size > 0) {
        size--
        icon = toyIcons[Math.floor(Math.random() * toyIcons.length)] + ''
    }
    return icon
}

function makePhoneNumber(length = 8) {
    var txt = ''
    var possible = '0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function randomTrueFalse() {
    return Math.random() < 0.5;

}

function getEmptyMsg() {
    return {
        txt: '',
    }
}

function getEmptyReview() {
    return {
        txt: '',
    }
}