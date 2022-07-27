import dotenv from "dotenv";
dotenv.config({path: ".env"});

let ProductDao
let CarroDao
switch (process.env.DATABASE) {
    case "mongo":
        const { default: ProductDaoMongo } = await import("./mongo/productos.dao.js");
        const { default: CartMongo } = await import("./mongo/carritos.dao.js");
        ProductDao = new ProductDaoMongo;
        CarroDao =  new CartMongo;
       
        break;
    case "firebase":
        const { default: ProductDaoFirebase } = await import("./firebase/productos.daos.js");
        const { default: CartDaoFirebase } = await import("./firebase/carritos.daos.js");
        ProductDao = new ProductDaoFirebase;
        CarroDao = new CartDaoFirebase;
        break;
};

export { ProductDao, CarroDao };
