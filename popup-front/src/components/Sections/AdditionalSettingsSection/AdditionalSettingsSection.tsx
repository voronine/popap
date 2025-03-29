import React from 'react'
import styled from 'styled-components'
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

export interface AdditionalSettingConfig {
  name: string
  label: string
  Icon: React.ElementType
  iconProps?: any
}

export interface AdditionalSettingsSectionProps {
  additionalSettingsConfig: AdditionalSettingConfig[]
  formData: any
  handleAdditionalInputChange: (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name?: string; value: string } }
  ) => void
}

const AdditionalSettingsSection: React.FC<AdditionalSettingsSectionProps> = ({
  additionalSettingsConfig,
  formData,
  handleAdditionalInputChange
}) => {
  return (
    <>
      {additionalSettingsConfig.map(({ name, label, Icon, iconProps }) => (
        <Section key={name}>
          <RowSpaceBetween>
            <RowCenterGap>
              <Icon {...iconProps} />
              <Label>{label}</Label>
            </RowCenterGap>
            <InputWrapper>
              <CustomInput
                variant="additional"
                value={formData[name] || ''}
                onChange={handleAdditionalInputChange}
                name={name}
              />
            </InputWrapper>
          </RowSpaceBetween>
        </Section>
      ))}
    </>
  )
}

export default AdditionalSettingsSection
