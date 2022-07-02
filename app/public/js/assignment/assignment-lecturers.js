import Table from "../table.js";
import updateDatabase from "../update-database.js";
import getApi from "../util/getApi.js";
import SearchForm from "../model/search-form.model.js";
import InsertForm from "../model/Insert-form.model.js";
import EditForm from "../model/edit-form.model.js";
import ConfirmDelete from "../model/confirm-delete.model.js";
import pageNumber from "../page-number.js";
import Success from "../model/success.model.js";

const originUrl = window.location.origin;
const getAllLecturer = originUrl + '/api/lecturer/get-all';
const getAllStudent = originUrl + '/api/student/get-all';
const getDeleteLecturer = originUrl + '/api/lecturer/delete?lecturer_id=';
const getDeleteStudent = originUrl + '/api/student/delete?student_id=';

let assignmentDb = [
    {
        lecturer_id: '10120635',
        list_id: [
            '10120620',
            '10120674'
        ]
    },
    {
        lecturer_id: '10120792',
        list_id: [
            '12520088'
        ]
    }
]
let lecturerSelected = '10120635';
let studentArr, listAllAssignment = [];

function getAllAssignments() {
    listAllAssignment = [];
    const assignmentDbLocalStorage = JSON.parse(localStorage.getItem('assignmentStudentLecturer'));
    if (assignmentDbLocalStorage) {
        assignmentDb = assignmentDbLocalStorage;
    }
    assignmentDb.forEach((assignment) => {
        if (assignment.lecturer_id == lecturerSelected) {
            studentArr = assignment.list_id;
            // return false;
        }
        console.log(assignment);
        assignment.list_id.forEach(list_id => listAllAssignment.push(list_id));
    })
}

function renderDb1(allLecturer) {
    const tblLecturer = new Table({
        headings: ['LecturerID', 'Lecturer name', 'Gender', 'Date of birth', 'Home town', 'Email', 'Phone number'],
        records: allLecturer.recordset,
        page: 1,
        pageSize: 5,
        renderRecordFn: (lecturer) => `
            <td>${lecturer.lecturer_id}</td>
            <td>${lecturer.lecturer_name}</td>
            <td>${lecturer.lecturer_gender == 1 ? 'Nam' : 'Nữ'}</td>
            <td>${lecturer.lecturer_date_of_birth ? lecturer.lecturer_date_of_birth.slice(0, 10) : ''}</td>
            <td>${lecturer.lecturer_home_town ? lecturer.lecturer_home_town : ''}</td>
            <td>${lecturer.lecturer_email ? lecturer.lecturer_email : ''}</td>
            <td>${lecturer.lecturer_phone_number ? lecturer.lecturer_phone_number : ''}</td>`,
        primaryKey: 'lecturer_id'
    });

    tblLecturer.createTbl('table-db-1', 'noAction');

    const checkBox = $(`input[data-id=${lecturerSelected}]`);
    checkBox.closest('tr').css('background-color', '#93bcdb');
    checkBox.attr('checked', 'checked');

    $('.table-db-1 input[type=checkbox]').attr('type', 'radio');
    const radioList = $('.table-db-1 input[type=radio]');
    radioList.each((index) => {
        $(radioList[index]).click(() => {
            $(`input[data-id=${lecturerSelected}]`).closest('tr').css('background-color', '');
            $(radioList[index]).closest('tr').css('background-color', '#93bcdb');
            $(radioList[index]).closest('tr').attr('checked', 'checked');
            lecturerSelected = $(radioList[index]).attr('data-id');
            refreshTblDb2();
            console.log(lecturerSelected);
        })
    });
    renderForm1();
}

function renderDb2(allStudent) {
    const tblStudent = new Table({
        headings: ['StudentID', 'Student name', 'Gender', 'Date of birth', 'Home town', 'Email', 'Phone number'],
        records: allStudent.recordset,
        page: 1,
        pageSize: 5,
        renderRecordFn: (student) => {
            getAllAssignments();

            if ($.inArray(student.student_id, studentArr) != -1 || $.inArray(student.student_id, listAllAssignment) == -1) {
                return `
                    <td>${student.student_id}</td>
                    <td>${student.student_name}</td>
                    <td>${student.student_gender == 1 ? 'Nam' : 'Nữ'}</td>
                    <td>${student.student_date_of_birth ? student.student_date_of_birth.slice(0, 10) : ''}</td>
                    <td>${student.student_home_town ? student.student_home_town : ''}</td>
                    <td>${student.student_email ? student.student_email : ''}</td>
                    <td>${student.student_phone_number ? student.student_phone_number : ''}</td>`
            }
            else return ''
        },
        primaryKey: 'student_id'
    });

    tblStudent.createTbl('table-db-2', 'noAction');



    studentArr.forEach((student_id) => {
        $(`.table-db-2 input[data-id=${student_id}]`).attr('checked', 'checked');
    });
    renderForm2();
}

