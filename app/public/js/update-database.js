import table from "./page-number.js";

class FloatForm {
    constructor(obj) {
        this.title = obj.title;
        this.content = obj.content;
        this.btnClass = obj.btnClass;
        this.btnName = obj.btnName;
        this.confirmClass = obj.confirmClass;
        this.formName = obj.formName;
        this.action = obj.action;
        this.method = obj.method;
    }

    // Tạo và hiển thị xác nhận hoặc form cập nhật thông tin
    create() {
        let buttons = `<div class="float-form__button">`;

        if (this.formName.includes('form')) {
            buttons += `<button class="btn btn-reset" type="reset">Reset</button>`;
        }
        buttons += `
                <button class="btn ${this.btnClass}">${this.btnName}</button>
                <button class="btn btn-exit">Thoát</button>
            </div>
        `;

        this.htmlDiv = $('<div>', {
            class: 'float-form'
        }).html(`
            <div class="float-form--blur"></div>
            <form class="float-form__body" name="${this.formName}" method="${this.method ? this.method : ""}" action="${this.action ? this.action : ""}">
                <div class="float-form__top">
                    <div class="float-form__title">
                        ${this.title}
                    </div>
                    <div class="float-form__content ${this.confirmClass}">
                        ${this.content}
                    </div>
                </div>
                ${buttons}
            </form>
                `);

        $('.sidebar-with-content').after(this.htmlDiv);
    }

