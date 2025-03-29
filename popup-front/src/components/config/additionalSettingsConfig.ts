import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined'
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded'
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined'

export const additionalSettingsConfig = [
  {
    name: 'buySlippage',
    label: 'Buy Slippage',
    Icon: DirectionsWalkOutlinedIcon,
    iconProps: { sx: { fontSize: 12, transform: 'rotate(-45deg)' } }
  },
  {
    name: 'sellSlippage',
    label: 'Sell Slippage',
    Icon: DirectionsWalkOutlinedIcon,
    iconProps: { sx: { fontSize: 12, transform: 'rotate(-45deg)' } }
  },
  {
    name: 'buyGasFee',
    label: 'Buy Gas Fee',
    Icon: LocalGasStationRoundedIcon,
    iconProps: { sx: { fontSize: 12 } }
  },
  {
    name: 'sellGasFee',
    label: 'Sell Gas Fee',
    Icon: LocalGasStationOutlinedIcon,
    iconProps: { sx: { fontSize: 12 } }
  }
]
