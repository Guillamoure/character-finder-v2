export const findSectionPercentage = (x, percentage) => {
  let split = 1/x
  let count = 1
  let found = false
  while(!found){
    if (count * split > 100){
      break
    }
    if (percentage >= ((split * count)-split) && percentage < (split * count)){
      found = true
    } else {
      count++
    }
  }

  return count
}