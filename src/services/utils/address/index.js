const addressNumberRegex = /.+,\s*([sS]\/[nN]|\d+\w*)/
export const addressNumberFromText = text => {
  const [, regexExtractedNumber] = text.match(addressNumberRegex) ?? []
  return regexExtractedNumber ?? ''
}

export const appendAddress = (field, sufix = ', ') => (field ? `${sufix}${field}` : '')
export const getMapsAddress = (address = {}) => {
  return `${address.address}${appendAddress(address.neighborhood)}${appendAddress(address.city)}${appendAddress(
    address.province,
    ' - '
  )}${appendAddress(address.zipcode)}`
}
