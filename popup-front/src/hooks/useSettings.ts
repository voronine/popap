import { useEffect } from 'react'
import { fetchSettings, saveSetting } from '../store/settingsSlice'
import { Setting } from '../types/settings'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const useSettings = () => {
  const dispatch = useAppDispatch()
  const { settings, loading } = useAppSelector((state) => state.settings)

  useEffect(() => {
    if (settings.length === 0) {
      dispatch(fetchSettings())
    }
  }, [dispatch, settings.length])

  const save = (presetName: string, data: Partial<Setting>) => {
    dispatch(saveSetting({ presetName, data }))
  }

  return { settings, loading, save }
}
