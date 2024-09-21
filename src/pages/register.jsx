import React from 'react'
import AuthLayouts from '../layouts/AuthLayouts'
import FormRegister from '../fragments/FormRegister'

const RegisterPage = () => {
  return (
    <AuthLayouts image="/img/register.png" title="Register" titleDesc="Start your culinary adventure for unlimited access to recipes, cooking tips, and a community of food lovers"
      tagline="Start Creating Culinary Masterpieces" taglineDesc="Become a Member and Unlock a World of Flavors">
      <FormRegister />
    </AuthLayouts>
  )
}

export default RegisterPage