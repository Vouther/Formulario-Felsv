const activitiesList = require('../data/activities.json');
const departmentsList = require('../data/departments.json');
const municipalitiesList = require('../data/municipalities.json');
const axios = require('axios');
const {validationResult} = require('express-validator');
const urlApi = process.env.URL_API;
const urlProd = process.env.URL_PROD;

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
            if(formData.ambient === 'Prueba'){
              await axios.post(urlApi, formData, {
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });

              return res.redirect('/');
            }
            else{
              // await axios.post(urlApi, formData, {
              //   headers: {
              //     'Content-type': 'application/json; charset=UTF-8',
              //   },
              // });

              // return res.redirect('/');
              // return res.status(200).json({
              //     old: req.body,
              //     message: 'Registrado correctamente',
              // })

              await axios.post(urlProd, formData, {
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              });

              return res.redirect('/');
            }

            // const { data } = await axios.post(urlApi, formData, {
            //   headers: {
            //     'Content-type': 'application/json; charset=UTF-8',
            //   },
            // });

            // console.log("Respuesta API:", data);

            // return res.status(200).json({
            //   message: "Formulario procesado correctamente",
            //   apiResponse: data,
            // });

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