import includeHTML from "./util/include-html.js";
import header, { updateUserInfor } from "./header.js";
import loadingScreen from "./loading-screen.js";
import sideBar_Fn from "./sidebar.js";
import follow from "./util/follow.js";
import clickHeart from "./util/click-heart.js";
import ConfirmApply from "./model/confirm-apply.model.js";
import Success from "./model/success.model.js";

function initConfirmApply() {
    const contentConfirmApply = `
        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
        <div>Bạn có chắc chắn muốn ứng tuyển không?</div>
    `;

    return new ConfirmApply('Xác nhận', contentConfirmApply);
}

function initSuccess() {
    const contentSuccess = `
        <i class="fa fa-check" aria-hidden="true"></i>
        <div>Ứng tuyển thành công</div>
    `;

    return new Success('Xác nhận', contentSuccess);
}

function applyCurrent() {
    const btnApplyCurrent = $('.btn-apply-current');
    btnApplyCurrent.click(() => {
        if (btnApplyCurrent.find('span').text() == 'Ứng tuyển ngay') {
            const confirmApply = initConfirmApply();
            confirmApply.createFloatForm();
            confirmApply.clickToClose();
            
            $('.btn-agree').click(() => {
                confirmApply.close();
    
                const successNotification = initSuccess();
                successNotification.createFloatForm();
    
                $('.float-form__title').remove();
                $('.float-form__button').remove();
                successNotification.clickToClose();
    
                btnApplyCurrent.find('span').text('Đã ứng tuyển');
                btnApplyCurrent.find('i').removeClass('fa-paper-plane-o').addClass('fa-check');
                return false;
            })
        }
    })
}

function recruitment() {
    includeHTML(function () {
        header();
        const headerBody = $('.header__body');
        // Active option Việc làm
        headerBody.find('.active').removeClass('active');
        headerBody.find('.job').addClass('active');
        sideBar_Fn('?page_name=Internship student');

        $('.sidebar').hide();
        updateUserInfor();
        loadingScreen();

        $('.header__title').remove();
        $('.header__logo a').attr('href', '/job');
        follow();
        clickHeart();

        applyCurrent();
    });
}

recruitment();