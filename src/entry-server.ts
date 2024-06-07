import { createApp } from './main'
import { renderToString } from '@vue/server-renderer'

export async function render(url: string, manifest: any) {
  const { app, router, store } = createApp()

  router.push(url)
  await router.isReady()

  const appContent = await renderToString(app)

  return { appContent, state: store.state.value }
}
