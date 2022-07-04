import Table from "../table.js";
import updateDatabase from "../update-database.js";
import getApi from "../util/getApi.js";
import SearchForm from "../model/search-form.model.js";
import InsertForm from "../model/insert-form.model.js";
import EditForm from "../model/edit-form.model.js";
import ConfirmDelete from "../model/confirm-delete.model.js";
import pageNumber from "../page-number.js";

const originUrl = window.location.origin;
const getAllLecturer = originUrl + '/api/lecturer/get-all';
const getByIDLecturer = originUrl + '/api/lecturer/get-by-id';
const getDeleteLecturer = originUrl + '/api/lecturer/delete?lecturer_id=';
const postCreateLecturer = originUrl + '/api/lecturer/create';
const postUpdateLecturer = originUrl + '/api/lecturer/update';

function renderDb(allLecturer) {
    const tblLecturer = new Table({
        headings: ['LecturerID', 'Lecturer name', 'Gender', 'Date of birth', 'Home town', 'Email', 'Phone number'],
        records: allLecturer.recordset,
        page: 1,
        pageSize: 5,
        renderRecordFn: (lecturer) => `
            <td>${lecturer.lecturer_id}</td>
            <td>${lecturer.lecturer_name}</td>
            <td>${lecturer.lecturer_gender == 1 ? 'Nam' : 'Nữ'}</td>
            <td>${lecturer.lecturer_date_of_birth ? lecturer.lecturer_date_of_birth.slice(0, 10) : ''} </td>
            <td>${lecturer.lecturer_home_town ? lecturer.lecturer_home_town : ''}</td>
            <td>${lecturer.lecturer_email ? lecturer.lecturer_email : ''}</td>
            <td>${lecturer.lecturer_phone_number ? lecturer.lecturer_phone_number : ''}</td>`,
        primaryKey: 'lecturer_id'
    });

    tblLecturer.createTbl('table-db-1');
    renderForm();
}

function renderForm() {
    const originUrl = window.location.origin;
    const getApiSearchLecturer = originUrl + '/api/lecturer/search';
    const searchForm = initSearchForm();
    searchForm.createForm();
    searchForm.search(getApiSearchLecturer, renderDb);

    updateDatabase(initInsertForm(), initEditForm(), initConfirmDelete(),
        updateDatabaseToForm,deleteLecturer,
        refreshTblDb);
}

async function refreshTblDb() {
    await getApi(getAllLecturer, renderDb);
}

async function deleteLecturer(lecturer) {
    await getApi(getDeleteLecturer + lecturer, statusDelete);
    refreshTblDb();
}

function statusDelete() { }

function initSearchForm() {
    const contentSearchForm = `
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="lecturer-id">LecturerID</label>
                <input type="text" name="lecturer_id" class="form-control" id="lecturer-id">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-name">Lecturer name</label>
                <input type="text" name="lecturer_name" class="form-control" id="lecturer-name">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-gender">Gender</label>
                <select name="lecturer_gender" class="form-control" id="lecturer-gender">
                    <option value="2">Gender</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="lecturer-home-town">Quê quán</label>
                <input type="text" name="lecturer_home_town" class="form-control" id="lecturer-home-town">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-email">Email</label>
                <input type="email" name="lecturer_email" class="form-control" id="lecturer-email">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-phone-number">Phone number</label>
                <input type="text" name="lecturer_phone_number" class="form-control" id="lecturer-phone-number">
            </div>
        </div>
    `;

    return new SearchForm({
        content: contentSearchForm
    });
}

function initInsertForm(lecturer) {
    const contentInsertForm = `
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="lecturer-id">LecturerID</label>
                <input type="text" name="lecturer_id" class="form-control" id="lecturer-id">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-name">Lecturer name</label>
                <input type="text" name="lecturer_name" class="form-control" id="lecturer-name">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-gender">Gender</label>
                <select name="lecturer_gender" class="form-control" id="lecturer-gender">
                    <option value="2">Gender</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="lecturer-date-of-birth">Ngày sinh</label>
                <input type="date" name="lecturer_date_of_birth" class="form-control" id="lecturer-date-of-birth">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-home-town">Quê quán</label>
                <input type="text" name="lecturer_home_town" class="form-control" id="lecturer-home-town">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-email">Email</label>
                <input type="email" name="lecturer_email" class="form-control" id="lecturer-email">
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="lecturer-phone-number">Phone number</label>
                <input type="text" name="lecturer_phone_number" class="form-control" id="lecturer-phone-number">
            </div>
        </div>
    `;

    return new InsertForm('Thêm thông tin giảng viên', contentInsertForm, postCreateLecturer);
}

async function updateDatabaseToForm(lecturer_id) {
    await getApi(getByIDLecturer + '/?lecturer_id=' + lecturer_id, function(lecturer) {
        console.log(lecturer);
        $('.float-form input[name=lecturer_id]').val(lecturer.lecturer_id);
        $('.float-form input[name=lecturer_id]').prop('readonly', true);
        $('.float-form input[name=lecturer_name]').val(lecturer.lecturer_name);
        $('.float-form input[name=lecturer_date_of_birth]').val(
            lecturer.lecturer_date_of_birth ? lecturer.lecturer_date_of_birth.slice(0, 10) : ''
        );
        $('.float-form input[name=lecturer_home_town]').val(
            lecturer.lecturer_home_town ? lecturer.lecturer_home_town : ''
        );
        $('.float-form input[name=lecturer_email]').val(
            lecturer.lecturer_email ? lecturer.lecturer_email : ''
        );
        $('.float-form input[name=lecturer_phone_number]').val(
            lecturer.lecturer_phone_number ? lecturer.lecturer_phone_number : ''
        );

        const gender_options = $('.float-form select[name=lecturer_gender] option');
        console.log($('.float-form select[name=lecturer_gender]'));
        for (let i = 0; i < gender_options.length; i++) {
            console.log(gender_options[i].value)
            console.log(lecturer.lecturer_gender)
            if (Number(gender_options[i].value) == lecturer.lecturer_gender) {
                $(gender_options[i]).attr('selected', true);
                break;
            }
        }
    });
}

function initEditForm() {
    const contentEditForm = 
        `
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="lecturer-id">LecturerID</label>
                <input type="text" name="lecturer_id" class="form-control" id="lecturer-id">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-name">Lecturer name</label>
                <input type="text" name="lecturer_name" class="form-control" id="lecturer-name">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-gender">Gender</label>
                <select name="lecturer_gender" class="form-control" id="lecturer-gender">
                    <option value="2">Gender</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="lecturer-date-of-birth">Ngày sinh</label>
                <input type="date" name="lecturer_date_of_birth" class="form-control" id="lecturer-date-of-birth">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-home-town">Quê quán</label>
                <input type="text" name="lecturer_home_town" class="form-control" id="lecturer-home-town">
            </div>
            <div class="col-md-4 mb-4">
                <label for="lecturer-email">Email</label>
                <input type="email" name="lecturer_email" class="form-control" id="lecturer-email">
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="lecturer-phone-number">Phone number</label>
                <input type="text" name="lecturer_phone_number" class="form-control" id="lecturer-phone-number">
            </div>
        </div>
    `;

    return new EditForm('Sửa thông tin giảng viên', contentEditForm, postUpdateLecturer);
}

function initConfirmDelete() {
    const contentConfirmDelete = `
        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
        <div>Bạn có chắc chắn muốn chuyển vào thùng rác không?</div>
    `;

    return new ConfirmDelete('Xác nhận', contentConfirmDelete, getDeleteLecturer);
}

export default async () => {
    await getApi(getAllLecturer, renderDb);
};