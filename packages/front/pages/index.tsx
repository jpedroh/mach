import { useRouter } from 'next/router'
import React from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { GetFlightsQuery } from '../actions/get-flights'
import BaseLayout from '../layouts/base-layout'

const Home: React.FC = () => {
  const router = useRouter()
  const [parameters, setParameters] = React.useState<Partial<GetFlightsQuery>>({
    departureIcao: '',
    arrivalIcao: ''
  })
  const [error, setError] = React.useState('')

  const handleSubmit = evt => {
    evt.preventDefault()
    if (!parameters.departureIcao && !parameters.arrivalIcao) {
      setError('Fill at least one of the fields')
      return
    }

    router.replace({
      pathname: 'search',
      query: parameters
    })
  }

  const handleChange = event => {
    const updated = {}
    updated[event.target.name] = event.target.value.toUpperCase()
    setParameters({ ...parameters, ...updated })
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
          <Button variant="primary" block type="submit">
            Start search
          </Button>
        </Form>

        {error && (
          <Alert className="mt-2" variant={'danger'}>
            {error}
          </Alert>
        )}
      </div>
    </BaseLayout>
  )
}

export default Home
