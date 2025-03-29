import React from 'react'
import styled from 'styled-components'

export const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  background: #424242;
  border: 1px solid #424242;
  color: #a9a9a9;
  border-radius: 4px;
  height: 8px;
  font-size: 11px;
`
export const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) rotate(90deg);
  background: transparent;
  border: none;
  color: #a9a9a9;
  cursor: pointer;
  font-size: 16px;
`

interface CustomInputProps {
  variant: 'preset' | 'additional' | 'quick'
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name?: string; value: string } }
  ) => void
  name?: string
}

const CustomInput: React.FC<CustomInputProps> = ({ variant, value, onChange, name }) => {
  const showClear = variant !== 'quick'

  const handleClear = () => {
    onChange({ target: { name, value: '' } })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name?: string; value: string } }
  ) => {
    onChange(e)
  }

  return (
    <>
      <StyledInput name={name} value={value} onChange={handleChange} />
      {showClear && value !== '' && (
        <ClearButton onClick={handleClear}>×</ClearButton>
      )}
    </>
  )
}

export default CustomInput
