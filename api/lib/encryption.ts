// Nodejs encryption of buffers
import * as crypto from 'crypto'
import * as fs from 'fs'
import * as log4js from 'log4js'
import { config } from '../../config'

const algorithm = 'aes-256-ctr'
const password = process.env.decryptKey

const logger = log4js.getLogger('scss engine')
logger.level = config.logging ? config.logging : 'OFF'

function encrypt(fileName: string): void {

    const filenamePart= fileName.split('.')[0]
    const outName = filenamePart + '.crypt'

    logger.info(`Reading contents from ${fileName}`)
    const contents = fs.createReadStream(fileName)
    const encrypted = contents.pipe(crypto.createCipher(algorithm, password))
    logger.info(`Writing contents to ${outName}`)
    encrypted.pipe(fs.createWriteStream(`${outName}`))
}

export function decrypt(fileName: string): string {
    let contents
    contents = fs.readFileSync(fileName)

    const decipher = crypto.createDecipher(algorithm, password)
    
    const decrypted = Buffer.concat([decipher.update(contents), decipher.final()])
    return decrypted.toString()
}

if (process.argv) {
    const action = process.argv[2]
    const filename = process.argv[3]

    switch (action) {
        case 'decrypt':
            decrypt(filename)
            break
        case 'encrypt':
            encrypt(filename)
            break
    }

}

