import includeHTML from "./util/include-html.js";
import header, { updateUserInfor } from "./header.js";
import loadingScreen from "./loading-screen.js";
import sideBar_Fn from "./sidebar.js";
import follow from "./util/follow.js";
import clickHeart from "./util/click-heart.js";

function company() {
    includeHTML(function () {
        header();
        const headerBody = $('.header__body');
        // Active option Công ty
        headerBody.find('.active').removeClass('active');
        headerBody.find('.company').addClass('active');
        sideBar_Fn('?page_name=Internship student');
        
        $('.sidebar').hide();
        updateUserInfor();
        loadingScreen();

        $('.header__title').remove();
        $('.header__logo a').attr('href', '/job');
        follow();
        clickHeart();
    });
}

company();