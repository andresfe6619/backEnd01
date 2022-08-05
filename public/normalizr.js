import { deleteApp } from "firebase-admin/app";
import {normalize, schema, denormalize} from "normalizr"

import  util from "util"


function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

function normalizeM(mensajes) {
  
    const author = new schema.Entity("author");

  const mensaje = new schema.Entity(
    "mensaje",
    { author: author },
    
  );

  const schemaMensajes = new schema.Entity(
    "mensajes",
    {
      mensajes: [mensaje],
    }
  );

  const normalizedPost = normalize(
    { id: "mensajes", mensajes },
    schemaMensajes
  );

   
   print(normalizedPost);
  return normalizedPost;}

function denormalizeM(recibido) {
    const author = new schema.Entity(
        "author"
    );  
    
    
    
    const mensaje = new schema.Entity(
        "mensaje",
        { author: author },
        
      );
    
      const schemaMensajes = new schema.Entity(
        "mensajes",
        {
          mensajes: [mensaje],
        }
      );
    
     
    const denormalized = denormalize(
        recibido.result,
        schemaMensajes,
        recibido.entities
    );


  

   
    const mensajesDenormalizados = denormalized.mensajes.map(mensaje => mensaje._doc)

    return { mensajesDenormalizados };
}

export  {normalizeM, denormalizeM};