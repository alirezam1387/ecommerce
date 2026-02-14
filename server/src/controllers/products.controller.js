const AsyncHandler = require('../utils/asyncHandller')

exports.addProduct = AsyncHandler((req, res, next) => {
  // const { title, description, price, count, colors, size, OffNum, sellCount, links } = req.body
  console.log(req.file)
  res.end()
})
