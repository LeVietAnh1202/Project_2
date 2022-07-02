import pageNumber from "./page-number.js";

export default class Table {
    numberStartPage = 0;
    constructor(obj) {
        this.headings = obj.headings;
        this.records = obj.records;
        this.page = obj.page;
        this.pageSize = obj.pageSize;
        this.renderRecordFn = obj.renderRecordFn;
        this.primaryKey = obj.primaryKey;
    }

    headingContent() {
        return this.headings.map(heading => `<th scope="col">${heading}</th>`).join('')
    }

    bodyContent(classTbl, hasAction) {
        // let pageNumber = (this.page - 1) * this.pageSize;

        return this.records.map(record => {
            const recordContent = this.renderRecordFn(record);
            if (recordContent != '') {
                return `<tr>
                    <th scope="row"><input type="checkbox" name="selectRow-tbl-${classTbl[classTbl.length-1]}" id="selectRow-tbl-${classTbl[classTbl.length-1]}" data-id="${record[this.primaryKey]}" /></th>
                    <td>${++this.numberStartPage}</td>
                    ${this.renderRecordFn(record)}
                    ${
                        hasAction == 'noAction' ? '' : `
                        <td><i class="fa fa-pencil-square-o" data-id="${record[this.primaryKey]}" aria-hidden="true"></i></td>
                        <td><i class="fa fa-trash-o" data-id="${record[this.primaryKey]}" aria-hidden="true"></i></td>
                        `
                    }   
                </tr>`
            }
        }
            
        ).join('');
    }

    createTbl(classTbl, hasAction) {
        let thead = `
            <thead>
                <tr>
                    <th><input type="checkbox" name="selectAll-tbl-${classTbl[classTbl.length-1]}" id="selectAll-tbl-${classTbl[classTbl.length-1]}"></th>
                    <th scope="col">#</th>
                    ${this.headingContent()}
                    ${hasAction == 'noAction' ? '' : '<th colspan="2">Action</th>'}
                </tr>
            </thead>
        `;

        let tbody = `
            <tbody>
                ${this.bodyContent(classTbl, hasAction)}
            </tbody>
        `;

        let tableForm = `
            <div class="${classTbl}">
                <table class="table table-bordered table-hover table-responsive-md">
                    ${thead}
                    ${tbody}
                </table>
                <div class="page-number page-number-${classTbl[classTbl.length-1]}">
                    <p>Hiển thị bản ghi từ ${this.page} đến ${this.numberStartPage} trên tổng số ${this.numberStartPage}</p>
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
        `
        // let tableForm = `
        //     <div class="${classTbl}">
        //         <table class="table table-bordered table-hover table-responsive-md">
        //             ${thead}
        //             ${tbody}
        //         </table>
        //         <div class="page-number page-number-${classTbl[classTbl.length-1]}">
        //             <p>Hiển thị bản ghi từ ${this.page} đến ${this.page - 1 + this.records.length} trên tổng số ${this.records.length}</p>
        //             <ul>
        //                 <li class="disabled">Previous</li>
        //                 <li class="active">1</li>
        //                 <li>2</li>
        //                 <li>3</li>
        //                 <li>4</li>
        //                 <li>5</li>
        //                 <li>Next</li>
        //             </ul>
        //         </div>
        //     </div>
        // `

        let tblDb;
        if (classTbl == 'table-db-1') {
            tblDb = `
                <div class="table-db mt-4">
                    ${tableForm}
                </div>
            `;
            $('.table-db').remove();
            $('.search').after(tblDb);
        }
        else {
            tblDb = tableForm;
            $('.table-db-2').remove();
            $('.table-db-1').after(tblDb);
            // $('.table-db').addClass('tbl-d-flex');
        }

        pageNumber(classTbl[classTbl.length-1]);
    }
};