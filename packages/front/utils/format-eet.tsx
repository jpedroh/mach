const formatEet = (eet: number) => {
  const hours = Math.floor(eet / 60)
  const minutes = eet % 60
  return `${hours}`.padStart(2, '0') + `${minutes}`.padStart(2, '0')
}

export default formatEet
