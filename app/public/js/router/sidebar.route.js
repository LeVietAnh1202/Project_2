import account from "../account/account.js";
import company from "../company/company.js";
import updateDatabase from "../update-database.js";
import assignmentLecturers from "../assignment/assignment-lecturers.js";
import student from "../student/student.js";
import lecturer from "../lecturer/lecturer.js";

function default_show(url) {
    $('.table-db').remove();
    $('.search').after(`<h1 class="table-db">${url}</h1>`);
}

export default async () => {
    const pathname = window.location.pathname;
    const originUrl = window.location.origin;
    const companyUrl = window.location.origin + '/cms/company';
    // console.log(pathname);
    if (pathname == '/cms/internship/assignment' || pathname == '/lecturer') {
        $('.search').css('display', 'none');
        $('.btn-new-info').css('display', 'none');
        $('.nav-address').after('<button type="button" class="btn btn-save btn-primary">Lưu</button>')
    }
    else {
        $('.search').css('display', 'block');
        $('.btn-new-info').css('display', 'block');
        $('.btn-save').remove();
    }
    switch (pathname) {
        case '/home':
        case '/cms/company':
            window.history.pushState({}, '', companyUrl);
            company();
            break;
        case '/cms/recruit/news':
            default_show('/cms/recruit/news');
            $('form[name=form-search').html('');
            break;
        case '/cms/recruit/student':
            student();
            break;
        case '/cms/internship/assignment':
            // default_show('/cms/internship/assignment');
            assignmentLecturers();
            break;
        case '/cms/internship/process':
            default_show('/cms/internship/process');
            break;
        case '/cms/internship/summary':
            default_show('/cms/internship/summary');
            break;
        case '/cms/internship/lecturer':
            lecturer();
            break;
        case '/cms/account':
            await account();
            break;
        case '/job':
            window.location.href = originUrl + '/job';
            break;
        case '/profile':
            window.location.href = originUrl + '/profile';
            break;
        case '/company':
            window.location.href = originUrl + '/company';
            break;
    }
}