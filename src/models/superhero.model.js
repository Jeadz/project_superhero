const mongoose = require("mongoose");
const superhero_schema = mongoose.Schema({
    /* Nombre, universo, superpoderes y la dirección */
        superhero: { type: String, require: true },
        universe: { type: String, require: true },
        superpowers: { type: Array, require: true},
        address: {
            type: Object,
            require: true,
            city: { type: String, require: true},
            code_zip: { type: String, require: true},
        },
});
module.exports = mongoose.model("SuperheroCollection", superhero_schema);
