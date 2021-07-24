import request from 'superagent'
import { API_BASE_URL } from '../constants'

type FileUpload = {
  token: string
  file: File
  folder: string
  assetType: AssetType
  filenameOverride?: string
}

const fileToBase64 = (file: File): Promise<string | ArrayBuffer> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = function (event) {
      resolve(event.target.result)
    }

    reader.readAsDataURL(file)
  })
}

type AssetUpload = {
  filename?: string
  error?: boolean
  authError?: boolean
}

const AuthError: AssetUpload = { authError: true }
const Error: AssetUpload = { error: true }

export const assetUpload = async ({
  token,
  file,
  folder,
  assetType,
  filenameOverride,
}: FileUpload): Promise<AssetUpload> => {
  const filename = filenameOverride || file.name

  const _file = await fileToBase64(file)

  return request
    .post(`${API_BASE_URL}/asset-upload?assetType=${assetType}`)
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .send({ file: _file, type: file.type, folder, filename })
    .then(() => ({
      filename,
    }))
    .catch((err) => (err.message === 'Unauthorized' ? AuthError : Error))
}
