import account from "../account/account.js";
import company from "../company/company.js";
import updateDatabase from "../update-database.js";

function default_show(url) {
    $('.table-db').remove();
    $('.search').after(`<h1 class="table-db">${url}</h1>`);
}

export default async () => {
    const pathname = window.location.pathname;
    const companyUrl = window.location.origin + '/cms/company';
    switch (pathname) {
        case '/home':
        case '/cms/company':
            window.history.pushState({}, '', companyUrl);
            company();
            break;
        case '/cms/recruit/news':
            default_show('/cms/recruit/news');
            break;
        case '/cms/recruit/student':
            default_show('/cms/recruit/student');
            break;
        case '/cms/internship/assignment':
            default_show('/cms/internship/assignment');
            break;
        case '/cms/internship/process':
            default_show('/cms/internship/process');
            break;
        case '/cms/internship/summary':
            default_show('/cms/internship/summary');
            break;
        case '/cms/account':
            await account();
            break;
    }
    
    // updateDatabase();
}