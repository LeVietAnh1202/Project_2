import account from "../account/account.js";
import updateDatabase from "../update-database.js";

export default async () => {
    const pathname = window.location.pathname;
    switch (pathname) {
        case '/enterprise':
            console.log('/enterprise');
            break;
        case '/recruit/news':
            console.log('/recruit/news');
            break;
        case '/recruit/student':
            console.log('/recruit/student');
            break;
        case '/internship/assignment':
            // console.log('/internship/assignment');
            break;
        case '/internship/process':
            await console.log('/internship/process');
            break;
        case '/internship/summary':
            console.log('/internship/summary');
            break;
        case '/account':
            await account();
            break;
    }
    
    updateDatabase();
}