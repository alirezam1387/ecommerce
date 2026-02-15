const AsyncHandler = require('../utils/asyncHandller')
const Product = require('../models/product.model')
const ErrorHandler = require('../middlewere/ErrorHandler')


exports.addProduct = AsyncHandler(async (req, res, next) => {
  try {
    const { title, description, price, count, colors, size, OffNum } = req.body

    const links = req.body.link ? JSON.parse(req.body.links) : {}

    if (!title || !description || !price) {
      return res.status(400).json({
        success: false,
        message: 'Title, description and price are required',
      })
    }

    const mainPhoto = req.files?.mainPhoto
      ? req.files.mainPhoto[0].path
      : undefined

    const gallery = req.files?.gallery
      ? req.files.gallery.map((file) => file.path)
      : []

    console.log(req.files)
    const product = new Product({
      title,
      description,
      price,
      mainPhoto: mainPhoto || undefined, // will fallback to default
      gallery: gallery || [],
      count: count || 0,
      colors: colors || [],
      size: size || [],
      OffNum,
      links: {
        instagram: links?.instagram || '',
        telegram: links?.telegram || '',
        whatsapp: links?.whatsapp || '',
      },
    })

    const savedProduct = await product.save()

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: savedProduct,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    })
  }
})

exports.getProduct = AsyncHandler(async (req, res, next) => {
  const productId = req.params.id
  const data = await Product.findById(productId)
  if (!data) {
    return next(new ErrorHandler('there is no object with this id', 404))
  }

  res.status(200).json({
    success: true,
    data
  })
})

exports.editProduct = AsyncHandler(async (req, res, next) => {
  const productId = req.params.id
  const data = await Product.findById(productId)
  if (!data) {
    return next(new ErrorHandler('there is no object with this id', 404))
  }

  const { title, description, price, count, colors, size, OffNum } = req.body
  const links = req.body.links && JSON.parse(req.body.links)
  const mainPhoto = req.files?.mainPhoto ? req.files.mainPhoto[0].path : undefined
  const gallery = req.files?.gallery ? req.files.gallery.map(file => file.pate) : undefined

  const UpdateData = await Product.findByIdAndUpdate(productId,
    { title, description, price, count, colors, size, OffNum, links, mainPhoto, gallery },
    {
      new: true,
      runValidators: true
    }
  )

  res.status(200).json({
    success: true,
    data: UpdateData
  })
})

exports.deleteProduct = AsyncHandler(async (req, res, next) => {
  const productId = req.params.id
  const data = await Product.findById(productId)
  if (!data) {
    return next(new ErrorHandler('there is no object with this id', 404))
  }
  await data.deleteOne()
  res.status(204)
})