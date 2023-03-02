const express = require("express");
const superhero_model = require("../models/superhero.model");
const superhero_routes_http = express.Router();

/*  Crear un nuevo superheroe
    mongoose method: save()
    http://localhost:5000/
*/

superhero_routes_http.post("/", (req, res) => {
    const new_superhero = superhero_model(req.body);
    new_superhero
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

/*  Listar todos los registros de la BD
    mongoose method: find ()*/
superhero_routes_http.get("/", (req, res) => {
    superhero_model
      .find()
      .then((data) => res.json(data))
      .catch((err) => res.json({message: err}));
});

/*  Consultar un usuario de forma especifica por el id
    http: get
    mongoose method: findById({_id: ?})
*/

superhero_routes_http.get("/:superheroId", (req, res) => {
    const { superheroId } = req.params;
    superhero_model
        .findById({ _id: superheroId })
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

module.exports = superhero_routes_http;

/* Modificar uno de los superheroes existentes 
   http: PUT
   mongoose method: updateOne
   */
superhero_routes_http.put("/:superheroId", (req, res) =>{
    const { superheroId } = req.params;
    const { superhero, universe, superpowers, address } = req.body;
    superhero_model
      .updateOne(
        { _id: superheroId},
        { $set: {superhero, universe, superpowers, address}}
      )
        .then((data) => res.json(data))
        .catch((err) => res.json({message: err}));
});

/* Eliminar uno de los superheroes existentes en la bd
   http: DELETE
   mongoose method: DELETE
*/
superhero_routes_http.delete("/:superheroId", (req, res) => {
    const { superheroId } = req.params;
    superhero_model
      .deleteOne({ _id: superheroId  })
      .then((data) => res.json(data))
      .catch((err) => res.json({message: err}));
});

/* 
    Elimina todas las coincidencias realizando la bísqieda por una propiedad en 
    http: DELETE
    mongoose method: deleteMany
*/
superhero_routes_http.delete("/", (rq,res) => {
    const query = { superhero: { $regex: "Verde"} };
    superhero_model
        .deleteMany(query)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err}));
});

