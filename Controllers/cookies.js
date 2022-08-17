
const newUser =  async (req, res) => {
    try {
        
     res.render("userForm")

    } catch (error) {
        console.log(error);
    }
}

const result = async (req, res) => {
 req.session.user = req.body;
    if (req.session.user) {
    res.render("userForm", {welcome: req.session.user,message: "bienvenido", user: true} );}
    
    else {
        res.render("userForm", {welcome: "", user: false} );
    }
}

const destroyUser = async (req, res) => {
    res.render("log-out", {welcome: req.session.user,message: "Hasta luego"} ); 
    req.session.destroy((err)=>{
        if (err) {
           console.log(err)
        } else {
            
        console.log("exito")
    
            
        }} )

    }


const checkCookie = async (req, res, next) => { 
if (req.session.user) {
    next()}
else {
    res.redirect("/api/users/inicio")
}




}









export {newUser, result, destroyUser, checkCookie}









