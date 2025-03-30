import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { formatInputValue, getDefaultInputValue } from './inputHelpers'

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`

const StyledInput = styled.input`
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
  right: -12px;
  transform: translateY(-50%);
  color: #484848;
  font-size: 8px;
`

interface CustomInputProps {
  variant?: 'preset' | 'additional' | 'quick'
  value: string
  onChange: (e: { target: { name?: string; value: string } }) => void
  name?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
  variant,
  value,
  onChange,
  name,
}) => {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const showIcon = variant === 'preset' ? localValue !== '' : !!variant

  const getIconContent = (): string | null => {
    if (variant === 'quick') return '$'
    if (variant === 'preset') {
      return name === 'sellPresets' ? '%' : '×'
    }
    if (variant === 'additional') {
      return ['buyGasFee', 'sellGasFee'].includes(name || '')
        ? '×'
        : '%'
    }
    return null
  }

  const iconContent = getIconContent()

  const clickable =
    (variant === 'preset' && name !== 'sellPresets') ||
    (variant === 'additional' &&
      ['buyGasFee', 'sellGasFee'].includes(name || ''))

  const updateValue = (val: string) => {
    setLocalValue(val)
    onChange({ target: { name, value: val } })
  }

  const handleClear = () => {
    if (!clickable) return
    const defVal = getDefaultInputValue(variant, name)
    updateValue(defVal)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value
    const formatted = formatInputValue(input)
    setLocalValue(formatted)
  }

  const handleBlur = () => {
    if (variant === 'quick' && localValue.trim() !== '') {
      const num = parseFloat(localValue)
      if (!isNaN(num)) {
        updateValue(num.toFixed(2))
        return
      }
    }
    if (
      variant === 'additional' &&
      (name === 'buySlippage' || name === 'sellSlippage') &&
      localValue.trim() !== ''
    ) {
      const num = parseFloat(localValue)
      if (!isNaN(num)) {
        updateValue(num.toFixed(1))
        return
      }
    }
    if (!clickable) {
      updateValue(localValue)
      return
    }
    if (localValue.trim() === '')
      updateValue(getDefaultInputValue(variant, name))
    else updateValue(localValue)
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
          <ClearButton onClick={handleClear}>
            {iconContent}
          </ClearButton>
        ) : (
          <Indicator>{iconContent}</Indicator>
        )
      )}
    </InputContainer>
  )
}

export default CustomInput
