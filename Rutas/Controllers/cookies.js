import session from "express-session"
import cookieParser from "cookie-parser";
const newUser =  async (req, res) => {
    try {
        
     res.render("userForm")

    } catch (error) {
        console.log(error);
    }
}

const result = async (req, res) => {
 
    if (req.session.user) {
    res.render("userForm", {welcome: req.session.user, user: true} );}
    
    else {
        res.render("userForm", {welcome: "", user: false} );
    }
}

const destroyUser = async (req, res) => {
 
    req.session.destroy((err)=>{
        if (err) {
            res.render("userForm", {welcome: "", user: false} );
        } else {
            
            res.render("log-out", {welcome: req.session.user, user:true} );
            
        }

 }
 );

}










export {newUser, result, destroyUser};