import React from 'react'
import styled from 'styled-components'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import CustomInput from '../../Input/CustomInput'

const Section = styled.div`
  background: #0a0a0a;
  border-radius: 4px;
  padding: 4px 8px;
  margin-bottom: 15px;
`

const RowSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const RowCenterGap = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const Label = styled.label`
  display: block;
  font-size: 11px;
`

const InputWrapper = styled.div`
  width: 120px;
  margin-right: 14px;
`

interface QuickBuyPresetSectionProps {
  quickBuyPreset: string | undefined
  handleQuickInputChange: (
    e: React.ChangeEvent<HTMLInputElement> 
    | { target: { name?: string; value: string } }
  ) => void
}

const QuickBuyPresetSection: React.FC<QuickBuyPresetSectionProps> = React.memo(({
  quickBuyPreset,
  handleQuickInputChange
}) => {
  return (
    <Section>
      <RowSpaceBetween>
        <RowCenterGap>
          <BoltOutlinedIcon style={{ fontSize: 12 }} />
          <Label>Quick Buy Preset</Label>
        </RowCenterGap>
        <InputWrapper>
          <CustomInput
            variant="quick"
            value={quickBuyPreset || ''}
            onChange={handleQuickInputChange}
            name="quickBuyPreset"
          />
        </InputWrapper>
      </RowSpaceBetween>
    </Section>
  )
})

export default QuickBuyPresetSection
