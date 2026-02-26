// import { bookModel } from "../../DB/models/book.model.js";
import { Int32 } from "mongodb";
import { db } from "../../DB/connection.js";

// create Collection books
export const createColl = async () => {
  try {
    const bookModel = db.createCollection("books", {
      validator: { title: { $type: "string" } },
    });
    // await bookModel.insertOne({ ...inputs });
    // console.log("insert new doc successfull");
    return {
      ok: 1,
      statusCode: 200,
      message: "create book collection successfull",
    };
  } catch (error) {
    console.log("can't create collection!!", error);
    return { ok: 0, message: "can't create collection!!", statusCode: 409 };
  }
};

//create new doc in book collection
export const createDoc = async (inputs) => {
  try {
    const result = await db.collection("books").insertOne({ ...inputs });
    console.log("insert new doc successfull");
    return {
      acknowledged: true,
      insertedId: result.insertedId,
      statusCode: 200,
      message: "insert new doc successfull",
    };
  } catch (error) {
    console.log("can't insert doc!!", error);
    return {
      acknowledged: false,
      message: "can't insert doc!!",
      statusCode: 409,
    };
  }
};

//create multiple doc
export const createMult = async (inputs) => {
  try {
    const result = await db.collection("books").insertMany(inputs);
    console.log("insert new multiple doc successfull");

    return {
      acknowledged: true,
      insertedIds: result.insertedIds,
      statusCode: 200,
      message: "insert new multiple doc successfull",
    };
  } catch (error) {
    console.log("can't insert doc!!", error);
    return {
      acknowledged: false,
      message: "can't insert doc!!",
      statusCode: 409,
    };
  }
};

//update year in book by title
export const updateDoc = async (data) => {
  try {
    const { title } = data;
    const book = await db.collection("books").findOne({ title });

    console.log(book, title);

    if (!book) {
      console.log("not found this book!!");
      return {
        message: "not found this book!!",
        acknowledged: false,
        modifiedCount: 0,
        matchedCount: 0,
        statusCode: 404,
      };
    }
    const result = await db
      .collection("books")
      .updateOne({ title }, { $set: { year: 2022 } });
    console.log("updated successfull");
    return {
      message: "updated successfull",
      statusCode: 200,
      acknowledged: result.acknowledged,
      modifiedCount: result.modifiedCount,
      matchedCount: result.matchedCount,
    };
  } catch (error) {
    console.log("can't update this book!", error);
    return { message: "can't update this book!", statusCode: 409 };
  }
};

//find by title quary params
export const findDoc = async (inputs) => {
  const { title } = inputs;
  const book = await db.collection("books").findOne({ title });
  if (!book) {
    console.log("not found this book!!");
    return {
      message: "not found this book!!",
      statusCode: 404,
    };
  }
  console.log(book);
  return {
    book,
    message: "find book successfull",
    statusCode: 200,
  };
};

//Find all books published between period
export const findByYear = async (from, to) => {
  try {
    const fromYear = Number(from);
    const toYear = Number(to);
    const books = await db
      .collection("books")
      .find({ year: { $gte: fromYear, $lte: toYear } })
      .toArray();

    if (!books.length) {
      console.log("doesn't find any books at this period!!");
      return {
        message: "doesn't find any books at this period!!",
        statusCode: 404,
      };
    }
    return {
      message: "the books between this period: ",
      books,
      statusCode: 200,
    };
  } catch (error) {
    console.log("error on find books!!", error);
    return {
      message: "internal server error!",
      statusCode: 405,
    };
  }
};

//Find books where the genre includes "Science Fiction"
export const findByGenre = async (input) => {
  try {
    const { genre } = input;
    const books = await db.collection("books").find({ genre }).toArray();
    if (!books.length) {
      console.log("zero books has this genre!");
      return {
        message: "zero books has this genre!",
        statusCode: 404,
      };
    }
    return {
      message: "the books has this genre: ",
      statusCode: 200,
      books,
    };
  } catch (error) {
    console.log("cann't find books!", error);
  }
};

//12. Skip the first two books, limit the results to the next three, sorted by year in descending
export const findBySkipLimit = async () => {
  try {
    const books = await db
      .collection("books")
      .find()
      .skip(2)
      .limit(3)
      .sort({ year: -1 })
      .toArray();
    if (!books.length) {
      console.log("no books found in db");
      return {
        message: "no books found in db",
        statusCode: 404,
      };
    }
    return {
      message: "the books found: ",
      books,
      statusCode: 201,
    };
  } catch (error) {
    console.log("faild of found books!", error);
    return {
      message: "faild of found books!",
      statusCode: 405,
    };
  }
};

