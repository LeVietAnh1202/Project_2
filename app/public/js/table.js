import pageNumber from "./page-number.js";

export default class Table {
    constructor (obj) {
        this.headings = obj.headings;
        this.records = obj.records;
        this.page = obj.page;
        this.pageSize = obj.pageSize;
        this.renderRecordFn = obj.renderRecordFn;
    }

    headingContent () {
        return this.headings.map(heading => `<th scope="col">${heading}</th>`).join('')
    }

    bodyContent() {
        let pageNumber = (this.page - 1) * this.pageSize;
        return this.records.map(record => 
            `<tr>
                <th scope="row"><input type="checkbox" name="selectRow" id="selectRow"></th>
                <td>${++pageNumber}</td>
                ${this.renderRecordFn(record)}
                <td><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td>
                <td><i class="fa fa-trash-o" data-id="1" aria-hidden="true"></i></td>
            </tr>`
        ).join('');
    }

    createTbl() {
        let thead = `
            <thead>
                <tr>
                    <th><input type="checkbox" name="selectAll" id="selectAll"></th>
                    <th scope="col">#</th>
                    ${this.headingContent()}
                    <th colspan="2">Tác vụ</th>
                </tr>
            </thead>
        `;

        let tbody = `
            <tbody>
                ${this.bodyContent()}
            </tbody>
        `;

        let tblDb = `
            <div class="table-db mt-4">
                <table class="table table-bordered table-hover table-responsive-md">
                    ${thead}
                    ${tbody}
                </table>
                <div class="page-number">
                    <p>Hiển thị bản ghi từ ${this.page} đến ${this.page - 1 + this.records.length} trên tổng số ${this.records.length}</p>
                    <ul>
                        <li class="disabled">Previous</li>
                        <li class="active">1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>Next</li>
                    </ul>
                </div>
            </div>
        `;
        $('.table-db').remove();
        $('.search').after(tblDb);

        pageNumber();
    }
};