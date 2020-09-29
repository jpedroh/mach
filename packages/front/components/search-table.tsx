import Flight from '@mach/common'
import React from 'react'
import Button from 'react-bootstrap/Button'
import DataTable from 'react-data-table-component'
import Spinner from 'react-bootstrap/Spinner'

const LoadingSpinner: React.FC = () => (
  <div className="text-center">
    <Spinner animation="border" variant={'primary'} role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
)

const styling = {
  header: {
    style: { display: 'none' }
  },
  rows: {
    style: {
      fontSize: '1rem'
    }
  },
  headCells: {
    style: {
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: '1.7rem',
      textTransform: 'uppercase'
    }
  },
  pagination: {
    style: {
      fontSize: '0.9rem'
    }
  }
}

type SearchTableProps = {
  count: number
  data: any[]
  loading: boolean
  onOffsetChange: (newOffset: number) => void
  onDetailsShow: (flight: Flight) => void
}

const SearchTable: React.FC<SearchTableProps> = ({
  data,
  count,
  loading,
  onOffsetChange,
  onDetailsShow
}) => {
  const PER_PAGE = 10

  const columns = [
    {
      name: 'Callsign',
      selector: 'callsign'
    },
    {
      name: 'Departure',
      selector: 'departureIcao'
    },
    {
      name: 'Arrival',
      selector: 'arrivalIcao'
    },
    {
      name: 'EOBT',
      selector: 'estimatedOffBlockTime',
      format: ({ estimatedOffBlockTime }) => `${estimatedOffBlockTime}Z`
    },
    {
      name: 'Aircraft',
      selector: 'aircraft.icaoCode'
    },
    {
      name: 'Details',
      cell: flight => (
        <Button variant="info" block onClick={() => onDetailsShow(flight)}>
          View Details
        </Button>
      )
    }
  ]

  return (
    <DataTable
      striped
      pagination
      paginationServer
      paginationPerPage={PER_PAGE}
      columns={columns}
      data={data}
      customStyles={styling}
      paginationTotalRows={count}
      onChangePage={page => onOffsetChange((page - 1) * PER_PAGE)}
      noDataComponent={<></>}
      progressPending={loading}
      progressComponent={<LoadingSpinner />}
      paginationRowsPerPageOptions={[10]}
    />
  )
}

export default SearchTable
