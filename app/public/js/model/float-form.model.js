class FloatForm {
    constructor(title, content, btnClass, btnName, formName, api, enctype) {
        this.title = title;
        this.content = content;
        this.btnClass = btnClass;
        this.btnName = btnName;
        // this.confirmClass = confirmClass;
        this.formName = formName;
        this.api = api;
        this.enctype = enctype;
        // this.action = action;
        // this.method = method;
    }

    // Tạo và hiển thị xác nhận hoặc form cập nhật thông tin
    createFloatForm() {
        let buttons = `<div class="float-form__button">`;
        const isForm = this.formName.includes('form');
        if (isForm) {
            buttons += `<button class="btn btn-reset" type="reset">Reset</button>`;
        }

        if (this.btnClass) {
            buttons += `
                <button class="btn ${this.btnClass}">${this.btnName}</button>
            `};

        buttons += `
                <button class="btn btn-exit">Thoát</button>
            </div>
        `;

        this.htmlDiv = $('<div>', {
            class: 'float-form'
        }).html(`
            <div class="float-form--blur"></div>
            <${isForm ? 'form' : 'div'} class="float-form__body" ${this.enctype == undefined ? '' : this.enctype} name="${this.formName}" method="${this.method ? this.method : ""}" action="${this.action ? this.action : ""}">
                <div class="float-form__top">
                    <div class="float-form__title">
                        ${this.title}
                    </div>
                    <div class="float-form__content ${this.confirmClass ? this.confirmClass : ""}">
                        ${this.content}
                    </div>
                </div>
                ${buttons}
            </${isForm ? 'form' : 'div'}>
                `);

        const sideBarWithContent = $('.sidebar-with-content');
        $('.float-form').remove();
        sideBarWithContent.after(this.htmlDiv)
    }

    // Đóng form nổi
    close() {
        console.log(this.htmlDiv);
        this.htmlDiv.remove();
    }

    // Đóng form nổi bằng cách bấm vào nền mở hoặc nút thoát
    clickToClose() {
        this.clickBackgroudBlurToClose();
        this.clickButtonExitToClose();
        return false;
    }

    // Bấm nút thoát để đóng form nổi
    clickButtonExitToClose() {
        $('.btn-exit').click((e) => {
            $('.btn-exit').off('click');
            this.close();
            e.preventDefault();
            return false;
        });
    }

    // Bấm vào nền mở để đóng form nổi
    clickBackgroudBlurToClose() {
        $('.float-form--blur').click(() => {
            this.close();
            return false;
        });
    }
}

export default FloatForm;