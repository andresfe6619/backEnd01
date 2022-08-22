import yargs from "yargs"
const xi = yargs(process.argv.slice(2))

const args = xi
.alias({
p: "port"
})
.default ({
    port: 8080
}).argv;



export default (args.port)