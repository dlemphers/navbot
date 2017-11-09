import * as express from 'express';

class BotServer {
  
  public express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    router.get('/', (_, res) => {
      res.json({
        message: 'Hello Yo!'
      })
    })
    this.express.use('/', router)
  }
}

export default new BotServer().express