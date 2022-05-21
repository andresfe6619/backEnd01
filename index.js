

class Usuario {
    constructor(nome, apellido, nombre, autor) {
        this.nome = nome;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas= [];
}
getFullName() {
    return `${this.nome} ${this.apellido}`;
}
addMascota(mascota) {

    this.mascotas.push(mascota);
}
countMascotas() {
    return this.mascotas.length;
}
addLibro(nombre, autor) {
  this.libros = [...this.libros, {nombre , autor} ];
}
 getBookNames() {
   return this.libros.map(name => name.nombre);
}

}
const usuario = new Usuario('Juan', 'Perez', [], []);




usuario.addMascota('perro');
usuario.addLibro("EL señor de los anillos",  "J.R.R. Tolkien");
usuario.addLibro("El principito", "Antoine de Saint-Exupéry");
usuario.addMascota("tortuga")

console.log(usuario.getFullName());
console.log(usuario);
console.log(usuario.countMascotas());
console.log(usuario.getBookNames());


