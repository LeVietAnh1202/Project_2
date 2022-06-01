function header() {
    const headerAvatar = $('.header__avatar');
    const userMenu = $('.user-menu');
    const logout = $('.logout');
    const setting = $('.setting');
    const originUrl = window.location.origin;

    headerAvatar.click(() => {
        userMenu.toggle();
    });

    logout.click(() => {
        console.log('logout')
        window.location.href = originUrl;
    });
}

export default header;