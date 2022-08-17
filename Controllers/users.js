function getRoot (req, res) {}
function getLogin(req, res) {
    if (req.isAuthenticated()) {
      var user = req.user;
      console.log("user logueado");
      res.render("userForm", {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      console.log("user NO logueado");
      res.render("userForm");
    }
  }
  
  function getSignup(req, res) {
    res.render("register");
  }
  
  function postLogin(req, res) {
    var userSes = req.user;
    if (userSes) {
        res.render("userForm", {welcome: userSes.username, message: "bienvenido", user: true} );}
        else {
            res.render("userForm", {welcome: "", user: false} );
        }
    }
 
    
  
  function postSignup(req, res) {
    var userSes = req.user;
    if (userSes) {
        res.render("register", {welcome: userSes.firstName , message: "has sido registrado", user: true} );}
        else {
            res.render("register", {welcome: "", user: false} );
        }
    }
 
    function checkAuthentication(req, res, next) {
        if (req.isAuthenticated()) {
          next();
        } else {
          res.redirect("/api/users/inicio");
        }
      }
  
  
  function getFaillogin(req, res) {
    console.log("error en login");
    res.render("fails", { message: "Error logueandose", user: true} );};
  
  
  function getFailsignup(req, res) {
    console.log("error en signup");
    res.render("fails", { message: "Error en el sign up", user: false} );
  }
  
  function getLogout(req, res) {
    req.session.destroy();
    res.render("logout");
 
}
  
  function failRoute(req, res) {
    res.status(404).render("Error");
  }
 function getDatos(req, res) {
    var userSes = req.user;
    console.log("usuario logueado");
    if (userSes) {
        res.render("userForm", {welcome:`nombre de usuario: ${userSes.username}` , message:`email : ${userSes.email}, `, user: true} );}
        else {
            res.render("userForm", {welcome: "", user: false} );
        }
    }



  export  {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    checkAuthentication,
    getDatos
};