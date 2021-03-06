

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
const messageInput = document.querySelector('#messageInput')
const messagesPool = document.querySelector('#messagesPool')

function sendMessage(messageInfo) {
    socket.emit('client:message', messageInfo)
}
const fecha = Date()
console.log(fecha)
function renderMessages(messagesInfo) {
        
        const html = messagesInfo.map(msgInfo => {
            return(`<div>
                <strong id="EmailShow">${msgInfo.Email}</strong>:
                <em id="Date"> ${msgInfo.Date} </em>
                <em id="Message">${msgInfo.Message}</em> </div>
                `)
            }).join(" ");
       
        messagesPool.innerHTML = html;    
}

function submitHandler2 (event) {
    event.preventDefault()
    
    const messageInfo = { Email: Email.value, Message: messageInput.value,  Date: fecha }

    sendMessage(messageInfo)
}


messageForm.addEventListener('submit', submitHandler2)

socket.on('server:mensajes', renderMessages)