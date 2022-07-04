import includeHTML from "./util/include-html.js";
import header, { updateUserInfor } from "./header.js";
import loadingScreen from "./loading-screen.js";
import sideBar_Fn from "./sidebar.js";
import follow from "./util/follow.js";
import clickHeart from "./util/click-heart.js";
import getApi from "./util/getApi.js";

const originUrl = window.location.origin;
// const getApiGetByIdStudent = originUrl + '/api/student/get-by-id';

async function updateProfile() {
    const account = localStorage.getItem('account');
    if (account) {
        const userAccount = JSON.parse(
            CryptoJS.AES.decrypt(account, 'SecretAdvmln')
                .toString(CryptoJS.enc.Utf8)
        )
        $('.profile-image-logo img').attr('src', '/img/' + userAccount.avatar);
        $('.profile-detail-name').text(userAccount.full_name);
        $('.profile-detail-account').text('@' + userAccount.account);
        console.log(userAccount)
        $('.profile__cover-image img').attr('src', '/img/' + userAccount.cover_image);

        const getApiGetByIdStudent = originUrl + '/api/student/get-by-account-id?account=' + userAccount.account;
        await getApi(getApiGetByIdStudent, function (studentInfor) {
            console.log(studentInfor);
            $('.birthday i').after(studentInfor.student_date_of_birth.slice(0, 10));
            $('.gender i').after(studentInfor.student_gender ? 'Nam' : 'Nữ');
            $('.phone-number i').after(studentInfor.student_phone_number);
            $('.email i').after(studentInfor.student_email);
            $('.address i').after(studentInfor.student_home_town);
            $('.link a').attr('href', studentInfor.student_link);
            $('.link a').text(studentInfor.student_link);
        })
    };
}

function profile() {
    includeHTML(function () {
        header();
        const headerBody = $('.header__body');
        // Active option Hồ sơ
        headerBody.find('.active').removeClass('active');
        headerBody.find('.profile').addClass('active');
        sideBar_Fn('?page_name=Internship student');
        
        $('.sidebar').hide();
        updateUserInfor();
        updateProfile();
        loadingScreen();

        $('.header__title').remove();
        $('.header__logo a').attr('href', '/job');
        follow();
        clickHeart();
    });
}

profile();