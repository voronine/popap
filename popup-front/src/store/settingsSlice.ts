import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit'
import { Setting } from '../types/settings'
import { getSettings, updateSetting } from '../api/api'

interface SettingsState {
  settings: Setting[]
  loading: boolean
  error: string | null
}

const initialState: SettingsState = {
  settings: [],
  loading: false,
  error: null,
}

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  getSettings
)

export const saveSetting = createAsyncThunk(
  'settings/saveSetting',
  async ({ presetName, data }: { presetName: string; data: Partial<Setting> }) => {
    return await updateSetting(presetName, data)
  }
)

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings(state, action) {
      state.settings = action.payload
    },
    updateSettingLocal(state, action) {
      state.settings = state.settings.map((setting) =>
        setting.presetName === action.payload.presetName
          ? { ...setting, ...action.payload.data }
          : setting
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settings = action.payload
      })
      .addCase(saveSetting.fulfilled, (state, action) => {
        const updatedSetting = action.payload
        const index = state.settings.findIndex(
          (setting) => setting.presetName === updatedSetting.presetName
        )
        if (index >= 0) {
          state.settings[index] = updatedSetting
        } else {
          state.settings.push(updatedSetting)
        }
      })
      .addMatcher(
        isAnyOf(fetchSettings.pending, saveSetting.pending),
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        isAnyOf(fetchSettings.fulfilled, saveSetting.fulfilled),
        (state) => {
          state.loading = false
        }
      )
      .addMatcher(
        isAnyOf(fetchSettings.rejected, saveSetting.rejected),
        (state, action) => {
          state.loading = false
          state.error = action.error.message || 'Error'
        }
      )
  },
})

export const { setSettings, updateSettingLocal } = settingsSlice.actions
export default settingsSlice.reducer
