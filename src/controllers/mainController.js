const activitiesList = require('../data/activities.json');
const departmentsList = require('../data/departments.json');
const municipalitiesList = require('../data/municipalities.json');
const axios = require('axios');

const mainController = {
    homePage: (req, res) => {
        res.render('home', {
            title: 'Formulario Felsv',
            activities: activitiesList,
            departments: departmentsList,
            municipalities: municipalitiesList
        });
    },

    register: async (req, res) => {
        try {
          const formData = req.body;
          console.log("Cliente", formData);

          // const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', formData, {
          //   headers: {
          //     'Content-type': 'application/json; charset=UTF-8',
          //   },
          // });

          // console.log("Respuesta API:", data);

          // return res.status(200).json({
          //   message: "Formulario procesado correctamente",
          //   apiResponse: data,
          // });
          return res.redirect('/');
        } catch (error) {
          console.log("Error al consumir la API:", error.message);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
      },
}

module.exports = mainController;