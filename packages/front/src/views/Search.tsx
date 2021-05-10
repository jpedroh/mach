import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FlightsTable from '../components/FlightsTable'
import Lead from '../components/Lead'
import GeneralLayout from '../layouts/GeneralLayout'

const getLeadMessage = (count: number) => {
  return count === 1
    ? 'There is a single result for your search.'
    : `There are ${count} results for your search.`
}

const Search: FC = () => {
  const LIMIT = 15
  const [items, setItems] = useState<any[]>([])
  const [count, setCount] = useState(0)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    fetch(
      'http://mach-api.herokuapp.com/flights?offset=' +
        offset +
        '&limit=' +
        LIMIT
    )
      .then(response => response.json())
      .then(data => {
        setItems(items => [...items, ...data.items])
        setCount(data.count)
      })
  }, [offset])

  return (
    <GeneralLayout>
      <Lead>
        {getLeadMessage(count)} <Link to="/">Click here</Link> to make a new
        search.
      </Lead>

      <FlightsTable
        items={items}
        next={() => setOffset(v => v + LIMIT)}
        hasMore={items.length < count}
      />
    </GeneralLayout>
  )
}

export default Search
