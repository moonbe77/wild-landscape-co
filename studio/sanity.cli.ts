import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'pxvtpuf1',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
