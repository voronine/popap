import styled from 'styled-components'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CloseIcon from '@mui/icons-material/Close'
import Tabs from '../Tabs/Tabs'

const Title = styled.h2`
  margin: 0;
  font-size: 10px;
  font-weight: 500;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
  margin-top: -4px;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

interface PopupHeaderTabsProps {
  onClose: () => void
  activeTab: string
  handleTabChange: (tab: string) => Promise<void>
  loading: boolean
}

const CloseIconWrapper = styled.div`
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ffffff;
  }
`

export const PopupHeaderTabs: React.FC<PopupHeaderTabsProps> = ({
  onClose,
  activeTab,
  handleTabChange,
  loading
}) => {
  return (
    <>
      <Header>
        <TitleContainer>
          <SettingsOutlinedIcon style={{ fontSize: 12 }} />
          <Title>Settings</Title>
        </TitleContainer>
        <CloseIconWrapper onClick={onClose}>
          <CloseIcon style={{ fontSize: 14 }} />
        </CloseIconWrapper>
      </Header>
      <Tabs
        tabs={['S1', 'S2', 'S3']}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        disabled={loading}
      />
    </>
  )
}
