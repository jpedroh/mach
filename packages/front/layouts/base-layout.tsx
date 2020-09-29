import React from 'react'
import FooterNav from '../components/footer-nav'

const BaseLayout: React.FC = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="pt-5">
        <h1 className={'text-center display-4'}>mach</h1>
        <h4 className={'text-center text-secondary'}>
          An open-source tool for flight simulation
        </h4>
      </header>
      <main className="flex-grow-1 container py-4">{children}</main>
      <footer className="py-2 border-top">
        <FooterNav />
      </footer>
    </div>
  )
}

export default BaseLayout
