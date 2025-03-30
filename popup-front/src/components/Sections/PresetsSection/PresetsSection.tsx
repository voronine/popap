import React from 'react'
import styled from 'styled-components'
import CustomInput from '../../Input/CustomInput'

const Section = styled.div`
  background: #0a0a0a;
  border-radius: 4px;
  padding: 4px 8px;
  margin-bottom: 8px;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

const Label = styled.label`
  display: block;
  font-size: 11px;
`

const PresetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 8px;
`

const PresetInputWrapper = styled.div`
  width: 82%;
`

export interface PresetConfig {
  key: 'buyPresets' | 'sellPresets'
  label: string
  Icon: React.ElementType
  iconProps?: any
}

export interface PresetsSectionProps {
  presetsConfig: PresetConfig[]
  formData: any
  handlePresetInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: 'buyPresets' | 'sellPresets'
  ) => void
}

const PresetsSection: React.FC<PresetsSectionProps> = React.memo(({
  presetsConfig,
  formData,
  handlePresetInputChange
}) => {
  return (
    <>
      {presetsConfig.map(({ key, label, Icon, iconProps }) => (
        <Section key={key}>
          <TitleContainer>
            <Icon {...iconProps} />
            <Label>{label}</Label>
          </TitleContainer>
          <PresetsGrid>
            {formData[key]?.map((val: string, i: number) => (
              <PresetInputWrapper key={`${key}-${i}`}>
                <CustomInput
                  variant="preset"
                  value={val}
                  onChange={(e) =>
                    handlePresetInputChange(
                      e as React.ChangeEvent<HTMLInputElement>,
                      i,
                      key as 'buyPresets' | 'sellPresets'
                    )
                  }
                />
              </PresetInputWrapper>
            ))}
          </PresetsGrid>
        </Section>
      ))}
    </>
  )
})

export default PresetsSection
