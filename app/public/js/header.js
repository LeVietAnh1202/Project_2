function header() {
    const headerAvatar = $('.header__avatar');
    const userMenu = $('.user-menu');
    headerAvatar.click(() => {
    //   headerAvatar.ariaExpanded = !JSON.parse(headerAvatar.ariaExpanded);
    //   if (!JSON.parse(headerAvatar.ariaExpanded)) {
    //     // headerAvatar.classList.add('d-none');
    //     headerAvatar.addClass('d-none')
    //   }
    //   else {
    //     //   headerAvatar.classList.remove('d-none');
    //   }
    // headerAvatar[0].ariaExpanded = !headerAvatar[0].ariaExpanded
    // console.log(headerAvatar[0].ariaExpanded)
    
    // if (headerAvatar.attr('aria-expanded') == 'true') {
    //     headerAvatar.attr('aria-expanded', 'false')
    //     userMenu.hide('slow');
    // }
    // else {
    //     headerAvatar.attr('aria-expanded', 'true')
    //     userMenu.show('fast', 'linear');
    // }
    userMenu.toggle();
    });

}

export default header;