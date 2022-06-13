import includeHTML from "./util/include-html.js";
import header, { updateUserInfor } from "./header.js";
import loadingScreen from "./loading-screen.js";
import sideBar_Fn from "./sidebar.js";

function signUpInternship() {
    includeHTML(function() {
        header();
        sideBar_Fn('?page_name=Internship student');
        $('.sidebar').hide();
        updateUserInfor();
        loadingScreen();

        $('.header__title').remove();
    });
}

signUpInternship();