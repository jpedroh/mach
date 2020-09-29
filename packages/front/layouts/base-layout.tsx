import React from 'react'

const BaseLayout: React.FC = ({ children }) => {
  return (
    <>
      <header>
        <h1>Mach</h1>
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  )
}

export default BaseLayout
