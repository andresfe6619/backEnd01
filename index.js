

// class Usuario {
//     constructor(nome, apellido, nombre, autor) {
//         this.nome = nome;
//         this.apellido = apellido;
//         this.libros = [];
//         this.mascotas= [];
// }
// getFullName() {
//     return `${this.nome} ${this.apellido}`;
// }
// addMascota(mascota) {

//     this.mascotas.push(mascota);
// }
// countMascotas() {
//     return this.mascotas.length;
// }
// addLibro(nombre, autor) {
//   this.libros = [...this.libros, {nombre , autor} ];
// }
//  getBookNames() {
//    return this.libros.map(name => name.nombre);
// }

// }
// const usuario = new Usuario('Juan', 'Perez', [], []);




// usuario.addMascota('perro');
// usuario.addLibro("EL señor de los anillos",  "J.R.R. Tolkien");
// usuario.addLibro("El principito", "Antoine de Saint-Exupéry");
// usuario.addMascota("tortuga")

// console.log(usuario.getFullName());
// console.log(usuario);
// console.log(usuario.countMascotas());
// console.log(usuario.getBookNames());

// DESAFIO2

// const fs = require('fs');


// class Contenedor {
//     constructor( id) {
//         this.Product = [];
      
        
// }


// saveObject(object) {
//  
// let Ids  
// if (this.Product.length === 0) {
//     Ids = 1; 
    
// }
// else {
//     Ids = this.Product.length + 1;
// }

// const Objeto6= {...object, id: Ids};
// this.Product.push(Objeto6);
 
//  const guardar = async () => {
//  try{
//   await  fs.promises.writeFile("./contenedor.txt",JSON.stringify( this.Product ) )
//   console.log("Producto guardado");
//     } catch(error) {
//         console.log(error);
//     }
    
// }

// setTimeout(guardar, 3000);
// }
// getById(Id) {
    
    
//  const getId = async () => {  
//     try{
//      const data = JSON.parse(await  fs.promises.readFile("./contenedor.txt", "utf-8" ))
    
//      const product = data.find(product => product.id === Id);
//   console.log("Obteniendo por Id")  
//   return ( product ?  console.log( product): console.log("El producto no existe"));
     
// } catch(error) {
//               console.log(error);
//           }
//  }    
        
//   setTimeout(getId, 4000);
  



// }
// getAll(Id) {
    
    
//     const getDoc = async () => {  
//        try{
//         const data = JSON.parse(await  fs.promises.readFile("./contenedor.txt", "utf-8" ))
       
//       console.log("Obteniendo todos los productos")
//        return ( data ?  console.log( data): console.log("El archivo no existe o esta vacio"));
        
//    } catch(error) {
//                  console.log(error);
//              }
//     }    
           
//      setTimeout(getDoc, 5000);
// }
// deleteById(Id) {
    
    
//     const deleteId = async () => {  
//        try{
//         const data = JSON.parse(await  fs.promises.readFile("./contenedor.txt", "utf-8" ))
       
     
//        const product = data.find(product => product.id === Id);
//        const newData = data.filter(product => product.id !== Id);
//        fs.promises.writeFile("./contenedor.txt",JSON.stringify( newData ) )
//        console.log("Producto eliminado por id")
//        return ( product ?  console.log( product): console.log("El producto no existe"));
        
//    } catch(error) {
//                  console.log(error);
//              }
//     }    
           
//      setTimeout(deleteId, 6000);

// }
// deleteAll() {
    
    
//     const deleteAll = async () => {  
//        try{
//         const data = JSON.parse(await  fs.promises.readFile("./contenedor.txt", "utf-8" ))
       
     
//        const newData = [];
//        fs.promises.writeFile("./contenedor.txt",JSON.stringify( newData ) )
//        console.log("Todos los Productos han sido eliminados")  
//    } catch(error) {
//                  console.log(error);
//              }
//     }    
           
//      setTimeout(deleteAll, 7000);
// }}
// console.log("Añadiendo productos");
// const Objeto5 = new Contenedor([]);
// Objeto5.saveObject({title:"Proteina", price: 200, thumbnail:" https://www.protein.com/wp-content/uploads/2019/01/Protein-Logo-1.png" });
// Objeto5.saveObject  ({title:"Creatina", price: 100, thumbnail:" https://www.creatina.com/wp-content/uploads/2019/01/Creatina-Logo-1.png", });
// Objeto5.saveObject  ({title:"Pre-workout", price: 50,thumbnail:"https://www.pre-workout.com/wp-content/uploads/2019/01/Pre-Workout-Logo-1.png", });
// // const Objeto4 =  [Objeto1, Objeto2, Objeto3];



// // Objeto1.saveObject(0);
// // Objeto2.saveObject(Objeto1.id);
// // Objeto3.saveObject(Objeto2.id);


// //console.log(Objeto5.getById(1));
// console.log(Objeto5)
// Objeto5.getById(2)
// Objeto5.getAll()
// Objeto5.deleteById(3)
// Objeto5.deleteAll()
