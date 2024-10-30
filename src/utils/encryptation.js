import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

const hashText = async text => await bcrypt.hash(text, SALT_ROUNDS)

const compareTexts = async (text, encryptedText) => await bcrypt.compare(text, encryptedText)

export {
    hashText,
    compareTexts
}