import express from 'express'
import { BookList } from './booklist.mjs'
import { body, validationResult } from 'express-validator'

const router = express.Router()
const bookList = new BookList()

router.get("/books", async(req,res) => {
    await bookList.loadBooksFromFile()
    res.render('booklist', {books: bookList.myBooks.books})
})

router.get("/addbookform", (req,res) => {
    res.render('addbookform')
})

router.post(
    "/doaddbook", 

    body("newBookTitle")
    .isAlpha('el-GR').trim().escape()
    .withMessage("Πρέπει να είναι γραμμένο στα Ελληνικά")
    .isLength({min: 5})
    .withMessage("Πρέπει να είναι τουλάχιστον 5 χαρακτήρες"),

    body("newBookAuthor")
    .isAlpha('el-GR').trim().escape()
    .withMessage("Πρέπει να είναι γραμμένο στα Ελληνικά")
    .isLength({min: 5})
    .withMessage("Πρέπει να είναι τουλάχιστον 5 χαρακτήρες"),



    async(req,res) => {

        const errors = validationResult(req)

        if (errors.isEmpty()) {
            const newBook = {
                "title": req.body["newBookTitle"],
                "author": req.body["newBookAuthor"]
            }
            await bookList.addBookToFile(newBook)
            res.redirect('/books')
        }
        else {
            res.render("addbookform", { 
                message: errors.mapped(),
                title: req.body["newBookTitle"],
                author: req.body["newBookAuthor"]
            })
        }

    })

export { router }