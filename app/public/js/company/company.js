import Table from "../table.js";
import getApi from "../util/getApi.js";
import updateDatabase from "../update-database.js";
import SearchForm from "../model/search-form.model.js";
import InsertForm from "../model/insert-form.model.js";
import EditForm from "../model/edit-form.model.js";
import ConfirmDelete from "../model/confirm-delete.model.js";
import pageNumber from "../page-number.js";

const originUrl = window.location.origin;
const getAllAcount = originUrl + '/api/company/get-all';
const getByIDCompany = originUrl + '/api/company/get-by-id';
const getDeleteCompany = originUrl + '/api/company/delete';
const postCreateCompany = originUrl + '/api/company/create';
let postUpdateCompany = originUrl + '/api/company/update';

// Lấy dữ liệu từ database và tạo sidebar

function renderDb(allCompany) {
    console.log(allCompany);
    const tblCompany = new Table({
        headings: ['Company ID', 'Company name', 'Founding date', 'Type', 'Website'],
        records: allCompany.recordset,
        page: 1,
        pageSize: 5,
        renderRecordFn: (company) => `
            <td>${company.company_id}</td>
            <td>${company.company_name}</td>
            <td>${company.company_found_date.substr(0, 10)}</td>
            <td>${company.company_type}</td>
            <td><a href="${company.company_website}">${company.company_website}</a></td>`,
        primaryKey: 'company_id',
    });

    tblCompany.createTbl('table-db-1');
    renderForm();
}

function renderForm() {
    const originUrl = window.location.origin;
    const getApiSearchCompany = originUrl + '/api/company/search';
    const searchForm = initSearchForm();
    searchForm.createForm();
    searchForm.search(getApiSearchCompany, renderDb);

    updateDatabase(initInsertForm(), initEditForm(), initConfirmDelete(),
        updateDatabaseToForm, deleteAccount,
        refreshTblDb);
}

async function refreshTblDb() {
    await getApi(getAllAcount, renderDb);
}

async function deleteAccount(account) {
    await getApi(deleteAcount + '?account=' + account, statusDelete);
    refreshTblDb();
}

function statusDelete() { }

function initSearchForm() {
    const contentSearchForm = `
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="company-id">Mã viết tắt DN</label>
                <input type="text" class="form-control" name="company_id" id="company-id" placeholder="FPT">
            </div>
            <div class="col-md-4 mb-4">
                <label for="company-name">Tên doanh nghiệp</label>
                <input type="text" class="form-control" name="company_name" id="company-name"
                    placeholder="Công ty Cổ phần Viễn thông FPT">
            </div>
            <div class="col-md-4 mb-4">
                <label for="company-found-date">Ngày thành lập</label>
                <input type="date" class="form-control" name="company_found_date" id="company-found-date">
            </div>
        </div>
        <div class="form-row">
            <div class="col-md-4 mb-4">
                <label for="company-type">Loại hình</label>
                <input type="text" class="form-control" name="company_type" id="company-type" placeholder="Công ty phần mềm">
            </div>
            <div class="col-md-4 mb-4">
                <label for="company-website">Website</label>
                <input type="text" class="form-control" name="company_website" id="company-website">
            </div>
        </div>
    `;

    return new SearchForm({
        content: contentSearchForm
    })
}

function initInsertForm() {
    const contentInsertForm = `
        <div class="pt-4">
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="company-id">Mã viết tắt DN</label>
                    <input type="text" class="form-control" name="company_id" id="company-id" placeholder="FPT" required>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="company-name">Tên doanh nghiệp</label>
                    <input type="text" class="form-control" name="company_name" id="company-name"
                        placeholder="Công ty Cổ phần Viễn thông FPT" required>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="company-found-date">Ngày thành lập</label>
                    <input type="date" class="form-control" name="company_found_date" id="company-found-date" required>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="company-type">Loại hình</label>
                    <input type="text" class="form-control" name="company_type" id="company-type" placeholder="Công ty phần mềm" required>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="company-website">Website</label>
                    <input type="text" class="form-control" name="company_website" id="company-website">
                </div>
            </div>
        </div>
    `;

    return new InsertForm('Thêm thông tin doanh nghiệp', contentInsertForm, postCreateCompany);
}

async function updateDatabaseToForm(company_id) {
    await getApi(getByIDCompany + '/?company_id=' + company_id, function (companyObj) {
        const company = companyObj.recordset[0]
        $('.float-form input[name=company_id]').val(company.company_id);
        $('.float-form input[name=company_id]').prop('readonly', true);
        $('.float-form input[name=company_name]').val(company.company_name);
        $('.float-form input[name=company_found_date]').val(company.company_found_date.slice(0, 10));
        $('.float-form input[name=company_type]').val(company.company_type);
        $('.float-form input[name=company_website]').val(company.company_website);
    });
}

function initEditForm() {
    const contentEditForm = `
        <div class="pt-4">
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="company-id">Mã viết tắt DN</label>
                    <input type="text" class="form-control" name="company_id" id="company-id" placeholder="FPT" required>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="company-name">Tên doanh nghiệp</label>
                    <input type="text" class="form-control" name="company_name" id="company-name"
                        placeholder="Công ty Cổ phần Viễn thông FPT" required>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="company-found-date">Ngày thành lập</label>
                    <input type="date" class="form-control" name="company_found_date" id="company-found-date" required>
                </div>
            </div>
            <div class="form-row">
                <div class="col-md-4 mb-4">
                    <label for="company-type">Loại hình</label>
                    <input type="text" class="form-control" name="company_type" id="company-type" placeholder="Công ty phần mềm" required>
                </div>
                <div class="col-md-4 mb-4">
                    <label for="company-website">Website</label>
                    <input type="text" class="form-control" name="company_website" id="company-website">
                </div>
            </div>
        </div>
    `;

    return new EditForm('Sửa thông tin doanh nghiệp', contentEditForm, postUpdateCompany);
}

function initConfirmDelete() {
    const contentConfirmDelete = `
        <i class="fa fa-question-circle-o" aria-hidden="true"></i>
        <div>Bạn có chắc chắn muốn chuyển vào thùng rác không?</div>
    `;

    return new ConfirmDelete('Xác nhận', contentConfirmDelete, getDeleteCompany);
}

export default async () => {
    await getApi(getAllAcount, renderDb);
};