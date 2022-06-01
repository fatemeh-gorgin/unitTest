const lib = require('../exercise1')

describe('fizzBuzz', () => {
    it('should throw exeptio if is not number', () => {
        expect(() => { lib.fizzBuzz('a') }).toThrow();
        expect(() => { lib.fizzBuzz(null) }).toThrow();
        expect(() => { lib.fizzBuzz(undefined) }).toThrow();
        expect(() => { lib.fizzBuzz({}) }).toThrow()
    })

})