function header() {
    const headerAvatar = $('.header__avatar');
    const userMenu = $('.user-menu');

    headerAvatar.click(() => {
        userMenu.toggle();
    });
}

export default header;