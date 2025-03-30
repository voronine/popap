export const formatInputValue = (value: string): string => {
    let inputValue = value.replace(/[^0-9.]/g, '')
    const parts = inputValue.split('.')
    if (parts.length > 2) {
      inputValue = parts[0] + '.' + parts.slice(1).join('')
    }
    if (/^0{2,}/.test(inputValue)) {
      inputValue = '0.'
    } else if (/^0\d+/.test(inputValue)) {
      inputValue = inputValue.replace(/^0(\d)/, '0.$1')
    }
    return inputValue
  }
  
  export const getDefaultInputValue = (
    variant?: 'preset' | 'additional' | 'quick',
    name?: string
  ): string => {
    if (variant === 'quick') return '0.00'
    if (
      variant === 'additional' &&
      ['buyGasFee', 'sellGasFee', 'buySlippage', 'sellSlippage'].includes(
        name || ''
      )
    )
      return '0.0'
    return ''
  }
  