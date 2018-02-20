/*
Author: Gokturk Enez
Mail: hi@gokturkenez.com.tr
Description: PayU Turkey IRN API Node JS Sample Code
*/

var EndPointURL = 'https://secure.payu.com.tr/order/irn.php';
SecretKey = 'SECRET_KEY';

var moment = require('moment');
date = moment.utc().format('YYYY-MM-DD HH:mm:ss').toString();

var array = {
    'MERCHANT' : "OPU_TEST",
    'ORDER_REF' : "41838239",
    'ORDER_AMOUNT' : "10.90",
    'ORDER_CURRENCY' : 'TRY',
    'IRN_DATE' : date,
    'AMOUNT': "10.90"

};

hashstring = '';

for (var k in array) {
    hashstring += array[k].length + array[k] ;
}
var hash = require('crypto')
    , data = hashstring
    , secretkey = SecretKey;

signature = hash.createHmac('md5', secretkey).update(data).digest('hex');
array['ORDER_HASH'] = signature;

var request = require("request");
request.post(EndPointURL, {form:array}, function(error, response, body) {
    console.log(body);

});
