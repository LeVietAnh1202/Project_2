import includeHTML from "./util/include-html.js";
import header, { updateUserInfor } from "./header.js";
import loadingScreen from "./loading-screen.js";
import sideBar_Fn from "./sidebar.js";
import student from "./student/student.js";
import { getApi2 } from "./assignment/assignment-lecturers.js";
import getApi from "./util/getApi.js";
import Table from "./table.js";
import route from "./router/sidebar.route.js";

const originUrl = window.location.origin;
const getAllStudent = originUrl + '/api/student/get-all';
let lecturerSelected;
let studentArr, listAllAssignment = [];

const account = localStorage.getItem('account');
    if (account) {
        lecturerSelected = JSON.parse(
            CryptoJS.AES.decrypt(account, 'SecretAdvmln')
                .toString(CryptoJS.enc.Utf8)
        ).account
    };

function signUpInternship() {
    includeHTML(async function () {
        header();
        route();
        $('.header__body').remove();
        // $('.header__body').html(`
        //     <ul>
        //         <li class="active job"><a href="/job">Việc làm</a></li>
        //         <li class="profile"><a href="/profile">Hồ sơ</a></li>
        //         <li class="company"><a href="/company-list">Công ty</a></li>
        //     </ul>
        // `);

        sideBar_Fn('?page_name=Internship student');
        $('.sidebar').hide();
        updateUserInfor();
        loadingScreen();

        $('.header__title').remove();
        $('.header__logo a').attr('href', '#');
        // await student();
        // $('.table-db-1').css('margin-bottom', '2rem');
        // $('.table-db-1 thead th:nth-last-child(2)').after('<th scope="row">Điểm</th>')
        // $('.table-db-1 tbody td:nth-last-child(3)').after('<th scope="row"></th>')
        // $('.table-db-1').removeClass('.table-db-1');
        // await getApi2();
        // $('.table-db-1').remove();
        await getApi(getAllStudent, renderDb2);
    });
}

signUpInternship();
let assignmentDb;
const assignmentDbLocalStorage = JSON.parse(localStorage.getItem('assignmentStudentLecturer'));
    if (assignmentDbLocalStorage) {
        assignmentDb = assignmentDbLocalStorage;
    }

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


function renderDb2(allStudent) {
    const tblStudent = new Table({
        headings: ['StudentID', 'Student name', 'Gender', 'Date of birth', 'Home town', 'Email', 'Phone number'],
        records: allStudent.recordset,
        page: 1,
        pageSize: 5,
        renderRecordFn: (student) => {
            getAllAssignments();

            if ($.inArray(student.student_id, studentArr) != -1) {
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

    tblStudent.createTbl('table-db-1', 'noAction');


    console.log(studentArr);
    studentArr.forEach((student_id) => {
        console.log(student_id);
        console.log($(`.table-db-1 input[data-id=${student_id}]`))
        $(`.table-db-1 input[data-id=${student_id}]`).attr('checked', 'checked');
    });

    // renderForm2();
}

