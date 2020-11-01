import { useReducer } from 'react'
import request from 'superagent'
import { AssetType } from '../types'

export enum Status {
  uploading = 'uploading',
  complete = 'complete',
  error = 'error',
}

function reducer(
  state: {
    [filename: string]: { status: Status; s3url?: string }
  } = {},
  action: { filename: string; status: Status; s3url?: string },
) {
  return {
    ...state,
    [action.filename]: { status: action.status, s3url: action.s3url },
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useS3Upload = () => {
  const [state, dispatch] = useReducer(reducer, {})

  const fileUpload = async (
    files: File[],
    folder: string,
    assetType: AssetType,
    filenameOverride?: string,
  ) => {
    await Promise.all(
      files.map(async (file) => {
        dispatch({
          filename: file.name,
          status: Status.uploading,
        })

        const filename = filenameOverride || file.name

        const data = new FormData()
        data.append('file', file)
        data.append('folder', folder)
        data.append('filename', filename)
        await request
          .post(`/api/s3?assetType=${assetType}`)
          .send(data)
          .then(({ text }) =>
            dispatch({
              filename: file.name,
              s3url: text,
              status: Status.complete,
            }),
          )
          .catch(() =>
            dispatch({
              filename: file.name,
              status: Status.error,
            }),
          )
      }),
    )
  }

  const singleFileUpload = async (
    file: File,
    folder: string,
    assetType: AssetType,
    filenameOverride?: string,
  ): Promise<string> => {
    const filename = filenameOverride || file.name

    const data = new FormData()
    data.append('file', file)
    data.append('folder', folder)
    data.append('filename', filename)
    return request
      .post(`/api/s3?assetType=${assetType}`)
      .send(data)
      .then(({ text }) => {
        return text
      })
      .catch(() => {
        return 'error'
      })
  }

  return {
    fileUpload,
    singleFileUpload,
    state,
  }
}
