class Select {
    constructor(el,obj) {
        this.el = el;

        // this.elsApi = obj.api;
        this.search = obj.search;

        this.nativeInnerSelect = this.#createCustomSelect();
        el.remove();

        // document.addEventListener('click',(e) => {
        //     this.#clickSelect(e.target.closest('.tselect__selection'));
        // });
        document.addEventListener('click',this.#clickSelect.bind(this));
    }
    #createStaticOptions(options) {
        let tpl = [];
        Array.from(this.el.querySelectorAll('option'),item => {
            !!item.innerHTML && tpl.push(`<li class="result-list__item" value="${item.value}">${item.innerHTML}</li>`);
        })
        this.nativeInnerSelect.querySelector('.result-list__list').innerHTML = tpl.join('');
    }
    #createCustomSelect() {
        const html = `
            <div class="tselect__inner">
                <div class="tselect__selection" data-id='select-${this.el.id}'>
                    <div class="tselect__placeholder">
                        <span class='tselect__text'>Введіть дані</span>
                    </div>
                </div>
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
            </div>
            `;
        let doc = new DOMParser().parseFromString(html,"text/html").body.firstChild;
        this.el.after(doc);
        return doc;
    }
    #clickSelect(e) {
        console.log(this);
        const selection = this.nativeInnerSelect.querySelector('.tselect__selection');
        this.#createStaticOptions();
        console.log(e.target, selection);
        if (e.target == selection || selection.contains(e.target)) this.nativeInnerSelect.classList.toggle('active');
        if (!this.nativeInnerSelect.contains(e.target)) this.nativeInnerSelect.classList.remove('active');

    }
}

const select = new Select(document.getElementById("js--shop"), {
    search: true
});

const select1 = new Select(document.getElementById("js--car"), {
    search: false
});