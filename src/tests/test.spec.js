const sum = (n0, n1) => n0 + n1

describe('This is a title for the tests', () => {
    it('The function has to return the sume of the numbers', () => {
        const result = sum(5, 5)

        expect(result).toBe(10)
        expect(sum(2,2)).toBe(4)
    })
})