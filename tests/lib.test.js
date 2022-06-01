const lib = require('../lib')
const db = require('../db')
const mail = require('../mail')
describe('absolute', () => {
    it('should return positive number if input positive', () => {
        const result = lib.absolute(1)
        expect(result).toBe(1)
    })
    it('should return positive number if input negetive', () => {
        const result = lib.absolute(-1)
        expect(result).toBe(1)
    })
    it('should return zero number if input zero', () => {
        const result = lib.absolute(0)
        expect(result).toBe(0)
    })
});

describe('greet', () => {
    it('shuld return greeting message', () => {
        const result = lib.greet('fatemeh')
        expect(result).toMatch(/fatemeh/)
        expect(result).toContain('fatemeh')
    })
})

describe("getCurrencies", () => {
    it('shuld contain available Currencies', () => {
        const result = lib.getCurrencies()
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
    })
})

describe('getProduct', () => {
    it('should reyurn product with given Id', () => {
        const result = lib.getProduct(1)
        // expect(result).toEqual({id : 1 , price: 10})
        expect(result).toMatchObject({ id: 1, price: 10 })
        expect(result).toHaveProperty('id', 1)

    })
})

describe('regiser user', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false]
        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow()
        })
    })
    it('should retirn user if username is valid', () => {
        const result = lib.registerUser('fatemeh')
        expect(result).toMatchObject({ username: 'fatemeh' });
        expect(result.id).toBeGreaterThan(0)
    })
})

describe('applyDiscount', () => {
    it('applu 10% if more then 10 point' , () =>{
        db.getCustomerSync = function(customerId){
            console.log('fake customer');
            return  { id: customerId, points: 20 };
        }
        const order = {customerId: 1 , totalPrice: 10}
        lib.applyDiscount(order)
        expect(order.totalPrice).toBe(9)
    })
})

describe('notifyCustomer', () => {
    it('should send email' , () =>{
        // db.getCustomerSync = function(customerId){
        //     return {email: 'a'}
        // }
        db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'})
        mail.send = jest.fn()
        // let mailsent = false
        // mail.send = function(email , message){
        //     mailsent = true
        // }
        lib.notifyCustomer({customerId : 1})

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a')
        expect(mail.send.mock.calls[0][1]).toMatch(/order/)
        // expect(mailsent).toBe(true)
    })
})


