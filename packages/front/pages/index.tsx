import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { GetFlightsQuery } from '../actions/get-flights'
import { FlightsContext } from '../contexts/FlightsContext'
import BaseLayout from '../layouts/base-layout'
import sanitizeParameters from '../utils/sanitize-parameters'

const Home: React.FC = () => {
  const router = useRouter()
  const { state, loadFlights } = useContext(FlightsContext)
  const [parameters, setParameters] = React.useState<GetFlightsQuery>({
    departureIcao: '',
    arrivalIcao: '',
    limit: 10,
    offset: 0
  })

  const handleSubmit = async evt => {
    evt.preventDefault()
    await loadFlights(parameters)
    router.replace({ pathname: 'search' })
  }

  const handleChange = event => {
    setParameters(
      sanitizeParameters({
        ...parameters,
        [event.target.name]: event.target.value.toUpperCase()
      })
    )
  }

  return (
    <BaseLayout>
      <p className={'lead text-center'}>
        To begin, fill at least one of the following fields.
      </p>

      <div style={{ width: '50%' }} className="mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="departureInput">
            <Form.Label>Departure ICAO</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="departureIcao"
              placeholder="SBSP"
            />
          </Form.Group>
          <Form.Group controlId="arrivalInput">
            <Form.Label>Arrival ICAO</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              name="arrivalIcao"
              placeholder="SBRF"
            />
          </Form.Group>
          <Button
            variant="primary"
            block
            type="submit"
            disabled={state.loading}
          >
            {state.loading ? 'Loading' : 'Start search'}
          </Button>
        </Form>

        {state.error && (
          <Alert className="mt-2" variant={'danger'}>
            {state.error.message}
          </Alert>
        )}
      </div>
    </BaseLayout>
  )
}

export default Home
