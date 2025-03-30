import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchSettings, saveSetting } from '../store/settingsSlice'
import styled from 'styled-components'
import { Setting } from '../types/settings'
import { presetsConfig } from './config/presetsConfig'
import { additionalSettingsConfig } from './config/additionalSettingsConfig'
import QuickBuyPresetSection from './Sections/QuickBuyPresetSection/QuickBuyPresetSection'
import PresetsSection from './Sections/PresetsSection/PresetsSection'
import AdditionalSettingsSection from './Sections/AdditionalSettingsSection/AdditionalSettingsSection'
import { PopupHeaderTabs } from './Header/PopupHeaderTabs'
import LoadingContent from './Loading/LoadingContent'
import ButtonsSection from './Footer/ButtonsSection'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
`

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 80%;
  background: #111111;
  color: #c3c3c3;
  padding: 6px 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Arial, sans-serif;

  @media (max-width: 420px) {
    width: 320px;
    padding: 4px 6px;
  }
`

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`

const Popup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const { settings, loading } = useAppSelector((state) => state.settings)
  const [activeTab, setActiveTab] = useState<string>('S1')
  const [formData, setFormData] = useState<Partial<Setting>>({})
  const didFetch = useRef(false)

  useEffect(() => {
    if (!didFetch.current) {
      dispatch(fetchSettings())
      didFetch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    const currentPreset = settings.find(
      (s: Setting) => s.presetName === activeTab
    )
    setFormData(currentPreset || {})
  }, [activeTab, settings])

  const handleQuickInputChange = useCallback(
    (e: { target: { name?: string; value: string } }): void => {
      if (e.target.name) {
        setFormData((prev) => ({
          ...prev,
          [e.target.name!]: e.target.value
        }))
      }
    },
    []
  )
  
  const handleAdditionalInputChange = useCallback(
    (e: { target: { name?: string; value: string } }): void => {
      if (e.target.name) {
        setFormData((prev) => ({
          ...prev,
          [e.target.name!]: e.target.value
        }))
      }
    },
    []
  )
  
  const handlePresetInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number,
      field: 'buyPresets' | 'sellPresets'
    ): void => {
      const presets = formData[field]
        ? [...(formData[field] as string[])]
        : []
      presets[index] = e.target.value
      setFormData((prev) => ({
        ...prev,
        [field]: presets
      }))
    },
    [formData]
  )

  const handleSave = async (): Promise<void> => {
    if (formData.presetName) {
      try {
        await dispatch(
          saveSetting({
            presetName: formData.presetName,
            data: formData
          })
        )
      } catch (error) {
        console.error('Error saving preset:', error)
      }
    }
  }

  const handleTabChange = async (tab: string): Promise<void> => {
    if (activeTab === tab) return
    try {
      await dispatch(
        saveSetting({
          presetName: formData.presetName!,
          data: formData
        })
      )
      setActiveTab(tab)
    } catch (error) {
      console.error('Error switching tabs:', error)
    }
  }

  return (
    <>
      <Overlay onClick={onClose} />
      <Container>
        <PopupHeaderTabs
          onClose={onClose}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          loading={loading}
        />

        {loading ? (
          <LoadingContent />
        ) : (
          <Content>
            <QuickBuyPresetSection
              quickBuyPreset={formData.quickBuyPreset}
              handleQuickInputChange={handleQuickInputChange}
            />

            <PresetsSection
              presetsConfig={presetsConfig}
              formData={formData}
              handlePresetInputChange={handlePresetInputChange}
            />

            <AdditionalSettingsSection
              additionalSettingsConfig={additionalSettingsConfig}
              formData={formData}
              handleAdditionalInputChange={handleAdditionalInputChange}
            />
          </Content>
        )}

        <ButtonsSection
          onClose={onClose}
          handleSave={handleSave}
          loading={loading}
        />
      </Container>
    </>
  )
}

export default Popup
