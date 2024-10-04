import { compare, genSaltSync, hash } from 'bcryptjs'

class Utils {
  public isJSON = (data: string) => {
    try {
      JSON.parse(data)
    } catch (e) {
      return false
    }
    return true
  }

  public getTime = () => {
    const date = new Date()
    const time = date.getTime()
    return time
  }

  public genSalt = async (saltRounds: number, value: string) => {
    const salt = genSaltSync(saltRounds)
    return await hash(value, salt)
  }

  public compareHash = async (hash: string, value: string) => {
    return await compare(value, hash)
  }
}

class JwtUtils {
  // public
}

export const utils = new Utils()
