    import { Component } from '../core/component'
    import { Form } from '../core/form'
    import { Validators } from '../core/validators'
    import { apiService } from '../services/api.service'

    export class CreateComponent extends Component {
        constructor(id) {
            super(id)

        
        }

        init() {
            const value = this.$el.querySelector('#create')
            this.$el.addEventListener('submit', submitHandler.bind(this))

            this.form = new Form(this.$el, {
                author: [Validators.required],
                fulltext: [Validators.required, Validators.minLength(5)]
            })
        }
    }

    async function submitHandler(event) {
        event.preventDefault()

                if (this.form.isValid()) {
                    const formData = {
                        //type: this.$el.author.value, /*type: this.$el.ЗНАЧЕНИЕ.value, */
                        date: new Date().toLocaleDateString(),
                        ...this.form.value()
                }
                // console.log('Submit', formData)

                await apiService.createPost(formData)
                    this.form.clear()
                    alert('Запись создана в базе данных')
            } 

    
        

    }

    document.querySelector('#load').addEventListener('click', load)


    class TransformService {
    static fbObjectToArray(fbData) {
        return Object.keys(fbData).map(key => {
            const item = fbData[key]
            item.id = key
            return item
        })
    }
    }

    function load() {
    
    document.querySelector('#posts').innerHTML = "";
    document.querySelector('#content').innerHTML = ""; 
    document.querySelector('#buttons').innerHTML = ""; 
    createPagination()
    fetch('https://dsskz-423bc-default-rtdb.firebaseio.com/posts.json')
        .then(res => res.json())
        .then((fbData) => {

    const posts = TransformService.fbObjectToArray(fbData)
    const html = posts.map(post => renderPost(post))


    }).catch(err => console.error(err));

    }

    function renderPost(post, options = {}) {

    return `
        <div class="panel">
        <div class="panel-head">
            <p class="panel-title">${post.author}</p>
            
        </div>
        <div class="panel-body">
            <p class="multi-line">${post.fulltext}</p>
        </div>
        <div class="panel-body">
        <p class="multi-line">${post.id}</p>
        </div>
        <div class="panel-body">
        <p class="multi-line">${post.date}</p>
    </div>
        </div>
    `
    }


    let data = []
    const onPage = 2
    const content = document.querySelector('#content')


    function createPagination() {

    fetch(' https://dsskz-423bc-default-rtdb.firebaseio.com/posts.json ')
    .then(d => d.json())
    .then(d => {
    data = TransformService.fbObjectToArray(d)
    
    })


    const buttons = document.querySelector('#buttons')
    for(let i = 0; i < Math.ceil(data.length / onPage); i++ ) {
        buttons.innerHTML += `<button class="btn-pag" data-from=${i * onPage} data-to=${i * onPage + onPage}>${i + 1}</button>`
    }
    }

    document.body.addEventListener('click', e => {
    if (!e.target.matches('.btn-pag')) return
    content.innerHTML = ''
    
    const from = e.target.dataset.from
    const to = e.target.dataset.to
    const sliced = data.slice(from, to)
    
    for(let i = 0; i < sliced.length; i++) {
        content.innerHTML += `
        <div class="panel">
        <div class="panel-head">
            <p class="panel-title"><b>Автор:</b> ${sliced[i].author}</p>
            
        </div>
        <div class="panel-body">
            <p class="multi-line"><b>Текст:</b> ${sliced[i].fulltext}</p>
        </div>
        <div class="panel-body">
        <p class="multi-line"><b>Дата:</b> ${sliced[i].date}</p>
    </div>
        </div>
        `}
    })


    let call = '0506 06132020 9 474000 257257 10'
    let mySplits = call.split(" "); 
    let min = mySplits[0].slice(0, 2)
    let sec = mySplits[0].slice(2, 4)


    let callOb = {duration: (min * 60) + +sec,
    startDate: new Date(mySplits[1].slice(4,8), +mySplits[1].slice(0,2), +mySplits[1].slice(2,4)),
    accessCode: +mySplits[2],
    dialedNumber: mySplits[3],
    chargedNumber: mySplits[4],
    timeInQueue: +mySplits[5]
    };
    console.log(callOb);