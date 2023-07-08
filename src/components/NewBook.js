import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function NewBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [read, setRead] = useState("no");

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const authorChange = (e) => {
    setAuthor(e.target.value);
  };

  const yearChange = (e) => {
    setYear(e.target.value);
  };

  const readChange = (e) => {
    setRead(e.target[e.target.selectedIndex].text);
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setYear("");
  };

  useEffect(() => {
    setRead("No");
  }, []);

  // Change this to add doc to Firebase
  // const addBook = (e) => {
  //   e.preventDefault();

  //   const bookObj = { title, author, year, read };
  //   const clone = books.map((x) => x);

  //   clone.push(bookObj);
  //   setBooks(clone);
  //   console.log(books);
  //   resetForm();
  // };

  const booksRef = collection(db, "books");

  const addBook = async (e) => {
    e.preventDefault();
    resetForm();

    const bookObj = { title, author, year, read, createdAt: serverTimestamp() };

    await addDoc(booksRef, bookObj);
    // console.dir(e.target);
  };

  return (
    <div className="newbook">
      <form onSubmit={addBook}>
        <label htmlFor="title">Title:</label>
        <input
          onChange={titleChange}
          value={title}
          type="text"
          id="title"
        ></input>
        <label htmlFor="author">Author:</label>
        <input
          onChange={authorChange}
          value={author}
          type="text"
          id="author"
        ></input>
        <label htmlFor="year">Publish Year:</label>
        <input
          onChange={yearChange}
          value={year}
          type="number"
          id="year"
        ></input>
        <label htmlFor="read">Read?</label>
        <select id="read" defaultValue={read} onChange={readChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