    // Đóng form nổi
    close() {
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
        $('.btn-exit').click(() => {
            this.close();
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

// Thêm thông tin mới
function insertRow() {
    // let contentInsertForm = `
    //     <div class="pt-4">
    //         <div class="form-row">
    //             <div class="col-md-4 mb-4">
    //                 <label for="id-doanh-nghiep">Mã viết tắt DN</label>
    //                 <input type="text" class="form-control" name="id-doanh-nghiep" id="id-doanh-nghiep" value="FPT" required>
    //             </div>
    //             <div class="col-md-4 mb-4">
    //                 <label for="ten-doanh-nghiep">Tên doanh nghiệp</label>
    //                 <input type="text" class="form-control" name="ten-doanh-nghiep" id="ten-doanh-nghiep"
    //                     value="Công ty Cổ phần Viễn thông FPT" required>
    //             </div>
    //             <div class="col-md-4 mb-4">
    //                 <label for="ngay-thanh-lap">Ngày thành lập</label>
    //                 <input type="date" class="form-control" name="ngay-thanh-lap" id="ngay-thanh-lap" required>
    //             </div>
    //         </div>
    //         <div class="form-row">
    //             <div class="col-md-4 mb-4">
    //                 <label for="loai-hinh">Loại hình</label>
    //                 <input type="text" class="form-control" name="loai-hinh" id="loai-hinh" value="Công ty phần mềm" required>
    //             </div>
    //             <div class="col-md-4 mb-4">
    //                 <label for="website">Website</label>
    //                 <input type="text" class="form-control" name="websited" id="website">
    //             </div>
    //         </div>
    //     </div>
    // `;

    const contentInsertForm = `
        <div class="pt-4">
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="role">Role</label>
                    <select name="role" class="form-control" id="role">
                        <option value="1">Admin</option>
                        <option value="2">Giảng viên</option>
                        <option value="3">Sinh viên</option>
                    </select>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="account">Account</label>
                    <input type="text" name="account" class="form-control" id="account">
                </div>
                <div class="col-md-4 mb-4">
                    <label for="password">Password</label>
                    <input type="text" name="password" class="form-control" id="password">
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="avatar">Avatar</label>
                    <input type="text" name="avatar" class="form-control" id="avatar">
                </div>
                <div class="col-md-4 mb-4">
                    <label for="full-name">Full name</label>
                    <input type="text" name="full_name" class="form-control" id="full-name">
                </div>
                <div class="col-md-4 mb-4">
                    <label for="gender">Gender</label>
                    <select name="gender" class="form-control" id="gender">
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                    </select>
                </div>
            </div>
        </div>
    `;

    // let insertForm = new FloatForm({
    //     title: 'Thêm thông tin doanh nghiệp',
    //     content: contentInsertForm,
    //     btnClass: 'btn-insert',
    //     btnName: 'Thêm mới',
    //     formName: 'insert-form',
    //     action: '/test/send',
    //     method: 'POST'
    // });

    let insertForm = new FloatForm({
        title: 'Thêm tài khoản',
        content: contentInsertForm,
        btnClass: 'btn-insert',
        btnName: 'Thêm mới',
        formName: 'insert-form',
        // action: '/api/account/create',
        // method: 'POST'
    });



    // Bấm nút thêm để mở form nhập thông tin mới
    $('.btn-new-info').click(() => {
        insertForm.create();
        insertForm.clickToClose();

        const formName = `form[name='${insertForm.formName}']`;
        const form = $(formName);
        console.log(form)

        const originUrl = window.location.origin;
        const postApiCreateAccount = originUrl + '/api/account/create';
        const homeUrl = originUrl + '/home';

        console.log($('.btn-insert'))
        $('.btn-insert').click(() => {
            console.log('click btn insert')
            form.submit((e) => {
                e.preventDefault();
                return true;
            });

            $.ajax({
                url: postApiCreateAccount,
                type: 'post',
                dataType: 'json',
                data: $('form[name="insert-form"]').serialize(),
                success: function (data) {
                    console.log(data);
                    // if (data.check_login == 1) {
                    //     window.location.href = homeUrl;
                    // }
                    // else {
                    //     console.log('false')
                    // }

                    //     window.location.href = homeUrl;
                }
            });
        });
    });


    // form.submit((e) => {
    //     const originUrl = window.location.origin;
    //     var postApiCreateAccount = originUrl + '/api/account/create';
    //     var homeUrl = originUrl + '/home';

    //     console.log('submit form call api ' + postApiCreateAccount)
    //     $.ajax({
    //         url: postApiCreateAccount,
    //         type: 'post',
    //         dataType: 'json',
    //         data: $('form[name="insert-form"]').serialize(),
    //         success: function (data) {
    //             console.log(data);
    //             // if (data.check_login == 1) {
    //             //     window.location.href = homeUrl;
    //             // }
    //             // else {
    //             //     console.log('false')
    //             // }

    //             //     window.location.href = homeUrl;
    //         }
    //     });

    //     return false;
    // });

}

// Chỉnh sửa 1 bản ghi
function editRow() {
    let contentEditForm = `
        <div class="pt-4">
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="id-doanh-nghiep">Mã viết tắt DN</label>
                    <input type="text" class="form-control" name="id-doanh-nghiep" id="id-doanh-nghiep" value="FPT" required>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="ten-doanh-nghiep">Tên doanh nghiệp</label>
                    <input type="text" class="form-control" name="ten-doanh-nghiep" id="ten-doanh-nghiep"
                        value="Công ty Cổ phần Viễn thông FPT" required>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="ngay-thanh-lap">Ngày thành lập</label>
                    <input type="date" class="form-control" name="ngay-thanh-lap" id="ngay-thanh-lap" required>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="loai-hinh">Loại hình</label>
                    <input type="text" class="form-control" name="loai-hinh" id="loai-hinh" value="Công ty phần mềm" required>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="website">Website</label>
                    <input type="text" class="form-control" name="websited" id="website">
                </div>
            </div>
        </div>
    `;

    let editForm = new FloatForm({
        title: 'Cập nhật thông tin doanh nghiệp',
        content: contentEditForm,
        btnClass: 'btn-edit',
        btnName: 'Lưu',
        formName: 'edit-form',
        action: '/test/send',
        method: 'POST'
    });

    let editBtn = $('.fa-pencil-square-o');

    editBtn.click((e) => {
        let rowSelected = $(e.target);      // Dòng muốn sửa
        editForm.create();
        editForm.clickToClose();
    });
}

// Xóa 1 bản ghi
function deleteRow() {
    let contentConfirmDelete = `
        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
        <div>Bạn có chắc chắn muốn chuyển vào thùng rác không?</div>
        `;

    let confirmDelete = new FloatForm({
        title: 'Xác nhận',
        content: contentConfirmDelete,
        btnClass: 'btn-agree',
        btnName: 'Đồng ý',
        confirmClass: 'confirm-delete',
        formName: 'confirm-delete'
    });

    let deleteBtn = $('.fa-trash-o');

    deleteBtn.click((e) => {
        let rowSelected = $(e.target);      // Dòng muốn xóa
        confirmDelete.create();

        // Bấm nút đồng ý xóa
        $('.btn-agree').click(() => {
            rowSelected.closest('tr').remove();     // Xóa hàng được chọn
            confirmDelete.close();
        });

        confirmDelete.clickToClose();
    });
}

function selectAll() {
    $("#selectAll").click(function () {     // AFFNW
        $("input[type=checkbox]").prop('checked', $(this).prop('checked'));
    });
}

export default () => {
    selectAll();
    insertRow();
    editRow();
    deleteRow();
    table();
};