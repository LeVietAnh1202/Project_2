import account from "./account/account.js";
import getApi from "./util/getApi.js";


// Thêm thông tin mới
function insertRow(insertForm, callback) {
    // Bấm nút thêm để mở form nhập thông tin mới
    $('.btn-new-info').click((e) => {
        insertForm.createFloatForm();
        insertForm.clickToClose();

        const formName = `form[name='${insertForm.formName}']`;
        const form = $(formName);

        form.submit(function (e) {
            if (insertForm.enctype == undefined) {
                $.ajax( {
                    url: insertForm.api,
                    type: 'post',
                    dataType: 'json',
                    data: form.serialize(),
                    success: function(result){
                        console.log(result);
                        callback();
                        insertForm.close();
                    },
                    fail: function (err) {
                        console.log(err);
                    }
                });
            }
            else {
                $.ajax({
                    url: insertForm.api,
                    type: 'post',
                    data: new FormData(this),
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        console.log(result);
                        callback();
                        insertForm.close();
                    },
                    fail: function (err) {
                        console.log(err);
                    }
                });
            }
            e.preventDefault();
            return false;
        });
    });
}

// Chỉnh sửa 1 bản ghi
function editRow(editForm, updateDatabaseToForm, callback) {
    let editBtn = $('.fa-pencil-square-o');

    editBtn.click((e) => {
        let rowSelected = $(e.target);      // Dòng muốn sửa
        console.log(rowSelected);
        editForm.createFloatForm();
        updateDatabaseToForm(rowSelected.attr('data-id'));
        editForm.clickToClose();

        const formName = `form[name='${editForm.formName}']`;
        const form = $(formName);

        form.submit(function (e) {
            if (editForm.enctype == undefined) {
                $.ajax({
                    url: editForm.api,
                    type: 'post',
                    dataType: 'json',
                    data: form.serialize(),
                    success: function (result) {
                        console.log(result);
                        callback();
                        editForm.close();
                    },
                    fail: function (err) {
                        console.log(err);
                    }
                });
            }
            else {
                $.ajax({
                    url: editForm.api,
                    type: 'post',
                    data: new FormData(this),
                    processData: false,
                    contentType: false,
                    success: function (result) {
                        console.log(result);
                        callback();
                        editForm.close();
                    },
                    fail: function (err) {
                        console.log(err);
                    }
                });
            }
            
            e.preventDefault();
            return false;
        });
    });
}

// Xóa 1 bản ghi
function deleteRow(confirmDelete, deleteRowCallback) {
    let deleteBtn = $('.fa-trash-o');

    deleteBtn.click((e) => {
        let rowSelected = $(e.target);      // Dòng muốn xóa
        confirmDelete.createFloatForm();

        // Bấm nút đồng ý xóa
        $('.btn-agree').click(async (e) => {
            rowSelected.closest('tr').remove();     // Xóa hàng được chọn
            deleteRowCallback(rowSelected.attr('data-id'));
            confirmDelete.close();
            return false;
        });

        confirmDelete.clickToClose();
        return false;
    });
}

function selectAll() {
    $("#selectAll-tbl-1").click(function () {     // AFFNW
        $("input[name=selectRow-tbl-1]").prop('checked', $(this).prop('checked'));
    });

    $("#selectAll-tbl-2").click(function () {     // AFFNW
        $("input[name=selectRow-tbl-2]").prop('checked', $(this).prop('checked'));
    });
}

export default (insertForm, editFrom, confirmDelete, updateDatabaseToForm, deleteRowCallback, refreshTblDb) => {
    selectAll();
    insertRow(insertForm, refreshTblDb);
    editRow(editFrom, updateDatabaseToForm, refreshTblDb);
    deleteRow(confirmDelete, deleteRowCallback);
    // table();
};