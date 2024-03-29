const express = require("express");
const router=express.Router();
const auth = require("../middlewares/auth");
const { BookController } = require('../controller');

router.route('/')
      .get(BookController.getBooks)
      .post(auth(),BookController.add_book);

router.route('/userBooks')
      .delete(auth(),BookController.deleteBook);

router.post('/img',auth(),BookController.check_img);

router.get('/search',BookController.searchBooks);


module.exports = router;

  //on /
  //get route to get all books (with page limit of 16), implement pagination plugin.
  //post to post a book

  //on l:id
  //delete to delete a book
  //patch to update a book

  //on /?abc....
  //get with filter as req.query, to get with certain filters
