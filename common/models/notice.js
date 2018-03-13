'use strict';

module.exports = function(Notice) {

  /**
   * notice issued to the member of the society
   * @param {Function(Error, array)} callback
   */

  Notice.public_notice = function(callback) {
/*
Notice.getDataSource().connector.connect(function (err, db) {
          var collection = db.collection('notice'); //execute raw mongoDb query on collection
   //now you can write native mongoDb query
})
*/

    Notice.find( { where: { "status" : "Show"},
             order: ["date DESC","serial_no ASC"]
          },
          function(err, result) {
               callback(null, result);
       });
  }
};
