

const socket = io();

// TABLA DE PRODUCTOS

const  Add = document.querySelector("#Add") 
const  InputTitle = document.querySelector("#exampleInputEmail1")
const  InputPrice = document.querySelector("#exampleInputPassword1")
const  InputThumbnail = document.querySelector("#exampleInputPassword2")
 



function NewProduct(product) {
    socket.emit("client: new product", product)
}

async function renderProducts(products) {    
     await fetch("./productos.hbs").then((
     response) => {   
        response.text().then((plantilla) => {
     document.querySelector("#productos1").innerHTML = " "
    
     products.forEach((product) => {
        const template =  Handlebars.compile(plantilla)
        const html =  template(product)
        document.querySelector("#productos1").innerHTML += html})})
    })
}

function submitHandler (e) {
    e.preventDefault()
    const product = {
        title: InputTitle.value,
        price: InputPrice.value,
        thumbnail: InputThumbnail.value
    }
    NewProduct(product)
}


Add.addEventListener("submit", submitHandler)

socket.on("server: productos", renderProducts)


//CHAT


const messageForm = document.querySelector('#messageForm')
const Email = document.querySelector('#Email')
const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const edad = document.querySelector('#edad')
const alias = document.querySelector('#alias')
const avatar = document.querySelector('#avatar')
const messageInput = document.querySelector('#messageInput')

const messagesPool = document.querySelector('#messagesPool')

function sendMessage(author) {
    
    socket.emit('client:message', author)
}
const fecha = Date()
console.log(fecha)
function renderMessages(messagesInfo) {
        
        const html = messagesInfo.map(author1 => {
            return(`<div>
                <strong id="EmailShow">${author1.author.id}</strong>:
                <p id="date">${fecha}</p>
                <img id="avatar" src=${author1.author.avatar}/>
                <em id="Message">${author1.Message}</em> </div>
                
                `)
            }).join(" ");
       
        messagesPool.innerHTML = html;    
}

function submitHandler2 (event) {
    event.preventDefault()
    
    const author1 = {id : Email ,nombre: nombre , apellido: apellido , edad : edad, alias:alias , avatar:avatar, Message : messageInput.value}

    sendMessage(author1)
}  


messageForm.addEventListener('submit', submitHandler2)

socket.on('server:mensajes', renderMessages)

// porcentajes

    socket.on("server:porcentajes", Number => {
        console.log(Number)
        document.querySelector("#porcentaje").innerHTML = Number
       
    })
    