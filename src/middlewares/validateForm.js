// validations/registerValidation.js
const { body } = require('express-validator');

module.exports = [
  // Ambiente: debe ser 'prueba' o 'produccion'
  body('ambient')
    .notEmpty().withMessage('El ambiente es requerido')
    .isIn(['Prueba', 'Produccion']).withMessage('El ambiente debe ser "prueba" o "produccion"'),

  // Ocupación
  body('occupation')
    .notEmpty().withMessage('La ocupación es requerida'),

  // Email
  body('email')
    .notEmpty().withMessage('El correo electrónico es requerido')
    .isEmail().withMessage('Debe ser un correo electrónico válido'),

  // Complemento (Dirección)
  body('complement')
    .notEmpty().withMessage('La dirección es requerida'),

  // Departamento
  body('department')
    .notEmpty().withMessage('El departamento es requerido')
    .isNumeric().withMessage('El departamento debe ser numérico'),

  // Municipio
  body('municipality')
    .notEmpty().withMessage('El municipio es requerido')
    .isNumeric().withMessage('El municipio debe ser numérico'),

  // Clave pública
  body('public_key')
    .notEmpty().withMessage('La clave pública es requerida'),

  // Clave privada
  body('private_key')
    .notEmpty().withMessage('La clave privada es requerida'),

  // API Key
  body('api_key')
    .notEmpty().withMessage('La API Key es requerida'),

  // NIT
  body('nit')
    .notEmpty().withMessage('El NIT es requerido'),

  // Nombre comercial
  body('trade_name')
    .notEmpty().withMessage('El nombre comercial es requerido'),

  // Nombre de usuario
  body('username')
    .notEmpty().withMessage('El nombre de usuario es requerido')
    .isLength({ min: 4 }).withMessage('El nombre de usuario debe tener al menos 4 caracteres'),

  // Contraseña
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  // NRC
  body('nrc')
    .notEmpty().withMessage('El NRC es requerido')
    .isNumeric().withMessage('El NRC debe ser numérico'),

  // Teléfono
  body('phone')
    .notEmpty().withMessage('El teléfono es requerido'),

  // Razón social / nombre de la empresa
  body('company_name')
    .notEmpty().withMessage('La razón social es requerida'),
];
