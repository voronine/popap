import React from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`

export const StyledInput = styled.input.attrs({
  inputMode: 'numeric',
  pattern: '[0-9]*',
})`
  width: 100%;
  padding: 4px 8px;
  background: #1b1b1b;
  border: 1px solid #292929;
  color: #999999;
  border-radius: 4px;
  font-size: 11px;
`

const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: -18px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #999999;
  cursor: pointer;
  font-size: 11px;
`

const Indicator = styled.span`
  position: absolute;
  top: 50%;
  right: -14px;
  transform: translateY(-50%);
  color: #484848;
  font-size: 8px;
`

interface CustomInputProps {
  variant: 'preset' | 'additional' | 'quick'
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }
  ) => void
  name?: string
}

const CustomInput: React.FC<CustomInputProps> = ({ variant, value, onChange, name }) => {
  const showIcon = variant === 'preset' ? value !== '' : true

  let iconContent: string | null = null
  let clickable = false

  if (variant === 'quick') {
    iconContent = '$'
    clickable = false
  } else if (variant === 'preset') {
    iconContent = '×'
    clickable = true
  } else if (variant === 'additional') {
    if (name === 'buyGasFee' || name === 'sellGasFee') {
      iconContent = '×'
      clickable = true
    } else {
      iconContent = '%'
      clickable = false
    }
  }

  const handleClear = () => {
    onChange({ target: { value: '' } })
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }
  ) => {
    onChange(e)
  }

  return (
    <InputContainer>
      <StyledInput name={name} value={value} onChange={handleChange} />
      {showIcon && iconContent && (
        clickable ? (
          <ClearButton onClick={handleClear}>{iconContent}</ClearButton>
        ) : (
          <Indicator>{iconContent}</Indicator>
        )
      )}
    </InputContainer>
  )
}

export default CustomInput
