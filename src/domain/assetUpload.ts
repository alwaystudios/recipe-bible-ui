import request from 'superagent'
import { API_BASE_URL } from '../contstants'

type FileUpload = {
  token: string
  file: File
  folder: string
  assetType: AssetType
  filenameOverride?: string
}

export const assetUpload = async ({
  token,
  file,
  folder,
  assetType,
  filenameOverride,
}: FileUpload): Promise<string> => {
  const filename = filenameOverride || file.name

  const data = new FormData()
  data.append('file', file)
  data.append('type', file.type)
  data.append('folder', folder)
  data.append('filename', filename)
  return request
    .post(`${API_BASE_URL}/asset-upload?assetType=${assetType}`)
    .set('Authorization', `Bearer ${token}`)
    .send(data)
    .then(({ text }) => {
      return text
    })
    .catch(() => {
      return 'error'
    })
}