function renderForm1() {
    const originUrl = window.location.origin;
    // const getApiSearchLecturer = originUrl + '/api/lecturer/search';
    // const searchForm = initSearchForm();
    // searchForm.createForm();
    // searchForm.search(getApiSearchLecturer, renderDb1);

    updateDatabase(initInsertForm(), initEditForm(), initConfirmDelete(),
        updateDatabaseToForm, deleteLecturer1,
        refreshTblDb1);
}

function renderForm2() {
    const originUrl = window.location.origin;
    // const getApiSearchLecturer = originUrl + '/api/lecturer/search';
    // const searchForm = initSearchForm();
    // searchForm.createForm();
    // searchForm.search(getApiSearchLecturer, renderDb2);

    updateDatabase(initInsertForm(), initEditForm(), initConfirmDelete(),
        updateDatabaseToForm, deleteStudent2,
        refreshTblDb2);
}

async function refreshTblDb1() {
    await getApi(getAllLecturer, renderDb1);
}

async function refreshTblDb2() {
    await getApi(getAllStudent, renderDb2);
}

async function deleteLecturer1(lecturer) {
    await getApi(getDeleteLecturer + lecturer, statusDelete);
    refreshTblDb1();
}

async function deleteStudent2(student) {
    await getApi(getDeleteStudent + student, statusDelete);
    refreshTblDb2();
}

function statusDelete() { }

function initSearchForm() {
    const contentSearchForm = `
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="courses">Course</label>
                    <select name="courses" class="form-control" id="courses">
                        <option value="1">2018-2019</option>
                        <option value="2">2019-2020</option>
                        <option value="3">2020-2021</option>
                        <option value="4">2021-2022</option>
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

    return new InsertForm('Thêm tài khoản', contentInsertForm);
}

async function updateDatabaseToForm(accountID) {
    await getApi(getByIDAccount + '/?account=' + accountID, function (accountObj) {
        const account = accountObj.recordset[0]
        const role_options = $('.float-form select[name=role] option');
        // $('.float-form select[name=role]').attr('readonly', true);
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
    const contentEditForm = `
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

    return new EditForm('Sửa tài khoản', contentEditForm);
}

function initConfirmDelete() {
    const contentConfirmDelete = `
        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
        <div>Bạn có chắc chắn muốn chuyển vào thùng rác không?</div>
    `;

    return new ConfirmDelete('Xác nhận', contentConfirmDelete);
}

function initSuccess() {
    const contentSuccess = `
        <i class="fa fa-check" aria-hidden="true"></i>
        <div>Phân công thành công</div>
    `;

    return new Success('Xác nhận', contentSuccess);
}

async function getApi2() {
    await getApi(getAllStudent, renderDb2);
}

export {getApi2}

export default async () => {

    await getApi(getAllLecturer, renderDb1);
    await getApi(getAllStudent, renderDb2);

    $('.btn-save').click(() => {
        const successNotification = initSuccess();
        successNotification.createFloatForm();
        $('.float-form__title').remove();
        $('.float-form__button').remove();
        successNotification.clickToClose();

        let assignmentLocalStorage = localStorage.getItem('assignmentStudentLecturer');
        if (assignmentLocalStorage) assignmentDb = JSON.parse(assignmentLocalStorage);
        studentArr = [];
        console.log(listAllAssignment)
        let checkBoxList = $(`input[name=selectRow-tbl-2]`);
        checkBoxList.each((index, checkBox) => {
            if ($(checkBox).is(':checked') == true) {
                studentArr.push($(checkBox).attr('data-id'));
            }
        });

        assignmentDb.forEach((assignment) => {
            if (assignment.lecturer_id == lecturerSelected) {
                assignment.list_id = studentArr;
            }
        });

        localStorage.setItem('assignmentStudentLecturer', JSON.stringify(assignmentDb));
    });
};