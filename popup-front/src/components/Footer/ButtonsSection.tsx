import React from 'react'
import styled from 'styled-components'
import CustomButton from '../Button/CustomButton'

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`

interface ButtonsSectionProps {
  onClose: () => void
  handleSave: () => void
  loading: boolean
}

const ButtonsSection: React.FC<ButtonsSectionProps> = ({
  onClose,
  handleSave,
  loading
}) => {
  return (
    <Actions>
      <CustomButton variant="secondary" onClick={onClose} disabled={loading}>
        Cancel
      </CustomButton>
      <CustomButton variant="primary" onClick={handleSave} disabled={loading}>
        Save
      </CustomButton>
    </Actions>
  )
}

export default ButtonsSection
