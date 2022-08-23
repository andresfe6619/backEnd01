import util from "util"
import args from "../yargs.js" 

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



export default (desafio)