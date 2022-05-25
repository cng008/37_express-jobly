const { BadRequestError } = require('../expressError');

/** sets up the variables needed for sql query
 * dataToUpdate is req.body
 * jsToSql is the "dictionary" object for translating camelCase to snake_case
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError('No data');

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(', '),
    values: Object.values(dataToUpdate) // return updated values as array
  };
}

module.exports = { sqlForPartialUpdate };
