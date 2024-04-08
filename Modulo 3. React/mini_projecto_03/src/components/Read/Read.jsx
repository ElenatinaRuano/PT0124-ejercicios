import "./Read.css"
import { Hobbies } from "../Hobbies/Hobbies"

export const Books = () => {
    const data = Hobbies;

    return(
        <div id="books" className="container">
            <h2>TOP SAGAS DE LIBROS</h2>
            {data.read.map((book) =>
                <div key={book.title} id="book-card">
                    <img id="books-img" src={book.image} alt={book.title}/>
                    <h3>{book.title}</h3>
                    <h4>{book.authorName} - {book.dateOfPublication}</h4>
                    <p>{book.saga.map((item)=>
                        <p key = {item}>{item}</p>)}</p>
                </div>
            )}
        </div>
    )
}