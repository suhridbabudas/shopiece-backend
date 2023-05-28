/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
    'GET /':'home/index',
    'GET /user/getuserprofile': 'user/getuserprofile',
    'GET /user/confirm': 'user/confirm',
    'GET /products/getproducts': 'products/getproducts',
    'GET /products/getproductsdetails/:id': 'products/getproductsdetails',
    'GET /products/getproducttype': 'products/getproducttype',
    'GET /products/getproductsubtype': 'products/getproductsubtype',
    'POST /user/register': 'user/register',
    'POST /user/login': 'user/login',
    'POST /user/forgotpassword': 'user/forgotpassword',
    'POST /user/resetpassword': 'user/resetpassword',
    'PUT /user/logout': 'user/logout',
    'PUT /user/updateprofile': 'user/updateprofile',

};
