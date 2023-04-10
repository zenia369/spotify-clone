import jwt from 'jsonwebtoken'

export interface IJWT {
  email: string
  uid: number
  time: number
}

const defaultData = (data: any): IJWT => ({
  email: data.email,
  uid: data.id,
  time: Date.now(),
})

export const createTokenJWT = async (baseData: any, newData?: any) => {
  const token = await jwt.sign(
    newData ?? defaultData(baseData),
    process.env.JWT_SERCER_KEY as string,
    {
      expiresIn: '8h',
    }
  )

  return token
}
