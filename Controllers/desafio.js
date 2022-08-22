import util from "util"
import args from "../yargs.js" 

const info = {
Argumentos  : args, 
plataforma : process.platform ,
node: process.version ,
memoria :process.memoryUsage() ,
path : process.execPath, 
id : process.pid,
carpeta: process.cwd()
}
console.log(info)


export default (info)