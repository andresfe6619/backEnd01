import yargs from "yargs"
const xi = yargs(process.argv.slice(2))

const args = xi
.alias({
p: "port",
m : "mode"
})
.default ({
    port: 8080 ,
    mode : "fork"
}).argv;

const port = args.port
const mode = args.mode
console.log ( port, mode)
export  {port, mode}