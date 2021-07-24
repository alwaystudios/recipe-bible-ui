import nock from 'nock'
import { LOCALHOST } from '../constants'
import { assetUpload } from './assetUpload'

const file = new File([''], 'file.htm', { type: 'text/html' })
const token = '1234'
const folder = 'folder'
const assetType: AssetType = 'step'
const filenameOverride = 'override'

describe('asset upload', () => {
  it('uploads asset with filename override', async () => {
    nock(LOCALHOST)
      .post(
        '/asset-upload?assetType=step',
        '{"file":"data:text/html;base64,","type":"text/html","folder":"folder","filename":"override"}'
      )
      .matchHeader('Authorization', `Bearer ${token}`)
      .reply(200)

    const result = await assetUpload({ token, file, folder, assetType, filenameOverride })

    expect(result).toEqual({ filename: filenameOverride })
    expect(nock.isDone()).toBe(true)
  })

  it('uploads files without filename override', async () => {
    nock(LOCALHOST)
      .post(
        '/asset-upload?assetType=step',
        '{"file":"data:text/html;base64,","type":"text/html","folder":"folder","filename":"file.htm"}'
      )
      .matchHeader('Authorization', `Bearer ${token}`)
      .reply(200)

    const result = await assetUpload({ token, file, folder, assetType })

    expect(result).toEqual({ filename: 'file.htm' })
    expect(nock.isDone()).toBe(true)
  })

  it('handles errors', async () => {
    nock(LOCALHOST)
      .post(
        '/asset-upload?assetType=step',
        '{"file":"data:text/html;base64,","type":"text/html","folder":"folder","filename":"file.htm"}'
      )
      .matchHeader('Authorization', `Bearer ${token}`)
      .reply(400)

    const result = await assetUpload({ token, file, folder, assetType })

    expect(result).toEqual({ error: true })
    expect(nock.isDone()).toBe(true)
  })

  it('handles authentication errors', async () => {
    nock(LOCALHOST)
      .post(
        '/asset-upload?assetType=step',
        '{"file":"data:text/html;base64,","type":"text/html","folder":"folder","filename":"file.htm"}'
      )
      .matchHeader('Authorization', `Bearer ${token}`)
      .reply(401)

    const result = await assetUpload({ token, file, folder, assetType })

    expect(result).toEqual({ authError: true })
    expect(nock.isDone()).toBe(true)
  })
})
