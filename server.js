const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const redirects = [
  { from: '/', to: '/city/phuket' },
]

app.prepare()
  .then(() => {
    const server = express()

    redirects.forEach(({ from, to, method = 'get' }) => {
      server[method](from, (req, res) => {
        res.redirect(to)
      })
    })

    server.get('/activity/:id', (req, res) => {
      const actualPage = '/activity'
      const queryParams = { title: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('/city/:city', (req, res) => {
      const actualPage = '/city'
      const queryParams = { city: req.params.city }
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })