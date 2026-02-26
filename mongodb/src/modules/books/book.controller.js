import { Router } from "express";
import * as bookServices from "./book.service.js";
const router = Router();

//1- create collection books and validate title not empty
router.post("/collection", async (req, res) => {
  const result = await bookServices.createColl();
  res
    .status(result.statusCode)
    .json({ ok: result.ok, message: result.message });
});

//5- insert new doc in books
router.post("/", async (req, res) => {
  const result = await bookServices.createDoc(req.body);
  res.status(result.statusCode).json({
    acknowledged: result.acknowledged,
    message: result.message,
    insertedId: result.insertedId,
  });
});

//6. Insert multiple documents
router.post("/batch", async (req, res) => {
  const result = await bookServices.createMult(req.body);
  res.status(result.statusCode).json({
    message: result.message,
    acknowledged: result.acknowledged,
    insertedIds: result.insertedIds,
  });
});

//8. Update the book with title
router.patch("/:title", async (req, res) => {
  const result = await bookServices.updateDoc(req.params);
  res.status(result.statusCode).json({
    message: result.message,
    acknowledged: result.acknowledged,
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
  });
});

//9. Find a Book with title
router.get("/title", async (req, res) => {
  const result = await bookServices.findDoc(req.query);
  res.status(result.statusCode).json({
    message: result.message,

    book: result.book,
  });
});

//10. Find all books published between 1990 and 2010
router.get("/year", async (req, res) => {
  try {
    const { from, to } = req.query;
    const result = await bookServices.findByYear(from, to);
    console.log(result.books);

    res.status(result.statusCode).json({
      message: result.message,
      books: result.books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

//11. Find books where the genre includes "Science Fiction"
router.get("/genre", async (req, res) => {
  try {
    const result = await bookServices.findByGenre(req.query);

    res.status(result.statusCode).json({
      message: result.message,
      books: result.books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

//12. Skip the first two books, limit the results to the next three, sorted by year in descending
router.get("/skip-limit", async (req, res) => {
  try {
    const result = await bookServices.findBySkipLimit();
    res.status(result.statusCode).json({
      message: result.message,
      books: result.books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

//13. Find books where the year field stored as an integer
router.get("/year-integer", async (req, res) => {
  try {
    const result = await bookServices.findIntYear();
    res.status(result.statusCode).json({
      message: result.message,
      books: result.books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

//14.Find all books where the genres field does not include any of the genres "Horror" or"Science Fiction"

router.get("/exclude-genres", async (req, res) => {
  try {
    const result = await bookServices.findExcludeGenre();

    res.status(result.statusCode).json({
      message: result.message,
      books: result.books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

//15. Delete all books published before 2000.
router.delete("/before-year", async (req, res) => {
  try {
    const { year } = req.query;
    const result = await bookServices.DeleteBeforeYear(year);
    res.status(result.statusCode).json({
      message: result.message,
      books: result.books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

//16. Using aggregation Functions, Filter books published after 2000 and sort them by year descending.

router.get("/aggregate1", async (req, res) => {
  try {
    const results = await bookServices.aggregation1();
    res.status(results.statusCode).json({
      message: results.message,
      books: results.result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

router.get("/aggregate2", async (req, res) => {
  try {
    const results = await bookServices.aggregation2();
    res.status(results.statusCode).json({
      message: results.message,
      books: results.result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

router.get("/aggregate3", async (req, res) => {
  try {
    const results = await bookServices.aggregation3();
    res.status(results.statusCode).json({
      message: results.message,
      books: results.result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

router.get("/aggregate4", async (req, res) => {
  try {
    const results = await bookServices.aggregation4();
    res.status(results.statusCode).json({
      message: results.message,
      books: results.result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error", error });
  }
});
export default router;
