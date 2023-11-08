// import JsFileDownloader from 'js-file-downloader';
// import Resizer from "react-image-file-resizer";
// import { toast } from 'react-toastify';
// import { errorMsg } from './../interfaces/react-toastify';

const getStringFromDate = (date: Date) => {
    return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${date.getFullYear().toLocaleString().match(/\d{2}$/)}`
}

const getPhoneNumberOnly = (phone: string, code: string) => {
    if (phone.includes(code)) return phone.substring(code.length)
    else return phone
}

const sortToPages = (items: Array<any>) => {
    return items.reduce((result, item, index) => {
        const groupIndex = Math.floor(index / 5);
        if (!result[groupIndex]) {
            result[groupIndex] = [];
        }
        result[groupIndex].push(item);
        return result;
    }, []);
}

// async function resizeProfilePicture(file: File): Promise<File | string | undefined> {
//     return new Promise((resolve, reject) => {
//         Resizer.imageFileResizer(
//             file,
//             300, // maximum width
//             300, // maximum height
//             "JPEG",
//             80, // quality (optional)
//             0, // rotation (optional)
//             (uri: any) => {
//                 if (uri) {
//                     // Convert Blob to File
//                     const resizedFile = new File([uri], file.name, {
//                         type: "image/jpeg",
//                         lastModified: Date.now(),
//                     });
//                     resolve(resizedFile);
//                 } else {
//                     reject(new Error("Failed to resize image"));
//                 }
//             },
//             "file",
//             undefined,
//             undefined
//         );
//     })
// }

// function downloadFiles(files: Array<string>) {
//     const success: Array<boolean> = []
//     files.forEach(async (file: string, idx: number) => {

//         const fileName: string = `POC(${idx + 1}).` + file.split('.').pop() || '';
//         try {
//             await new JsFileDownloader({
//                 url: file.toString(),
//                 filename: fileName,
//             })
//             success.push(true)
//         }
//         catch {
//             success.push(false)
//             if ((success.length === 2) && success.every((bool: Boolean) => bool === false)) {
//                 toast("No files to download", errorMsg)
//             }
//         }
//     });
// }

function getFileExtension(filename: string): string {
    const lastDotIndex = filename.lastIndexOf('.');
    return lastDotIndex === -1 ? '' : filename.slice(lastDotIndex);
}


function makeId(length = 36) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

function workingHttpsUrl(url: string) {
    if (url.includes('https://')) return url
    return 'https://' + url
}

function checkFavorite(businessId: string, businessesIdsList: string[]) {
    const res = businessesIdsList.findIndex(item => item === businessId)
    return (res === -1) ? false : true
}

function extractFavoritesFromIds(idsList: string[], businessList: any[]) {
    const favoritesList = idsList.reduce((acc: any, curr: string) => {
        const favoriteBusiness = businessList.find(business => business._id === curr)
        if (favoriteBusiness !== undefined) acc.push(favoriteBusiness)
        return acc
    }, [])

    return favoritesList
}

function getUserJoinDate(date: number) {
    const monthsNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    const year = new Date(date).getFullYear()
    const month = monthsNames[new Date(date).getMonth()]
    return `${month} ${year}`
}

function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}.${month}.${year}`;
}

function getMonthName(): string {
    const months: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentMonthIndex: number = new Date().getMonth();
    return months[currentMonthIndex];
}

export const utilService = {
    getStringFromDate,
    getPhoneNumberOnly,
    sortToPages,
    // resizeProfilePicture,
    makeId,
    workingHttpsUrl,
    // downloadFiles,
    getFileExtension,
    checkFavorite,
    extractFavoritesFromIds,
    getUserJoinDate,
    formatDate,
    getMonthName
}



