const ex = require('../examples');
const db = require('../db');
const mail = require('../mail');
const each = require("jest-each").default;

// describe('our first test', () => {
//   it('should succeed', () => {
//     expect(1).toBe(1)
//   });
//   it('should fail', () => {
//     throw new Error('failing test')
//   });
// });

describe('absolute', () => {
  it('should return positive number if input is positive', () => {
    // Arrange
    const input = 1;
    // Act
    const result = ex.absolute(input);
    // Assert
    expect(result).toBe(input);
  });

  it('should return positive number if input is negative', () => {
    const input = -1;
    const result = ex.absolute(input);
    expect(result).toBe(-input);
  });

  it('should return zero if input is zero', () => {
    const input = 0;
    const result = ex.absolute(input);
    expect(result).toBe(input);
  });

});
//Hierna refactoring en de code in absolute aanpassen met ?. Testen moeten blijven runnen

describe("absolute parameterized tests", () => {
  each([
    [1, 1],
    [-1, 1],
    [0, 0]
  ]).it("when the input is '%s'", (input, expected) => {
    expect(ex.absolute(input)).toBe(expected);
  });;
});;

describe('greet', () => {
  it('should return greeting message', () => {
    const result = ex.greet('Benjamin');
    // expect(result).toBe('Hello Benjamin'); //to specific
    // expect(result).toMatch(/Benjamin/); //regular expression or string, / start or end of regex
    expect(result).toContain('Benjamin') //ander alternatief
  });
});


describe('getPlaces', () => {
  it('should return the places', () => {
    const result = ex.getPlaces();

    //too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //too specific (what if we sort array,...)
    expect(result[0]).toBe('Irish Pub');
    expect(result.length).toBe(3);

    //Proper way
    expect(result).toContain('Irish Pub');
    expect(result).toContain('Dranken Geers');
    expect(result).toContain('Loon');

    //Ideal
    expect(result).toEqual(expect.arrayContaining(['Irish Pub', 'Dranken Geers', 'Loon'])); //compares with another array containing the values, order not important
  });
});

describe('getPlace', () => {
  it('should return place with id 1', () => {
    const id = 1;
    const place = {
      id,
      name: 'Dranken Geers'
    };
    const result = ex.getPlace(id);
    //expect(result).toBe(place);//faalt, by reference
    expect(result).toEqual(place); //checks object equality
    expect(result).toMatchObject(place); //checks if props are matching, only the one we're interested in
    expect(result).toHaveProperty('id', id); //checks if property with the value exists
  });
});

describe('addPlace', () => {
  it('should throw exception if name is falsy', () => {
    expect(() => ex.addPlace(null)).toThrow();
  });
  it('should return place if name is truthy', () => {
    const place = 'HoGent';
    const result = ex.addPlace(place);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', place);
  });
});

//mocking sync functions
describe('updateEmail', () => {
  const newEmail = 'b@hogent.be';

  it('should update email if user exist', () => {
    db.getUserSync = (id) => {
      return {
        id: id,
        name: 'Benjamin',
        email: 'benjamin@hogent.be'
      }
    }
    const result = ex.updateEmail(1, newEmail);
    expect(result.email).toMatch(new RegExp(newEmail));
  });

  it('should update email if user exist - second implementation', () => {
    db.getUserSync = jest.fn().mockReturnValue({
      id: 1,
      name: 'Benjamin',
      email: 'benjamin@hogent.be'
    });;
    const result = ex.updateEmail(1, newEmail);
    expect(result.email).toMatch(new RegExp(newEmail));
  });
});

//mocking async functions
describe('notifyUser', () => {
  it('should notify user if user exist', async () => {
    const id = 1;
    db.getUser = jest.fn().mockResolvedValue({
      id,
      name: 'Benjamin',
      email: 'benjamin@hogent.be'
    });
    mail.send = jest.fn();
    await ex.notifyUser(id);
    expect(mail.send).toHaveBeenCalled();
    //check arguments passed to method
    expect(mail.send).toHaveBeenCalledWith('benjamin@hogent.be', 'Notification message'); //to specific for strings, good for numbers, booleans,
    expect(mail.send.mock.calls[0][0]).toMatch(/benjamin@hogent.be/);
    //mock.calls : contains all the calls to the function.
    //mock.calls[0] is the first time the function is called
    //mock.calls[0][] the first argument of the first time the function is called
    expect(mail.send.mock.calls[0][1]).toMatch(/Notification/);
  });

  it('should not notify user if user does not exist', async () => {
    db.getUser = jest.fn().mockRejectedValue(new Error("user doesn't exist"))
    mail.send = jest.fn();
    await ex.notifyUser(102);
    expect(mail.send).not.toHaveBeenCalled();
  });
});