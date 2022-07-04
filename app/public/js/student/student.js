import Table from "../table.js";
import updateDatabase from "../update-database.js";
import getApi from "../util/getApi.js";
import SearchForm from "../model/search-form.model.js";
import InsertForm from "../model/insert-form.model.js";
import EditForm from "../model/edit-form.model.js";
import ConfirmDelete from "../model/confirm-delete.model.js";
import pageNumber from "../page-number.js";

const originUrl = window.location.origin;
const getAllStudent = originUrl + '/api/student/get-all';
const getByIDStudent = originUrl + '/api/student/get-by-id';
const getDeleteStudent = originUrl + '/api/student/delete?student_id=';
const postCreateStudent = originUrl + '/api/student/create';
const postUpdateStudent = originUrl + '/api/student/update';

function renderDb(allStudent) {
    const tblStudent = new Table({
        headings: ['StudentID', 'Student name', 'Gender', 'Date of birth', 'Home town', 'Email', 'Phone number'],
        records: allStudent.recordset,
        page: 1,
        pageSize: 5,
        renderRecordFn: (student) => `
            <td>${student.student_id}</td>
            <td>${student.student_name}</td>
            <td>${student.student_gender == 1 ? 'Nam' : 'Nữ'}</td>
            <td>${student.student_date_of_birth ? student.student_date_of_birth.slice(0, 10) : ''}</td>
            <td>${student.student_home_town ? student.student_home_town : ''}</td>
            <td>${student.student_email ? student.student_email : ''}</td>
            <td>${student.student_phone_number ? student.student_phone_number : ''}</td>`,
        primaryKey: 'student_id'
    });

    tblStudent.createTbl('table-db-1');
    renderForm();
}

function renderForm() {
    const originUrl = window.location.origin;
    const getApiSearchStudent = originUrl + '/api/student/search';
    const searchForm = initSearchForm();
    searchForm.createForm();
    searchForm.search(getApiSearchStudent, renderDb);

    updateDatabase(initInsertForm(), initEditForm(), initConfirmDelete(),
        updateDatabaseToForm,deleteStudent,
        refreshTblDb);
}

async function refreshTblDb() {
    await getApi(getAllStudent, renderDb);
}

async function deleteStudent(student) {
    await getApi(getDeleteStudent + student, statusDelete);
    refreshTblDb();
}

function statusDelete() { }

function initSearchForm() {
    const contentSearchForm = `
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="student-id">StudentID</label>
                <input type="text" name="student_id" class="form-control" id="student-id">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-name">Student name</label>
                <input type="text" name="student_name" class="form-control" id="student-name">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-gender">Gender</label>
                <select name="student_gender" class="form-control" id="student-gender">
                    <option value="2">Gender</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="student-home-town">Quê quán</label>
                <input type="text" name="student_home_town" class="form-control" id="student-home-town">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-email">Email</label>
                <input type="email" name="student_email" class="form-control" id="student-email">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-phone-number">Phone number</label>
                <input type="text" name="student_phone_number" class="form-control" id="student-phone-number">
            </div>
        </div>
    `;

    return new SearchForm({
        content: contentSearchForm
    });
}

function initInsertForm(student) {
    const contentInsertForm = `
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="student-id">StudentID</label>
                <input type="text" name="student_id" class="form-control" id="student-id">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-name">Student name</label>
                <input type="text" name="student_name" class="form-control" id="student-name">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-gender">Gender</label>
                <select name="student_gender" class="form-control" id="student-gender">
                    <option value="2">Gender</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="student-date-of-birth">Ngày sinh</label>
                <input type="date" name="student_date_of_birth" class="form-control" id="student-date-of-birth">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-home-town">Quê quán</label>
                <input type="text" name="student_home_town" class="form-control" id="student-home-town">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-link">Link</label>
                <input type="text" name="student_link" class="form-control" id="student-link">
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="student-email">Email</label>
                <input type="email" name="student_email" class="form-control" id="student-email">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-phone-number">Phone number</label>
                <input type="text" name="student_phone_number" class="form-control" id="student-phone-number">
            </div>
        </div>
    `;

    return new InsertForm('Thêm thông tin sinh viên', contentInsertForm, postCreateStudent, 'enctype="multipart/form-data"');
}

