'use client'
import RegexInput from '../components/RegexInput'
import FlagsToggle from '../components/FlagsToggle'
import MatchTester from '../components/MatchTester'
import ExplainationTooltip from '../components/ExplainationToolTip'
import { useState } from 'react'

export default function TestPage() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')

  return (
    <div className='space-y-6'>
      <h1 className='text-3xl font-bold'>Test Your Regex</h1>
      <RegexInput pattern={pattern} setPattern={setPattern} flags={flags} />
      <FlagsToggle flags={flags} setFlags={setFlags} />
      <ExplainationTooltip pattern={pattern} />
      <MatchTester pattern={pattern} flags={flags} />
    </div>
  )
}
