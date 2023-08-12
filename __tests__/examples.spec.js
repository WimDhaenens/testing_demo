// describe('eerste testen', () => {
//   it('should succeed', () => {
//     expect(2 + 2).toBe(4);
//   });
//   it('should fail', () => {
//     throw new Error('fail');
//   });
// });


const ex = require('../examples');
const each = require('jest-each').default;

describe('absolute', () => {
  it('should return positive number if input is positive', () => {
    //AAA
    //Arrange
    const input = 1;
    //Act
    const result = ex.absolute(input);
    //Assert
    expect(result).toBe(input);
  })
  it('should return positive number if input is negative', () => {
    //AAA
    //Arrange
    const input = -1;
    //Act
    const result = ex.absolute(input);
    //Assert
    expect(result).toBe(-input);
  })
  it('should return positive number if input is nul', () => {
    //AAA
    //Arrange
    const input = 0;
    //Act
    const result = ex.absolute(input);
    //Assert
    expect(result).toBe(input);
  })
});

describe('absoluteV2', () => {
  each([
      [1, 1],
      [-1, 1],
      [0, 0]
    ])
    .it('input %s should have output %s', (input, output) => {
      const result = ex.absolute(input);
      expect(result).toBe(output);
    })
})

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = ex.greet('John');
    expect(result).toMatch(/John/);
    expect(result).toContain('John');
  })
})

describe('getPlaces', () => {
  it('should return an array with places', () => {
    const result = ex.getPlaces();
    expect(result).toEqual(expect.arrayContaining(['Irish Pub', 'Dranken Geers', 'Loon']));
  })
})

describe('getPlace', () => {
  it('should return a place with the given id', () => {
    const result = ex.getPlace(1);
    const id = 1;
    expect(result).toMatchObject({
      id: 1,
      name: 'Dranken Geers'
    });
    expect(result).toHaveProperty('id', id);
  })
})

describe('addPlace', () => {
  it('should throw an exception if input is falsy', () => {
    const args = [null, undefined, NaN, '', 0, false];
    args.forEach(a => {
      expect(() => {
        ex.addPlace(a)
      }).toThrow();
    })
  })
  it('should return a place if input is truthy', () => {
    const result = ex.addPlace('Dranken Geers');
    expect(result).toMatchObject({
      id: 1,
      name: 'Dranken Geers'
    });
  })
})

// describe('updateEmail', () => {
//       it('should update the email of the user', () => {
//             const email = 'b@hogent.be';
//             db.getUserSync = jest.fn().mockReturnValue({
//               email
//             });
//             const result = ex.updateEmail(1, newEmail);
//             '


//tot 43:51 testen5.mp4