// Thêm thông tin mới
function insertRow(insertForm) {
    // Bấm nút thêm để mở form nhập thông tin mới
    $('.btn-new-info').click((e) => {
        console.log('click btn-new-info')
        insertForm.createFloatForm();
        insertForm.clickToClose();

        const formName = `form[name='${insertForm.formName}']`;
        const form = $(formName);

        const originUrl = window.location.origin;
        const postApiCreateAccount = originUrl + '/api/account/create';
        const homeUrl = originUrl + '/home';

        form.submit(function (e) {
            $.ajax( {
                url: postApiCreateAccount,
                // url: 'http://localhost:810/upload-profile-pic',
                type: 'post',
                data: new FormData( this ),
                processData: false,
                contentType: false,
                success: function(result){
                    console.log(result);
                },
                fail: function (err) {
                    console.log(err);
                }
            } );
            e.preventDefault();
        });
    });
}

// Chỉnh sửa 1 bản ghi
function editRow(editForm) {
    let editBtn = $('.fa-pencil-square-o');

    editBtn.click((e) => {
        console.log('click-btn-edit')
        let rowSelected = $(e.target);      // Dòng muốn sửa
        editForm.createFloatForm();
        editForm.clickToClose();
    });
}

// Xóa 1 bản ghi
function deleteRow(confirmDelete) {
    let deleteBtn = $('.fa-trash-o');

    deleteBtn.click((e) => {
        let rowSelected = $(e.target);      // Dòng muốn xóa
        confirmDelete.createFloatForm();

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

export default (insertForm, editForm, confirmDelete) => {
    selectAll();
    insertRow(insertForm);
    editRow(editForm);
    deleteRow(confirmDelete);
    // table();
};