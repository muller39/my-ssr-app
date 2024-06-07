import { createServer as createViteServer } from 'vite'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production'
const resolve = (p: string) => path.resolve(__dirname, p)

async function createServer() {
  const express = require('express')
  const fs = require('fs')

  const app = express()
  const port = 3000

  let vite
  if (!isProd) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })

    app.use(vite.middlewares)
  } else {
    app.use('/dist/client', express.static(resolve('../dist/client')))
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        template = fs.readFileSync(resolve('../index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      } else {
        template = fs.readFileSync(resolve('../dist/client/index.html'), 'utf-8')
        render = require(resolve('../dist/server/entry-server.js')).render
      }

      const { appContent, state } = await render(url)
      const html = template
        .replace(`<!--ssr-outlet-->`, appContent)
        .replace(`'<!--pinia-state-->'`, JSON.stringify(state))

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  app.listen(port, () => {
    console.log('Server is running on http://localhost:3000')
  })
}

createServer()
