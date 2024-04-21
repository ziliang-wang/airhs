import JsEncrypt from 'jsencrypt'
import cryptoJs from 'crypto-js'

// 后端公钥加密
export const bndEncrypt = (userInfo) => {
  const encrypt = new JsEncrypt()
  encrypt.default_key_size = 2048
  encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA9IsPThw4xKTwfUPGZyz2
  IPEUQ0vfdQExEywYVb64GCIwYH8GkHXVfmTnwNg4fUtANO3L6dhQW5+XWWMyADZo
  s5vPZQw4nbzqh/ATyent4o2ICxCXEpUA8p1GOJgxORnRfo506GLnATZh0QHhZSZu
  HJdo4/7uZTMkpQx88kiBPI074/UJWzxWn5UxOcaD4lW46+VkNeMJjsB2jCaHJy+l
  /hzsrCfT4XmdPB5P/J2/DhHWykDC002oZOwD3xFgdDxAr6WAMmp5eu7xm0g2AUyf
  ntny6hRln7piinIUZ5JvswCIhxltjZVUiZSjTpbiDTJsjEXdo7WE17v3n/my6wDH
  EQIDAQAB
  -----END PUBLIC KEY-----`
  )
  return encrypt.encrypt(userInfo)
}
// 前端私钥签名
export const fndSign = (userInfo) => {
  const signEncrypt = new JsEncrypt()
  signEncrypt.default_key_size = 2048
  signEncrypt.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
  MIIEowIBAAKCAQEApBT/bcdsAcTdOJ4aXG8bAXk3fQi84weRDaujt68qHYvNzMDx
  T/z6ew/Ze6ZngSoUCGk/Kbu2DpTxD6kCkzXExR3iz2MjO8E033/IbCZTkDOJghPQ
  Kk1KrxxRKt1eBsJjR8WNaOAq7j0ZJJ4BIcJCv9iJXTu4YMDWAbiqB62evKgNBWtw
  EAY2IVojlrLEwHOSrnKmyXOuZ3vH9cXLwP43bBv/R1jaGJsknzG9yGKRB+JNx9gv
  0KRmEYWUAPXmkjNqxE87deBt3lXJEq5yTG3fq6NsxlfCgHw43DD7RidMqXqLS4f+
  pUY44wwozslSmx8cBUENXoGx2il/LTT0jXp1EwIDAQABAoIBAQCcFdlyDb2h5Sro
  PAYpngubmDr/tzsv4LfMwFUqW/f9SUvJllU32RhRzp79cCuQBH4wDiZmxckHEApM
  8mKftQts0+Q5kj4nDsEERyNaNg9R4qTRV5WzV/lOoOpZk2Fpnqsg0D2X4X8VSIvN
  eHztJ0WmCA+L4E6hw28RDiC40yFophJmWod37iiAT4KB3trMqVyJ68bafmRdrVUw
  61P5dNirS4GqK2Qi/qFpR560y3YurQI+eT8rsiLSgLorQ+M5eeN3jgFgYfRVvppL
  ar3f5CTK6Bt4rz4A4RmG9qjKhcjPqwuukiIvtKYNBj44wIOe3D0xP9zttwntrNA4
  FZwhJYdpAoGBAM1LG7CZ7iVzJi5XI/kdEwJ3+NP4t6TmAk0JmrfDrIog6GYtiUsU
  SRx1sedOh9CENB9IEnp74jUmaipBppEVkxR57B8m+zonunb6GKAJDENildrlScHu
  RyEWRyHt0uqZBE5Irvyo09FVRpwgHb3bXlPwUbyEpsMtErVu27AtZFN3AoGBAMyc
  DnVNsHxWgincZaKW33B+lNs2MDBeHcUwNTE/dtz61QBD3g+XnF3pGZL9uVjkFWTp
  /QN9rT4eGNgH1/cnsed0iE0/8FK0dIx3m/ziWEpbIBRdyQJbW+IwhVb5D404Re8u
  fYhJtTgn6+nw215qtjtzZ4xJm9P0EmQAdgj5cTpFAoGAVNcRXm5+6KMpyETi7PSD
  AqYqAw/qdQ9JLCUn94G6MGthH7j54DlF7akGGJ1vq1C3aaYTXOMNnQF/Jm9zMspD
  ulaYqlclw+bfPIQm4RxcIQ0A+TGAxdB/PMFELFVosOMD0IZhKrFquDwRrjvnjqq1
  1OKgJNR9RnO+I5To3Wok6AkCgYA6lDdDeEGd53qOl431lbJU17iwZfw37MojKWEh
  P2U9cQbIc6XA2wwmitUKk1+cRnilkqQgeru9vAoq11wKY6/4bxGS5Epes1Fm4duj
  8/2JFDvD+PHSnetZf8C9HMNKECFdj/barReYAz30lUOI7Y5MyQaNUImvjgIx5Tvl
  59x17QKBgDSfLuVw8SoAKr2TTLg5W+fR+xTqjNtb2k0yxvqriOmK440ifCIR6lcE
  kVpP7cnmvYQNHK/mTaaW1ZyjShcx6NW3Wo+B/Rk0Vy/bdsJykG+Vj4yOZSRKkhvY
  wMnnaHW0teqIhXcfCzQWtHKSfqUG3mFW8v3xtmVOphAcrKnPd2kJ
  -----END RSA PRIVATE KEY-----`)
  return signEncrypt.sign(userInfo, cryptoJs.SHA256, 'sha256')
}
