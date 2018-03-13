'use strict';

module.exports = function(Invoice) {
  /**
   * Generate Invoices for the month
   * @param {date} month Enter the date for which you want to generate the invoice
   * @param {string} member_id If you want to specify specific member invoice to generate
   * @param {Function(Error, array)} callback
   */

  Invoice.generate_invoice = function(month, member_id, callback) {

    var Member = Invoice.app.models.member;
    var Flat = Invoice.app.models.Flat;
    var Building = Invoice.app.models.Building;
    var Tax = Invoice.app.models.tax;
     //console.log('before member',Member)//  reference to Certificates Model;
     let area = 0, taxAmount = 0
     let buildingId =''
     Member.find({}).then(members=>{
       //console.log('member data', members);
       members.map(member=>{
         let memberTax = []
         var flatId = member.flat_id
         Flat.find({_id : flatId}).then(flats=>{
           flats.map(flat=>{
             area = flat.area
             //console.log('flat found is', flat, 'area', flat.area)
             buildingId = flat.building_id

             Tax.find({}).then(taxs=>{
               taxs.map(tax=>{
                 taxAmount = area * tax.rate
                 //console.log('tax data is', tax);
                 memberTax.push({'tax_Id':tax.id, 'amount': taxAmount })
                 console.log({'tax_Id':tax.id, 'amount': taxAmount })
               })
             })

           })



           // taxes is over
           console.log('tax caluclated is', memberTax);
         })
       })
     })

    Invoice.find()
    .then(invoices=>{
      callback(null, invoices);
    })
    .catch(err=>{
      callback(err)
    })

  };
};
