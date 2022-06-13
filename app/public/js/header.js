function updateUserInfor() {
    const account = localStorage.getItem('account');
    if (account) {
        const userAccount = JSON.parse(
            CryptoJS.AES.decrypt(account, 'SecretAdvmln')
                .toString(CryptoJS.enc.Utf8)
        )

        $('.user-menu__avatar').attr('src', '/img/' + userAccount.avatar);
        $('.header__avatar').attr('src', '/img/' + userAccount.avatar);
        $('.user-menu__name').html(userAccount.full_name);
        $('.user-menu__user-name').html('@' + userAccount.account);
    };


}

function header() {
    const headerBell = $('.fa-bell');
    const notifications = $('.notifications');
    const headerAvatar = $('.header__avatar');
    const userMenu = $('.user-menu');
    const logout = $('.logout');
    const setting = $('.setting');
    const originUrl = window.location.origin;

    $('body').click(() => {
        if (notifications.css('display') == 'block') {
            notifications.css('display', 'none');
        }

        if (userMenu.css('display') == 'block') {
            userMenu.css('display', 'none');
        }
    })

    headerBell.click((e) => {
        notifications.toggle();
        e.stopPropagation();
    });

    headerAvatar.click((e) => {
        userMenu.toggle();
        e.stopPropagation();
    });

    logout.click(() => {
        localStorage.removeItem('account');
        window.location.href = originUrl;
    });
}

export { updateUserInfor }
export default header;