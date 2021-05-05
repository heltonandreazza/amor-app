import { fetchConcepts } from 'services/client'

const sortCreatedDateAsc = (a, b) => (a.createdDate < b.createdDate) ? -1 : ((a.createdDate > b.createdDate) ? 1 : 0)

export const fetchConceptsData = async () => {
  const response = await fetchConcepts()
  const items = response || []
  items.sort(sortCreatedDateAsc)
  const oneToLast = items.length > 1 ? items[items.length - 2].concepts : { weight: 0, imc: 0 }
  const last = items.length > 0 ? items[items.length - 1].concepts : { weight: 0, imc: 0 }
  return {
    weight: last.weight,
    imc: last.imc,
    weightIcon: last.weight < oneToLast.weight ? 'arrow-down' : 'arrow-up',
    imcIcon: last.imc < oneToLast.imc ? 'arrow-down' : 'arrow-up',
  }
}
