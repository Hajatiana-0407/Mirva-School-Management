import React from 'react'
import AccountForm from '../../../Components/Forms/AccountForm'
import Title from '../../../Components/ui/Title'

const AccountSettings: React.FC = () => {
  return (
    <div className='space-y-6'>
      <Title
        title='Paramètre de votre compte'
        description='Gérez les informations et préférences de votre compte utilisateur.'
      ></Title>
      <AccountForm />
    </div>
  )
}

export default AccountSettings