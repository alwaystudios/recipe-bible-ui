import nock from 'nock'
import { LOCALHOST } from '../contstants'
import { assetUpload } from './assetUpload'

const file = new File([''], 'file.htm', { type: 'text/html' })
const token = '1234'
const folder = 'folder'
const assetType: AssetType = 'step'
const filenameOverride = 'override'

describe('asset upload', () => {
  it('uploads asset with filename override', async () => {
    nock(LOCALHOST)
      .post('/asset-upload?assetType=step', {})
      .matchHeader('Authorization', `Bearer ${token}`)
      .reply(200, filenameOverride)

    const result = await assetUpload({ token, file, folder, assetType, filenameOverride })

    expect(result).toBe(filenameOverride)
    expect(nock.isDone()).toBe(true)
  })

  it('uploads files without filename override', async () => {
    nock(LOCALHOST)
      .post('/asset-upload?assetType=step', {})
      .matchHeader('Authorization', `Bearer ${token}`)
      .reply(200, 'file.htm')

    const result = await assetUpload({ token, file, folder, assetType })

    expect(result).toBe('file.htm')
    expect(nock.isDone()).toBe(true)
  })
})