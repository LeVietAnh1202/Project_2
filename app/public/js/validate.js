export default class Validate {
    constructor(formName, obj) {
        this.formName = formName;
        this.rules = obj.rules;
        this.message = obj.message;
    }

    printf() {
        console.log(this.rules["user"]);
        console.log(this.message["user"]);
    }

    submit() {
        const formName = `form[name='${this.formName}']`;
        const form = $(formName);

        form.submit((e) => {
            const idInput = $(`${formName} #id-doanh-nghiep`);
            if(idInput.val().length == 0 && this.rules.user.required == true)
                return false;
            // else {
                
            // }
        });
    }
};