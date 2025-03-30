import React from 'react'
import styled from 'styled-components'

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'variant'
})<{ variant: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 400;
  border: none;
  border-radius: 4px;
  color: ${(props) =>
    props.variant === 'primary' ? '#dde1e6' : '#818388'};
  background: ${(props) =>
    props.variant === 'primary' ? '#223d5b' : '#1d1d1d'};
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.variant === 'primary' ? '#2a4b6e' : '#252525'};
  }

  &:disabled {
    background: rgb(109, 109, 109);
    cursor: not-allowed;
  }
`

type CustomButtonProps = {
  variant: 'primary' | 'secondary'
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant,
  onClick,
  children,
  disabled
}) => {
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}

export default CustomButton
