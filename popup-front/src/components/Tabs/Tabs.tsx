import React from 'react'
import styled from 'styled-components'

const TabsWrapper = styled.div`
  width: 100%;
  background: #222222;
  padding: 4px;
  border-radius: 4px;
  margin-bottom: 10px;
  box-sizing: border-box;
`

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
`

const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>`
  flex: 1;
  text-align: center;
  font-size: 8px;
  padding: 4px;
  border: none;
  border-radius: 4px;
  background: ${(props) => (props.active ? '#293a4f' : '#222222')};
  color: ${(props) => (props.active ? '#3875b6' : '#808288')};
  cursor: pointer;
  &:disabled {
    background: #222222;
  }
  &:hover {
    background: ${(props) => (props.active ? '#2a3b68' : '#444')};
  }
`

type TabsProps = {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
  disabled: boolean
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, disabled }) => {
  return (
    <TabsWrapper>
      <TabsContainer>
        {tabs.map(tab => (
          <TabButton
            key={tab}
            active={activeTab === tab}
            onClick={() => !disabled && onTabChange(tab)}
            disabled={disabled}
          >
            {tab}
          </TabButton>
        ))}
      </TabsContainer>
    </TabsWrapper>
  )
}

export default Tabs
