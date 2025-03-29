import React from 'react'
import styled from 'styled-components'

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant'
})<{ variant: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background: ${(props) => (props.variant === 'primary' ? '#4d9fff' : '#555')};
  cursor: pointer;
  &:disabled {
    background: #777;
    cursor: not-allowed;
  }
`

type CustomButtonProps = {
  variant: 'primary' | 'secondary'
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}

const CustomButton: React.FC<CustomButtonProps> = ({ variant, onClick, children, disabled }) => {
  return (
    <StyledButton variant={variant} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  )
}

export default CustomButton
