const activitiesList = require('../data/activities.json');
const departmentsList = require('../data/departments.json');
const municipalitiesList = require('../data/municipalities.json');
const axios = require('axios');
const {validationResult} = require('express-validator');

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

          let result = validationResult(req)

          if(result.isEmpty()){

            const formData = req.body;
            //console.log("Cliente", formData);

            await axios.post('https://n8n.tst.consiti.com/webhook-test/b1d239c0-bb94-4034-aa35-647f56a74cd4', formData, {
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            });

            // const { data } = await axios.post('https://n8n.tst.consiti.com/webhook-test/formulario', formData, {
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

          } else{

              return res.status(404).json({
                  old: req.body,
                  error: result.mapped()
              })
          }

        } catch (error) {
          console.log("Error al consumir la API:", error.message);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
      },
}

module.exports = mainController;