async function updateDatabaseToForm(student_id) {
    await getApi(getByIDStudent + '/?student_id=' + student_id, function(student) {
        console.log(student);
        $('.float-form input[name=student_id]').val(student.student_id);
        $('.float-form input[name=student_id]').prop('readonly', true);
        $('.float-form input[name=student_name]').val(student.student_name);
        $('.float-form input[name=student_date_of_birth]').val(
            student.student_date_of_birth ? student.student_date_of_birth.slice(0, 10) : ''
        );
        $('.float-form input[name=student_home_town]').val(
            student.student_home_town ? student.student_home_town : ''
        );
        $('.float-form input[name=student_email]').val(
            student.student_email ? student.student_email : ''
        );
        $('.float-form input[name=student_phone_number]').val(
            student.student_phone_number ? student.student_phone_number : ''
        );
        $('.float-form input[name=student_link]').val(
            student.student_link ? student.student_link : ''
        );

        const gender_options = $('.float-form select[name=student_gender] option');
        console.log($('.float-form select[name=student_gender]'));
        for (let i = 0; i < gender_options.length; i++) {
            console.log(gender_options[i].value)
            console.log(student.student_gender)
            if (Number(gender_options[i].value) == student.student_gender) {
                $(gender_options[i]).attr('selected', true);
                break;
            }
        }

        // const role_options = $('.float-form select[name=role] option');
        // // $('.float-form select[name=role]').attr('readonly', true);
        // $('.float-form select[name=role]').prop('disabled', true);
        // const gender_options = $('.float-form select[name=gender] option');
        // $('.float-form input[name=account]').val(account.account);
        // $('.float-form input[name=account]').prop('readonly', true);
        // $('.float-form input[name=full_name]').val(account.full_name);

        // for (let i = 0; i < role_options.length; i++) {
        //     if (Number(role_options[i].value) == account.role_id) {
        //         $(role_options[i]).attr('selected', true);
        //         break;
        //     }
        // }
        
        // for (let i = 0; i < gender_options.length; i++) {
        //     if (Number(gender_options[i].value) == account.gender) {
        //         $(gender_options[i]).attr('selected', true);
        //         break;
        //     }
        // }
    });
}

function initEditForm() {
    const contentEditForm = 
        `
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="student-id">StudentID</label>
                <input type="text" name="student_id" class="form-control" id="student-id">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-name">Student name</label>
                <input type="text" name="student_name" class="form-control" id="student-name">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-gender">Gender</label>
                <select name="student_gender" class="form-control" id="student-gender">
                    <option value="2">Gender</option>
                    <option value="1">Nam</option>
                    <option value="0">Nữ</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="student-date-of-birth">Ngày sinh</label>
                <input type="date" name="student_date_of_birth" class="form-control" id="student-date-of-birth">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-home-town">Quê quán</label>
                <input type="text" name="student_home_town" class="form-control" id="student-home-town">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-link">Link</label>
                <input type="text" name="student_link" class="form-control" id="student-link">
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="student-email">Email</label>
                <input type="email" name="student_email" class="form-control" id="student-email">
            </div>
            <div class="col-md-4 mb-4">
                <label for="student-phone-number">Phone number</label>
                <input type="text" name="student_phone_number" class="form-control" id="student-phone-number">
            </div>
        </div>
    `;

    return new EditForm('Sửa thông tin sinh viên', contentEditForm, postUpdateStudent);
}

function initConfirmDelete() {
    const contentConfirmDelete = `
        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
        <div>Bạn có chắc chắn muốn chuyển vào thùng rác không?</div>
    `;

    return new ConfirmDelete('Xác nhận', contentConfirmDelete, getDeleteStudent);
}

export default async () => {
    await getApi(getAllStudent, renderDb);
    // const searchForm = initSearchForm();
    // searchForm.createForm();
};