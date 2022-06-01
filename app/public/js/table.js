export default class Table {
    constructor (headings) {
        this.headings = headings;
    }

    headingContent () {
        return this.headings.map(heading => `<th scope="col">${heading}</th>`).join('')
    }

    bodyContent(allAccount, page, pageSize) {
        let pageNumber = (page - 1) * pageSize;
        return allAccount.map(account => 
            `<tr>
                <th scope="row"><input type="checkbox" name="selectRow" id="selectRow"></th>
                <td>${++pageNumber}</td>
                <td>${account.role_name}</td>
                <td>${account.account}</td>
                <td>${account.password}</td>
                <td>${account.avatar}</td>
                <td>${account.full_name}</td>
                <td>${account.gender == 1 ? 'Nam' : 'Nữ'}</td>
                <td><i class="fa fa-pencil-square-o" aria-hidden="true"></i></td>
                <td><i class="fa fa-trash-o" data-id="1" aria-hidden="true"></i></td>
            </tr>`
        ).join('');
    }

    createTbl(allAccount, page, pageSize) {
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
                ${this.bodyContent(allAccount, page, pageSize)}
            </tbody>
        `;

        let tblDb = `
            <div class="table-db mt-4">
                <table class="table table-bordered table-hover table-responsive-md">
                    ${thead}
                    ${tbody}
                </table>
                <div class="page-number">
                    <p>Hiển thị bản ghi từ 1 đến 10 trên tổng số 30</p>
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
    }
};