import React from 'react'
import FooterNav from '../components/footer-nav'

const BaseLayout: React.FC = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <h1>Mach</h1>
      </header>
      <main className="flex-grow-1 container">{children}</main>
      <footer className="py-2 border-top">
        <FooterNav />
      </footer>
    </div>
  )
}

export default BaseLayout
