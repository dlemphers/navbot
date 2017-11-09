import botServer from './server/server';

const port = process.env.PORT || 3978

botServer.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`Server is listening on ${port}`)
})