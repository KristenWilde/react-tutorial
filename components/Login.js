import React from 'react'
import PropType from 'prop-types'

const Login = (props) => (
  <nav className="login">
  <h2>Inventory Login</h2>
  <p>Sign in to manage your store's inventory.</p>
  <button
    className="github"
    onClick={() => props.authenticate('Github')}
  >
   Log in with GitHub
  </button>
  <button
    className="twitter"
    onClick={() => props.authenticate('Twitter')}
  >
   Log in with Twitter
  </button>
  </nav>
)

Login.propTypes = {
  authenticate: PropType.func.isRequired,
}

export default Login