//13. Find books where the year field stored as an integer

export const findIntYear = async () => {
  try {
    const books = await db
      .collection("books")
      .find({ year: { $type: 16 } })
      .toArray();
    if (!books.length) {
      console.log("no books found in db");
      return {
        message: "no books found in db",
        statusCode: 404,
      };
    }
    return {
      message: "the books found: ",
      books,
      statusCode: 201,
    };
  } catch (error) {
    console.log("faild of found books!", error);
    return {
      message: "faild of found books!",
      statusCode: 405,
    };
  }
};
//14. Find all books where the genres field does not include any of the genres "Horror" or"Science Fiction"

export const findExcludeGenre = async () => {
  try {
    const books = await db
      .collection("books")
      .find({ genre: { $nin: ["Horror", "Science Fiction"] } })
      .toArray();
    if (!books.length) {
      console.log("zero books has this genre!");
      return {
        message: "zero books has this genre!",
        statusCode: 404,
      };
    }
    return {
      message: "the books has this genre: ",
      statusCode: 200,
      books,
    };
  } catch (error) {
    console.log("cann't find books!", error);
  }
};

//15. Delete all books published before 2000.

export const DeleteBeforeYear = async (data) => {
  try {
    const year = Number(data);
    const result = await db
      .collection("books")
      .deleteMany({ year: { $lt: year } });
    console.log(result);

    if (result.deletedCount == 0) {
      return {
        acknowledged: result.acknowledged,
        deletedCount: result.deletedCount,
        statusCode: 404,
        message: "not found books published before this year!",
      };
    }
    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
      statusCode: 201,
      message: "delete successfull",
    };
  } catch (error) {
    console.log("cann't delete books!", error);
    return {
      acknowledged: result.acknowledged,
      deletedCount: result.deletedCount,
      statusCode: 405,
      message: "cann't delete books!",
    };
  }
};

//16. Using aggregation Functions, Filter books published after 2000 and sort them by year descending.

export const aggregation1 = async () => {
  try {
    const result = await db
      .collection("books")
      .aggregate([{ $match: { year: { $gt: 2000 } } }, { $sort: { year: -1 } }])
      .toArray();
    return {
      message: "the result of aggregation: ",
      statusCode: 200,
      result,
    };
  } catch (error) {
    console.log("cann't do aggregation!!!\n", error);

    return {
      statusCode: 405,
      message: "cann't do aggregation!!!",
    };
  }
};
//17. Using aggregation functions, Find all books published after the year 2000. For each matching book, show only the title, author, and year fields

export const aggregation2 = async () => {
  try {
    const result = await db
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $sort: { year: -1 } },
        { $project: { title: 1, year: 1, author: 1, _id: 0 } },
      ])
      .toArray();
    return {
      message: "the result of aggregation: ",
      statusCode: 200,
      result,
    };
  } catch (error) {
    console.log("cann't do aggregation!!!\n", error);

    return {
      statusCode: 405,
      message: "cann't do aggregation!!!",
    };
  }
};

//18. Using aggregation functions,break an array of genres into separate documents
export const aggregation3 = async () => {
  try {
    const result = await db
      .collection("books")
      .aggregate([{ $unwind: "$genre" }])
      .toArray();
    return {
      message: "the result of aggregation: ",
      statusCode: 200,
      result,
    };
  } catch (error) {
    console.log("cann't do aggregation!!!\n", error);

    return {
      statusCode: 405,
      message: "cann't do aggregation!!!",
    };
  }
};

//19. Using aggregation functions, Join the books collection with the logs collection
export const aggregation4 = async () => {
  try {
    const result = await db
      .collection("books")
      .aggregate([
        {
          $lookup: {
            from: "logs",
            localField: "_id",
            foreignField: "bookId",
            as: "bookLogs",
          },
        },
      ])
      .toArray();
    return {
      message: "the result of aggregation: ",
      statusCode: 200,
      result,
    };
  } catch (error) {
    console.log("cann't do aggregation!!!\n", error);

    return {
      statusCode: 405,
      message: "cann't do aggregation!!!",
    };
  }
};
