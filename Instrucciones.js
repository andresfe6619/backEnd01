use  ecommerce

db.createCollection("productos")
db.productos.insertMany([{title:"lapicero", price:2200,thumbnail :"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es unlapicero de tinta negra",stock:2,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096},{title:"lapicero azul",price:3700,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock: 2,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096},
{title:"lapicero rojo",price:2650,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock:2,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096},{title:"lapiz","price":1200,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock:2,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096},
{title:"portaminas",price:4020,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock:2 ,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096},{title:"colores","price":2500,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock:2,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096},
{title:"borrador",price:3520,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock:2 ,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096},{title:"corrector","price":5000,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock:2,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096},
{title:"minas",price:2560,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock:2 ,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096},{title:"lapicero verde","price":2050,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock:2,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096} ])

db.createCollection("mensajes")

db.mensajes.insertMany([{Email:"andresfe6619@gmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "Hola!"},{Email:"Batman@hotmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "Hola!"},
{Email:"andresfe6619@gmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "como estas?" }, {Email:"Batman@hotmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "bien y tu?"},
{Email:"andresfe6619@gmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "me alegroo" },{Email:"andresfe6619@gmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "muy bien" },
{Email:"andresfe6619@gmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "y que haces?" },{Email:"Batman@hotmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "nada y tu?"},
{Email:"andresfe6619@gmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "adios" },{Email:"Batman@hotmail.com",timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",message: "adios"} ])

db.productos.find()
db.mensajes.find()
db.productos.count()
db.mensajes.count()

db.productos.insert({title:"lapicero morado",price:970,thumbnail:"https://http2.mlstatic.com/D_NQ_NP_710626-MCO49733813007_042022-O.webp",descrip:"es un lapicero de tinta negra",stock:2,timeStamp:"Wed Jul 06 2022 22:28:24 GMT-0500 (hora estándar de Colombia)",code:870096})
db.productos.find({price: {$lt:1000}})
db.productos.find({$and: [{price: {$lte:3000}},{price: {$gte:1000}}]})
db.productos.find({price: {$gt : 3000}})
db.productos.find().sort({price:1}).limit(1).skip(2)
db.productos.updateMany({code:870096 }, {$set : {stock:100}})
db.productos.updateMany({price:{$gte: 4000}}, {$set : {stock:0}})
db.productos.deleteMany({price: {$lt:1000}})


use admin
db.createUser({user: "pepe", pwd: "asd456", roles: [{ role: "read", db: "ecommerce" } ]})
