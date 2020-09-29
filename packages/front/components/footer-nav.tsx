import React from 'react'
import Nav from 'react-bootstrap/Nav'

const FooterNav: React.FC = () => {
  return (
    <Nav className="justify-content-end container">
      <Nav.Item>
        <Nav.Link disabled>Use for flight simulation only</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://www.github.com/jpedroh/mach" target="_blank">
          Mach v4.0.0
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://jpedroh.github.io" target="_blank">
          Developed by João Pedro Henrique
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

export default FooterNav
