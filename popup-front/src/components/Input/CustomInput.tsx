import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`

export const StyledInput = styled.input`
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
  variant?: 'preset' | 'additional' | 'quick'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void
  name?: string
}

const CustomInput: React.FC<CustomInputProps> = ({ variant, value, onChange, name }) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const showIcon = variant === 'preset' ? localValue !== '' : variant ? true : false

  let iconContent: string | null = null
  let clickable = false

  if (variant === 'quick') {
    iconContent = '$'
  } else if (variant === 'preset') {
    iconContent = '×'
    clickable = true
  } else if (variant === 'additional') {
    if (['buyGasFee', 'sellGasFee'].includes(name || '')) {
      iconContent = '×'
      clickable = true
    } else {
      iconContent = '%'
    }
  }

  const getDefaultValue = () => {
    if (variant === 'quick') return '0.00'
    if (
      variant === 'additional' &&
      ['buyGasFee', 'sellGasFee', 'buySlippage', 'sellSlippage'].includes(name || '')
    )
      return '0.0'
    return ''
  }

  const handleClear = () => {
    const defVal = getDefaultValue()
    setLocalValue(defVal)
    onChange({ target: { value: defVal } })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9.]/g, '')

    const parts = inputValue.split('.')
    if (parts.length > 2) {
      inputValue = parts[0] + '.' + parts.slice(1).join('')
    }

    if (/^0{2,}/.test(inputValue)) {
      inputValue = '0.'
    } else if (/^0\d+/.test(inputValue)) {
      inputValue = inputValue.replace(/^0(\d)/, '0.$1')
    }

    setLocalValue(inputValue)
  }

  const handleBlur = () => {
    if (localValue.trim() === '') {
      const defVal = getDefaultValue()
      setLocalValue(defVal)
      onChange({ target: { value: defVal } })
    } else {
      onChange({ target: { value: localValue } })
    }
  }

  return (
    <InputContainer>
      <StyledInput
        name={name}
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
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
