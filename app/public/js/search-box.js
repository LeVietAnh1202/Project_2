function searchBox_Fn() {
    const angle_double_up = $('.fa-angle-double-up');
    
    angle_double_up.click((e) => {
        let form = $(e.currentTarget).parent().next();
        form.toggle();
    });
}

export default searchBox_Fn;