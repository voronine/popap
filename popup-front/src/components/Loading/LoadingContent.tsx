import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const LoadingContent: React.FC = () => {
  return <Container>Loading...</Container>
}

export default LoadingContent
