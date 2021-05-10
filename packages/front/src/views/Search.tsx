import { FC } from 'react'
import { Link } from 'react-router-dom'
import Lead from '../components/Lead'
import GeneralLayout from '../layouts/GeneralLayout'

const getLeadMessage = (count: number) => {
  if (count === 0) {
    return 'No results found.'
  } else if (count === 1) {
    return 'This is the single result for your search.'
  }
  return `These are the ${count} results for your search.`
}

const Search: FC = () => {
  return (
    <GeneralLayout>
      <Lead>
        {getLeadMessage(1)} <Link to="/">Click here</Link> to make a new search.
      </Lead>
    </GeneralLayout>
  )
}

export default Search
