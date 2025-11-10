const activitiesList = require('../data/activities.json');
const departmentsList = require('../data/departments.json');
const municipalitiesList = require('../data/municipalities.json');
const distritsList = require('../data/districts.json');
const axios = require('axios');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const urlApi = process.env.URL_API;
const urlProd = process.env.URL_PROD;
const secretTest = process.env.SECRET_TEST;
const secretProd = process.env.SECRET_PROD;

const mainController = {
    homePage: (req, res) => {

      res.render('home', {
          title: 'Formulario Felsv',
          activities: activitiesList,
          departments: departmentsList,
          municipalities: municipalitiesList,
          districts: distritsList,
          data: {}, message: null
      });
    },

    register: async (req, res) => {
        try {

          let result = validationResult(req)

          if(result.isEmpty()){

            const formData = req.body;
            //console.log("Cliente", formData);
            // if(formData.ambient === 'Prueba'){
            //   await axios.post(urlApi, formData, {
            //     headers: {
            //       'Content-type': 'application/json; charset=UTF-8',
            //       'Authorization': `Bearer ${token}`,
            //     },
            //   });

            //   return res.redirect('/');
            // }
            if (formData.ambient === 'Prueba') {

              const token = jwt.sign(
                { user: 'registroManual', timestamp: Date.now() },
                secretTest,
                { expiresIn: '1d', algorithm: 'HS256' }
              );

              await axios.post(urlApi, formData, {
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8',
                  'Authorization': `Bearer ${token}`
                },
              });

              //return res.redirect('/');
              return res.render('home', {title: 'Formulario Felsv',
                    activities: activitiesList,
                    departments: departmentsList,
                    municipalities: municipalitiesList,
                    districts: distritsList,
                    data: req.body, message: 'Registrado correctamente' });
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
              const token = jwt.sign(
                { user: 'registroManual', timestamp: Date.now() },
                secretProd,
                { expiresIn: '1d', algorithm: 'HS256' }
              );

              await axios.post(urlProd, formData, {
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                  'Authorization': `Bearer ${token}`
                },
              });

              //return res.redirect('/');
              return res.render('home', {title: 'Formulario Felsv',
                    activities: activitiesList,
                    departments: departmentsList,
                    municipalities: municipalitiesList,
                    districts: distritsList,
                    data: req.body, message: 'Registrado correctamente' });
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