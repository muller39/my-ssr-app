import { createApp } from './main'
import './styles.scss'

const { app, router, store } = createApp()

// if (window.__INITIAL_STATE__) {
//   store.state.value = JSON.parse(window.__INITIAL_STATE__)
// }

router.isReady().then(() => {
  app.mount('#app')
})
