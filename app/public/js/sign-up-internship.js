import includeHTML from "./util/include-html.js";
import header, { updateUserInfor } from "./header.js";
import loadingScreen from "./loading-screen.js";
import sideBar_Fn from "./sidebar.js";

const originUrl = window.location.origin;
function router() {
    // alert('router')
    $('.feature-jobs .job-title').click(function (e) {
        const link = $(e.target).attr('data-link');
        console.log($(e.target));
        console.log(link);
        // switch (link) {
        //     case '/job/recruitment':
        //         alert('hihi')
        //         window.location.href = originUrl + '/app/resources/view-csr/partials/recruitment.html';
        //         break;
        // }
        // alert('hihi')
        
    })
}

function signUpInternship() {
    includeHTML(function() {
        header();
        sideBar_Fn('?page_name=Internship student');
        $('.sidebar').hide();
        updateUserInfor();
        loadingScreen();

        $('.header__title').remove();

        router();
    });
}

signUpInternship();