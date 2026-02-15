const mongoose = require('mongoose')
 // delete 
 const fs = require('fs').promises
 const path = require('path')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mainPhoto: {
    type: String,
    default: 'no-photo.jpg',
    required: true,
  },
  gallery: [
    {
      type: String,
    },
  ],
  count: {
    type: Number,
    default: 0,
  },
  colors: [
    {
      type: String,
    },
  ],
  size: [
    {
      type: String,
    },
  ],
  OffNum: {
    type: Number,
    default: undefined,
  },
  // likedUsers: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  // catRef: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  //   required: true,
  // },
  sellCount: {
    type: Number,
    default: 0,
  },
  links: {
    instagram: { type: String, default: '' },
    telegram: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

productSchema.pre('deleteOne', { query: false, document: true }, async function (next) {
  const deletedItems = []

  if (this.mainPhoto) {
    deletedItems.push(this.mainPhoto)
  }

  if (this.gallery && Array.isArray(this.gallery)) {
    deletedItems.push(...this.gallery)
  }

  for (const filePath of deletedItems) {
    const fullPath = path.join(__dirname,'..','..' , filePath)
    await fs.unlink(fullPath)
  }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
