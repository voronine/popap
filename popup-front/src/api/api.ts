import axios from 'axios'
import { Setting } from '../types/settings'

const API_URL = 'http://localhost:5000/api'

export const getSettings = async (): Promise<Setting[]> => {
  const response = await axios.get(`${API_URL}/settings`)
  return response.data
}

export const updateSetting = async (
  presetName: string,
  data: Partial<Setting>
): Promise<Setting> => {
  const response = await axios.put(`${API_URL}/settings/${presetName}`, data)
  return response.data
}
