import util from "util"
import args from "../yargs.js" 
import {fork} from "child_process"
const info = {
Argumentos  : args, 
plataforma : process.platform ,
node: process.version ,
memoria : util.inspect(process.memoryUsage(), {showHidden: false, depth: null, color: true }) ,
path : process.execPath, 
id : process.pid,
carpeta: process.cwd()
}


const desafio = async (req, res) => {
res.render("desafios", {Arguments : info.Argumentos, platform: info.plataforma, node: info.node,   memory: info.memoria, path : info.path, id: info.id, carpeta: info.carpeta} )


}
const numbers = async (req, res) => {
let numbers1 = req.query.cant
let cant = fork("./Controllers/fork.js")
if(isNaN(numbers1)){

numbers1 = 100000000
}
 

cant.send(numbers1)
cant.on("message", numbers=>{
    res.json(numbers)
})
}





export {desafio, numbers}