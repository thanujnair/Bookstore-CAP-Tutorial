
const { Books } = require('#cds-models/BookstoreService')
const { Genre } = require('#cds-models/tutorial/db')
const cds = require('@sap/cds') //Import of library cds

module.exports = class BookstoreService extends cds.ApplicationService {
  init() {

    //const { Books } = cds.entities('BookstoreService')

    this.on('addDiscount', async (req) => {
      await UPDATE(Books)           //Await needed as update is a promise. If not awaited, the function will return before the update is completed. And Async is used.
        // .set({ price: { '*=': 0.9 } })      //Updates all Books. Simple function without rounding and decimal places limitation.
        .set({ price: { func: 'ROUND', args: [{ xpr: [{ ref: ['price'] }, '*', { val: 0.9 }] }, { val: 2 }] } })
    })

    this.on('addStock', Books, async (req) => {
      console.log('Stock added to Book: ', req.params[0])
      const bookID = req.params[0].ID
      //const { ID } = req.params[0] Same as Line above. ID is mapped
      await UPDATE(Books)           //Await needed as update is a promise. If not awaited, the function will return before the update is completed. And Async is used.
        .set({ stock: { '+=': 1 } })
        .where({ ID: bookID })
    })

    this.on('changePublishDate', Books, async (req) => {
      console.log('Publish date changed for Book: ', req.data)
      const bookID = req.params[0].ID
      const newDate = req.data.newDate

      await UPDATE(Books)           //Await needed as update is a promise. If not awaited, the function will return before the update is completed. And Async is used.
        .set({ publishedAt: newDate })
        .where({ ID: bookID })

    })

    this.on('changeStatus', Books, async (req) => {
      console.log('Status changed for Book: ', req.data)
      const bookID = req.params[0].ID
      const newStatus = req.data.newStatus

      await UPDATE(Books)           //Await needed as update is a promise. If not awaited, the function will return before the update is completed. And Async is used.
        .set({ status_code: newStatus })
        .where({ ID: bookID })

    })

    this.before(['READ'], Books, async (req) => {
      console.log('Before READ Books')
    })

    this.on('READ', Books, async (req, next) => {
      console.log('During READ Books')
      return next()
    })

    this.after(['READ'], Books, async (books, req) => {
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
  }
}
