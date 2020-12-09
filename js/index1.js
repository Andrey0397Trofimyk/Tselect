class Select {
    constructor(el,obj) {
        this.el = el;

        // this.elsApi = obj.api;
        this.search = obj.search;

        this.nativeSelect = this.#createSelect();
        // this.#createDropdownInner();
        el.remove();

        document.addEventListener('click',(e) => {
            this.#clickSelect(e.target.closest('.tselect__selection'));
        });
        document.querySelector('.tselect__field') && document.querySelector('.tselect__field').addEventListener('click',function(e) {
            console.log(1);
            // this.#checkOptions(e.target.value);
        })
    }
    #createStaticOptions(options) {
        let tpl = [];
        Array.from(this.el.querySelectorAll('option'),item => {
            !!item.innerHTML && tpl.push(`<li class="result-list__item" value="${item.value}">${item.innerHTML}</li>`);
        })
        document.querySelector('.result-list__list').innerHTML = tpl.join('');
    }
    #createSelect() {
        const html = `
            <div class="tselect__selection" data-id='select-${this.el.id}'>
                <div class="tselect__placeholder">
                    <span class='tselect__text'>Введіть дані</span>
                </div>
            </div>
            `;
        let doc = new DOMParser().parseFromString(html,"text/html").body.firstChild;
        this.el.after(doc);
        return doc;
    }
    #createDropdownContainer() {
        const container =  document.querySelector('.tselect__container');
        !!container && container.remove();
        const html = `   
            <div class="tselect__container">
                <div class="tselect__dropdown">
                    <div class="tselect__search ${this.search ? 'active' : ''}">
                        <input type="text" class="tselect__field">
                    </div>
                    <div class="tselect__results result-list">
                        <ul class='result-list__list'>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        let doc = new DOMParser().parseFromString(html,"text/html").body.firstChild;
        document.body.after(doc);
        this.#createStaticOptions();
        // return doc;
    }
    #createDropdownInner() {
        const html = `<div class="tselect__container"></div>`;
        let doc = new DOMParser().parseFromString(html,"text/html").body.firstChild;
        document.body.after(doc);
    }
    #clickSelect(e) {
        let nativeContainer = document.querySelector('.tselect__container');
        Array.from(document.querySelectorAll('.tselect__selection'), item => {
            item != e && item.classList.remove('active');
        })
        if(this.nativeSelect.contains(e)) {
            e.classList.toggle('active'); 
            !e.classList.contains('active') ? nativeContainer.remove() : this.#createDropdownContainer();
        }   
    }
    #checkOptions(value) {
        console.log(value);
    }
}

const select = new Select(document.getElementById("js--shop"), {
    search: true
});

const select1 = new Select(document.getElementById("js--car"), {
    search: false
});