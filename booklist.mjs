import fs from 'fs/promises'

const fileName = "myBooks.json"

class BookList {
    myBooks = { books: [] }


    // Read from file: 
    async loadBooksFromFile() {
        try{
            const data = await fs.readFile(fileName, "utf-8")
            this.myBooks = JSON.parse(data)
        } catch (error) {
            throw error
        }
    }


    // Add new book to file: 
    async addBookToFile(newbook) {
        await this.loadBooksFromFile()
        if (!this.isBookInList(newbook)) {
            this.myBooks.books.push(newbook)
            try {
                await fs.writeFile(fileName, JSON.stringify(this.myBooks), {flag: "w+"})
            } catch(error) {
                throw error
            }
        }
    }


    // Check for duplicates: 
    isBookInList(book) {
        let bookFound = this.myBooks.books.find(item => (
            item.title === book.title &&
            item.author === book.author
        ))
        return bookFound
    }



}

export { BookList }