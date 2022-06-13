import Table from "../table.js";
import getApi from "../util/getApi.js";
import updateDatabase from "../update-database.js";
import SearchForm from "../model/search-form.model.js";
import InsertForm from "../model/Insert-form.model.js";
import EditForm from "../model/edit-form.model.js";
import ConfirmDelete from "../model/confirm-delete.model.js";
import pageNumber from "../page-number.js";

const originUrl = window.location.origin;
const getAllAcount = originUrl + '/api/company/get-all';

// Lấy dữ liệu từ database và tạo sidebar

function renderFormAndDb(allCompany) {
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
            <td><a href="${company.company_website}">${company.company_website}</a></td>`
    });

    tblCompany.createTbl();
    // pageNumber();

    initSearchForm().createForm();

    updateDatabase(initInsertForm(), initEditForm(), initConfirmDelete());
}

function initSearchForm() {
    const contentSearchForm = `
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

    return new InsertForm('Thêm thông tin doanh nghiệp', contentInsertForm);
}

function initEditForm() {
    const contentEditForm = `
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

    return new EditForm('Sửa thông tin doanh nghiệp', contentEditForm);
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