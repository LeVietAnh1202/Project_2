import Table from "../table.js";
import updateDatabase from "../update-database.js";
import getApi from "../util/getApi.js";
import SearchForm from "../model/search-form.model.js";
import InsertForm from "../model/Insert-form.model.js";
import EditForm from "../model/edit-form.model.js";
import ConfirmDelete from "../model/confirm-delete.model.js";
import pageNumber from "../page-number.js";

const originUrl = window.location.origin;
const getAllAcount = originUrl + '/api/account/get-all';

function renderFormAndDb(allAccount) {
    const tblAccount = new Table({
        headings: ['Role name', 'Account', 'Password', 'Avatar', 'Full name', 'Gender'],
        records: allAccount.recordset,
        page: 1,
        pageSize: 5,
        renderRecordFn: (account) => `
            <td>${account.role_name}</td>
            <td>${account.account}</td>
            <td>${account.password}</td>
            <td class="img-avatar"><img src="/img/${account.avatar}" class="user-avatar"></td>
            <td>${account.full_name}</td>
            <td>${account.gender == 1 ? 'Nam' : 'Nữ'}</td>`
    });

    tblAccount.createTbl();

    initSearchForm().createForm();

    updateDatabase(initInsertForm(), initEditForm(), initConfirmDelete());
}

function initSearchForm() {
    const contentSearchForm = `
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
                    <label for="full-name">Full name</label>
                    <input type="text" name="full-name" class="form-control" id="full-name">
                </div>
            </div>
            <div class="form-row">
                
                <div class="col-md-4 mb-4">
                    <label for="gender">Gender</label>
                    <select name="gender" class="form-control" id="gender">
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                    </select>
                </div>
            </div>
    `;

    return new SearchForm({
        content: contentSearchForm
    });
}

function initInsertForm() {
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
                    <input type="file" name="avatar" class="form-control-file" id="avatar">
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

    return new InsertForm('Thêm tài khoản', contentInsertForm);
}

function initEditForm() {
    const contentEditForm = `
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
                    <input type="file" name="avatar" class="form-control-file" id="avatar">
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
    
    return new EditForm('Sửa tài khoản', contentEditForm);
}

function initConfirmDelete() {
    const contentConfirmDelete = `
        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
        <div>Bạn có chắc chắn muốn chuyển vào thùng rác không?</div>
    `;

    return new ConfirmDelete('Xác nhận', contentConfirmDelete);
}

export default async () => {
    await getApi(getAllAcount, renderFormAndDb);
};