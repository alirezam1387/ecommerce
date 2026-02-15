const AsyncHandler = require('../utils/asyncHandller')
const Product = require('../models/product.model')
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
