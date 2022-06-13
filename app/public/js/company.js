import includeHTML from "./util/include-html.js";
import header, { updateUserInfor } from "./header.js";
import loadingScreen from "./loading-screen.js";
import sideBar_Fn from "./sidebar.js";
import follow from "./util/follow.js";
import clickHeart from "./util/click-heart.js";

function signUpInternship() {
    includeHTML(function () {
        header();
        const job = $('.header__body').find('li');

        // Active option Công ty
        job.removeClass('active');
        job.next().next().addClass('active');
        sideBar_Fn('?page_name=Internship student');
        
        $('.sidebar').hide();
        updateUserInfor();
        loadingScreen();

        $('.header__title').remove();
        follow();
        clickHeart();
    });
}

signUpInternship();