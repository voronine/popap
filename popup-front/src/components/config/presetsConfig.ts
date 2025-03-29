import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'

export const presetsConfig = [
  {
    key: 'buyPresets' as 'buyPresets',
    label: 'Buy Presets',
    Icon: LocalGroceryStoreOutlinedIcon,
    iconProps: { sx: { fontSize: 12 } }
  },
  {
    key: 'sellPresets' as 'sellPresets',
    label: 'Sell Presets',
    Icon: SellOutlinedIcon,
    iconProps: { sx: { fontSize: 12, transform: 'rotate(135deg)' } }
  }
]
