import table from "./table.js";

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
    }

    // Bấm nút thoát để đóng form nổi
    clickButtonExitToClose() {
        $('.btn-exit').click(() => {
            this.close();
        });
    }

    // Bấm vào nền mở để đóng form nổi
    clickBackgroudBlurToClose() {
        $('.float-form--blur').click(() => {
            this.close();
        });
    }
}

// Thêm thông tin mới
function insertRow() {
    let contentInsertForm = `
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

    let insertForm = new FloatForm({
        title: 'Thêm thông tin doanh nghiệp',
        content: contentInsertForm,
        btnClass: 'btn-insert',
        btnName: 'Thêm mới',
        formName: 'insert-form',
        action: '/test/send',
        method: 'POST'
    });

    // Bấm nút thêm để mở form nhập thông tin mới
    $('.btn-new-info').click(() => {
        insertForm.create();
        insertForm.clickToClose();
    });
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