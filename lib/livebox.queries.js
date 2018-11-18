module.exports = {
  // Get all rows of a table
  deleteBox: `DELETE FROM box WHERE box.boxtype = 
    (SELECT id FROM boxtype WHERE uuid ='451a8766-407b-43ca-b1d4-2f2787ef4f6b');`, 

  // Pass a filter criteria
  getBoxTypeId: `SELECT id
    FROM boxtype
    WHERE uuid = '451a8766-407b-43ca-b1d4-2f2787ef4f6b';`,

  deleteBoxType: `DELETE FROM boxtype WHERE
    uuid = '451a8766-407b-43ca-b1d4-2f2787ef4f6b'`

}