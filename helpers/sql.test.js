const { BadRequestError } = require('../expressError');
const { sqlForPartialUpdate } = require('./sql');

const noData = {};

describe('partially update user', function () {
  const dataToUpdate = {
    firstName: 'first',
    lastName: 'last',
    email: 'test@test.com'
  };
  const jsToSql = {
    firstName: 'first_name',
    lastName: 'last_name',
    isAdmin: 'is_admin'
  };

  test('returns object with user data used for SQL query', function () {
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    expect(result).toEqual({
      setCols: '"first_name"=$1, "last_name"=$2, "email"=$3',
      values: ['first', 'last', 'test@test.com']
    });
  });

  test('no data passed in', function () {
    try {
      sqlForPartialUpdate(noData, jsToSql);
    } catch (err) {
      expect(err instanceof BadRequestError);
    }
  });
});

describe('partially update company', function () {
  const dataToUpdate = {
    name: 'Apple',
    numEmployees: '1111'
  };
  const jsToSql = {
    numEmployees: 'num_employees',
    logoUrl: 'logo_url'
  };

  test('returns object with company data used for SQL query', function () {
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    expect(result).toEqual({
      setCols: '"name"=$1, "num_employees"=$2',
      values: ['Apple', '1111']
    });
  });

  test('no data passed in', function () {
    try {
      const result = sqlForPartialUpdate(noData, jsToSql);
      expect(result).toEqual('No data');
    } catch (err) {
      expect(err instanceof BadRequestError);
    }
  });
});
