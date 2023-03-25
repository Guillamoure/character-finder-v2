export const mod = (value) => {
  return Math.floor( ( value - 10 ) / 2)
}

export const pluser = (value) => {
  return value > -1 ? `+${value}` : value
}