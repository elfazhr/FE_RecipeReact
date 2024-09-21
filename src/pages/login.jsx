import React from 'react'
import AuthLayouts from '../layouts/AuthLayouts'
import FormLogin from '../fragments/FormLogin'

const LoginPage = () => {
  return (
    <AuthLayouts image="/img/login.png" title="Login" titleDesc="Explore recipes, save favorites, and share your creations with fellow food lovers"
      tagline="Create and Share Delicious Recipes" taglineDesc="Sign In and Serve Up Something Special Every Day!">
      <FormLogin />
    </AuthLayouts>
  )
}

export default LoginPage