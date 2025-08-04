import React from 'react'
import HeroSection from './HeroSection'
import FormInputField from './FormInputField'

const EnhancedFinancialForm = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <HeroSection/>
    <FormInputField/>
    </div>
    </>
  )
}

export default EnhancedFinancialForm