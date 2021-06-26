class Form {
    constructor(selector) {
        this.selector = selector;

        this.DOM = null;
        this.allInputsDOM = [];
        this.submitButtonDOM = null;

        this.init();
    }

    init() {
        if (!this.isValidSelector()) {
            console.error('ERROR: nepraejo pirmines patikros');
            return false;
        }

        this.DOM = document.querySelector(this.selector);
        if (!this.DOM) {
            console.error('ERROR: nerestas elementas, pagal duota selector');
            return false;
        }
        this.allInputsDOM = document.querySelectorAll('input, textarea')
        this.submitButtonDOM = document.querySelector('button')

        this.addEvents();
    }

    isValidSelector() {
        if (typeof this.selector !== 'string' ||
            this.selector === '') {
            return false;
        }
        return true;
    }
    isValidEmail(email) {
        if (typeof email !== 'string' ||
            email.length < 6 ||
            email.indexOf('@') === -1 ||
            email[0] === '@' ||
            email.slice(-4).indexOf('@') > -1) {
            return false;
        }
        return true;
    }

    countSimbols(text, letter) {
        let count = 0;

        for (const t of text) {
            if (t === letter) {
                count++;
            }
        }
        return count;
    }


    addEvents() {
        this.submitButtonDOM.addEventListener('click', (e) => {
            e.preventDefault();
            let allGood = true;
            for (let element of this.allInputsDOM) {
                const validdationRule = element.dataset.validation;

                if (validdationRule === 'email') {
                    if (this.isValidEmail(element.value) === false) {
                        allGood = false;
                        break;
                    }
                }
            }
            console.log('All Good?', allGood)
        })

    }
}

export { Form }


