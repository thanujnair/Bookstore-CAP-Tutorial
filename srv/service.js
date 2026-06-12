
const { Books } = require('#cds-models/BookstoreService')
const { Genre } = require('#cds-models/tutorial/db')
const cds = require('@sap/cds') //Import of library cds

module.exports = class BookstoreService extends cds.ApplicationService { init() {

  //const { Books } = cds.entities('BookstoreService')

  this.before (['READ'], Books , async (req) => {
    console.log('Before READ Books')
  })

this.on ('READ', Books, async (req, next) => {
    console.log('During READ Books')
    return next()
})

  this.after (['READ'], Books, async (books, req) => {
    for (const book of books) {
      if (book.genre_code === Genre.Horror) {
        book.price = book.price * 0.8
        book.title += ' *Discounted'
      }
    }
    console.log('After READ Books')
  })

/*
  const { Books, Authors, GenresVH, BookStatus, Chapters } = cds.entities('BookstoreService')

  this.before (['CREATE', 'UPDATE'], Books, async (req) => {
    console.log('Before CREATE/UPDATE Books', req.data)
  })
  this.after ('READ', Books, async (books, req) => {
    console.log('After READ Books', books)
  })
  
  this.before (['CREATE', 'UPDATE'], Authors, async (req) => {
    console.log('Before CREATE/UPDATE Authors', req.data)
  })
  this.after ('READ', Authors, async (authors, req) => {
    console.log('After READ Authors', authors)
  })
  this.before (['CREATE', 'UPDATE'], GenresVH, async (req) => {
    console.log('Before CREATE/UPDATE GenresVH', req.data)
  })
  this.after ('READ', GenresVH, async (genresVH, req) => {
    console.log('After READ GenresVH', genresVH)
  })
  this.before (['CREATE', 'UPDATE'], BookStatus, async (req) => {
    console.log('Before CREATE/UPDATE BookStatus', req.data)
  })
  this.after ('READ', BookStatus, async (bookStatus, req) => {
    console.log('After READ BookStatus', bookStatus)
  })
  this.before (['CREATE', 'UPDATE'], Chapters, async (req) => {
    console.log('Before CREATE/UPDATE Chapters', req.data)
  })
  this.after ('READ', Chapters, async (chapters, req) => {
    console.log('After READ Chapters', chapters)
  })
*/

  return super.init()
}}
