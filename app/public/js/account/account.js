import Table from "../table.js";
import updateDatabase from "../update-database.js";
import getApi from "../util/getApi.js";
import SearchForm from "../model/search-form.model.js";
import InsertForm from "../model/Insert-form.model.js";
import EditForm from "../model/edit-form.model.js";
import ConfirmDelete from "../model/confirm-delete.model.js";
import pageNumber from "../page-number.js";

const originUrl = window.location.origin;
const getAllAccount = originUrl + '/api/account/get-all';
const getByIDAccount = originUrl + '/api/account/get-by-id';
const getDeleteAccount = originUrl + '/api/account/delete?account=';
const postCreateAccount = originUrl + '/api/account/create';
const postUpdateAccount = originUrl + '/api/account/update';

function renderDb(allAccount) {
    console.log(allAccount);
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
            <td>${account.gender == 1 ? 'Nam' : 'Nữ'}</td>`,
        primaryKey: 'account'
    });

    tblAccount.createTbl('table-db-1');
    renderForm();
}

function renderForm() {
    const originUrl = window.location.origin;
    const getApiSearchAccount = originUrl + '/api/account/search';
    const searchForm = initSearchForm();
    searchForm.createForm();
    searchForm.search(getApiSearchAccount, renderDb);

    updateDatabase(initInsertForm(), initEditForm(), initConfirmDelete(),
        updateDatabaseToForm,deleteAccount,
        refreshTblDb);
}

async function refreshTblDb() {
    await getApi(getAllAccount, renderDb);
}

async function deleteAccount(account) {
    await getApi(getDeleteAccount + account, statusDelete);
    refreshTblDb();
}

function statusDelete() { }

function initSearchForm() {
    const contentSearchForm = `
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="role">Role</label>
                    <select name="role" class="form-control" id="role">
                        <option value="0">Role</option>
                        <option value="1">Admin</option>
                        <option value="2">Giảng viên</option>
                        <option value="3">Sinh viên</option>
                        <option value="4">Cán bộ doanh nghiệp</option>
                    </select>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="account">Account</label>
                    <input type="text" name="account" class="form-control" id="account">
                </div>
                <div class="col-md-4 mb-4">
                    <label for="full_name">Full name</label>
                    <input type="text" name="full_name" class="form-control" id="full_name">
                </div>
            </div>
            <div class="form-row">
                
                <div class="col-md-4 mb-4">
                    <label for="gender">Gender</label>
                    <select name="gender" class="form-control" id="gender">
                        <option value="2">Gender</option>
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

function initInsertForm(account) {
    const contentInsertForm = `
        <div class="pt-4">
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="role">Role</label>
                    <select name="role" class="form-control" id="role">
                        <option value="1">Admin</option>
                        <option value="2">Giảng viên</option>
                        <option value="3">Sinh viên</option>
                        <option value="4">Cán bộ doanh nghiệp</option>
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
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="cover-image">Cover image</label>
                    <input type="file" name="cover_image" class="form-control-file" id="cover-image">
                </div>
            </div>
        </div>
    `;

    return new InsertForm('Thêm tài khoản', contentInsertForm, postCreateAccount, 'enctype="multipart/form-data"');
}

async function updateDatabaseToForm(accountID) {
    await getApi(getByIDAccount + '/?account=' + accountID, function(accountObj) {
        const account = accountObj.recordset[0]
        const role_options = $('.float-form select[name=role] option');
        $('.float-form select[name=role]').prop('disabled', true);
        const gender_options = $('.float-form select[name=gender] option');
        $('.float-form input[name=account]').val(account.account);
        $('.float-form input[name=account]').prop('readonly', true);
        $('.float-form input[name=full_name]').val(account.full_name);

        for (let i = 0; i < role_options.length; i++) {
            if (Number(role_options[i].value) == account.role_id) {
                $(role_options[i]).attr('selected', true);
                break;
            }
        }
        
        for (let i = 0; i < gender_options.length; i++) {
            if (Number(gender_options[i].value) == account.gender) {
                $(gender_options[i]).attr('selected', true);
                break;
            }
        }
    });
}

function initEditForm() {
    const contentEditForm = 
        `
        <div class="pt-4">
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="role">Role</label>
                    <select name="role" class="form-control" id="role">
                        <option value="1">Admin</option>
                        <option value="2">Giảng viên</option>
                        <option value="3">Sinh viên</option>
                        <option value="4">Cán bộ doanh nghiệp</option>
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

    return new EditForm('Sửa tài khoản', contentEditForm, postUpdateAccount, 'enctype="multipart/form-data"');
}

// function initEditForm() {
//     const contentEditForm = `
//         <div class="pt-4">
//             <div class="form-row">
//                 <div class="col-md-4 mb-4">
//                     <label for="role">Role</label>
//                     <select name="role" class="form-control" id="role">
//                         <option value="1">Admin</option>
//                         <option value="2">Giảng viên</option>
//                         <option value="3">Sinh viên</option>
//                     </select>
//                 </div>
//                 <div class="col-md-4 mb-4">
//                     <label for="account">Account</label>
//                     <input type="text" name="account" class="form-control" id="account">
//                 </div>
//                 <div class="col-md-4 mb-4">
//                     <label for="password">Password</label>
//                     <input type="text" name="password" class="form-control" id="password">
//                 </div>
//             </div>
//             <div class="form-row">
//                 <div class="col-md-4 mb-4">
//                     <label for="avatar">Avatar</label>
//                     <input type="file" name="avatar" class="form-control-file" id="avatar">
//                 </div>
//                 <div class="col-md-4 mb-4">
//                     <label for="full-name">Full name</label>
//                     <input type="text" name="full_name" class="form-control" id="full-name">
//                 </div>
//                 <div class="col-md-4 mb-4">
//                     <label for="gender">Gender</label>
//                     <select name="gender" class="form-control" id="gender">
//                         <option value="1">Nam</option>
//                         <option value="0">Nữ</option>
//                     </select>
//                 </div>
//             </div>
//         </div>
//     `;

//     return new EditForm('Sửa tài khoản', contentEditForm);
// }

function initConfirmDelete() {
    const contentConfirmDelete = `
        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
        <div>Bạn có chắc chắn muốn chuyển vào thùng rác không?</div>
    `;

    return new ConfirmDelete('Xác nhận', contentConfirmDelete, getDeleteAccount);
}

export default async () => {
    await getApi(getAllAccount, renderDb);
};