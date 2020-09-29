import Link from 'next/link'
import React from 'react'

type ResultsLeadProps = {
  loading: boolean
  count: number
}

const ResultsLead: React.FC<ResultsLeadProps> = ({ loading, count }) => {
  const getMessage = (count: number) => {
    if (count === 0) {
      return 'No results found.'
    } else if (count === 1) {
      return 'This is the single result of your search.'
    }
    return `These are the ${count} results of your search.`
  }
  return (
    !loading && (
      <p className="lead text-center">
        {getMessage(count)} <Link href="/">Click here</Link> to make a new
        search.
      </p>
    )
  )
}

export default ResultsLead
