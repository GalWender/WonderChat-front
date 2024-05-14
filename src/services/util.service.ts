
const getDateAsString = (date: Date) => {
    return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${date.getFullYear().toLocaleString().match(/\d{2}$/)}`
}

const getTimeAsString = (date: Date) => {
    let hours = date.getHours()
    let minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'

    hours = hours % 12
    hours = hours ? hours : 12 

    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`

    return `${hoursStr}:${minutesStr} ${ampm}`
}


function makeId(length = 36) {
    let txt = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export const utilService = {
    getDateAsString,
    makeId,
    getTimeAsString
}



