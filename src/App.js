import "./App.css";
import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import NewBook from "./components/NewBook";
import Login from "./components/Login";

function App() {
  const [books, setBooks] = useState([]);
  const booksRef = collection(db, "books");
  const q = query(booksRef, orderBy("createdAt"));

  // useEffect(() => {
  //   const bookList = [];

  //   const getBooks = async () => {
  //     const querySnapshot = await getDocs(booksRef);
  //     querySnapshot.docs.forEach((doc) => {
  //       bookList.push(doc.data());
  //     });
  //     setBooks(bookList);
  //   };

  //   getBooks();
  // });

  useEffect(() => {
    const unsub = onSnapshot(q, (snapshot) => {
      let bookList = [];
      snapshot.docs.forEach((doc) => {
        bookList.push({ ...doc.data(), id: doc.id });
      });
      setBooks(bookList);
      console.log(bookList);
    });
  }, []);

  const deleteBook = async (id) => {
    const docRef = doc(db, "books", id);
    await deleteDoc(docRef);
  };

  const updateBook = async (id) => {
    const docRef = doc(db, "books", id);
    const docObj = await getDoc(docRef);
    let readType = "";

    if (docObj.data().read === "Yes") {
      readType = "No";
    } else if (docObj.data().read === "No") {
      readType = "Yes";
    }

    await updateDoc(docRef, { read: readType });
  };

  return (
    <div className="App">
      <h1>Library</h1>
      <Login />
      <NewBook />
      {books.map((book) => {
        return (
          <ul key={book.id}>
            <li>{book.title}</li>
            <li>{book.author}</li>
            <li>{book.year}</li>
            <li className="read" onClick={() => updateBook(book.id)}>
              {book.read}
            </li>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </ul>
        );
      })}
    </div>
  );
}

export default App;
