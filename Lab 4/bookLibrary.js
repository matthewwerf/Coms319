// booksLibrary.JS
var library;
$(document).ready(function(){
	try {
		library = window.localStorage.getItem("library");
		library = new Library(JSON.parse(library));
		//library = $.extend(new Library(), library);
		//library = recastJSON(JSON.parse(library));
	}
	catch (err) {
		library = new Library();
		alert("No past library");
	}
	if (library == null || library == undefined) {
		library = new Library();
		alert("Library undefined");
	}

	buildLibraryTable(library);

	var logoutBtn	= document.getElementById('logout');
	logoutBtn.onclick = function () {
		window.localStorage.setItem("library", JSON.stringify(library));
	}

});

function recastJSON(jsonObject) {
    // return generic object if objectType is not specified
    if (!jsonObject.objectType)
        return jsonObject;

    // otherwise create a new object of type specified
    var obj = eval('new '+jsonObject.objectType+'()');
    for(var i in jsonObject)
        obj[i] = jsonObject[i];
    return obj;
}


class Book{
  constructor() {
		var randomNum = Math.floor(Math.random() * 1000);
		this.bookId = randomNum;
		this.name = 'B' + randomNum.toString();
		this.borrowedBy = null;
		this.available = 1;

		this.objectType = "Book";
  }

	static createBookWithName (name) {
		var newBook = new Book();
		newBook.setBookName(name);
		return newBook;
	}

	setBookName(name) {
		this.name = name;
	}

	setBookId(shelf) {
		if (shelf == 'art'){
			var randomNum = Math.floor(Math.random() * 996) + 0;
			this.bookId = randomNum;
		}else if (shelf == 'science'){
			var randomNum = Math.floor(Math.random() * 996) + 1;
			this.bookId = randomNum;
		}else if (shelf == 'sport'){
			var randomNum = Math.floor(Math.random() * 996) + 2;
			this.bookId = randomNum;
		}else if (shelf == 'literature'){
			var randomNum = Math.floor(Math.random() * 996) + 3;
			this.bookId = randomNum;
		}
	}

	toggleCheckout() {
		if(this.available == 1){
			this.available = 0;
		}
		else {
			this.available = 1;
		}
	}

	getBookName() {
		return this.name;
	}

	getBookAvailability() {
		return this.available;
	}

	getBookId() {
		return this.bookId;
	}

	getBookInfo() {
		var num = this.bookId % 4;
		if (num == 0){
			var shelfName = "Art";
		}else if (num == 1){
			var shelfName = "Science";
		}else if (num == 2){
			var shelfName = "Sport";
		}else{
			var shelfName = "Literature";
		}
		var string = this.name + " is a book on shelf: " + shelfName;
		return string;
	}
}

class Shelf{ //shelf
	//create initial shelves
	constructor(shelfType) {
		if(shelfType == "art") {
			var bookNum = 0;
			var books = [];

			while (bookNum < 7) {
				var newBook = new Book();
				if (newBook.getBookId() % 4 == 0){
					books.push(newBook);
					bookNum++;
				}
			}
			this.shelf = books;
		}else if (shelfType == "science") {
			var bookNum = 0;
			var books = [];

			while (bookNum < 6) {
				var newBook = new Book();
				if (newBook.getBookId() % 4 == 1){
					books.push(newBook);
					bookNum++;
				}
			}
			this.shelf = books;
		}else if (shelfType == "sport") {
			var bookNum = 0;
			var books = [];

			while (bookNum < 6) {
				var newBook = new Book();
				if (newBook.getBookId() % 4 == 2){
					books.push(newBook);
					bookNum++;
				}
			}
			this.shelf = books;
		}else if (shelfType == "literature"){
			var bookNum = 0;
			var books = [];

			while (bookNum < 6) {
				var newBook = new Book();
				if (newBook.getBookId() % 4 == 3){
					books.push(newBook);
					bookNum++;
				}
			}
			this.shelf = books;

			this.objectType = "Shelf";
		}
	}

	getBookShelf(){
		return this.shelf;
	}

	addBookToShelf(book){
		this.shelf.push(book);
	}

}

class Library{ //library
	// create new library
	constructor () {
		this.artShelf = new Shelf("art");
		this.scienceShelf = new Shelf("science");
		this.sportShelf = new Shelf("sport");
		this.literatureShelf = new Shelf("literature");

		this.objectType = "Library";
	}

	libraryCheckout(bookId) {
		var bookNum = bookId.toString();
		bookNum = bookNum.substring(1,4);
		if (bookNum % 4 == 0){
			for (var j = 0; j < this.artShelf.getBookShelf().length; j++){
				var book = this.artShelf.getBookShelf()[j];
				if (book.getBookId() == bookId){
					book.toggleCheckout();

				}
			}
		}else if (bookNum % 4 == 1){
			for (var j = 0; j < this.scienceShelf.getBookShelf().length; j++){
				var book = this.scienceShelf.getBookShelf()[j];
				if (book.getBookId() == bookId){
					book.toggleCheckout();

				}
			}
		}else if (bookNum % 4 == 2){
			for (var j = 0; j < this.sportShelf.getBookShelf().length; j++){
				var book = this.sportShelf.getBookShelf()[j];
				if (book.getBookId() == bookId){
					book.toggleCheckout();

				}
			}
		}else {
			for (var j = 0; j < this.literatureShelf.getBookShelf().length; j++){
				var book = this.literatureShelf.getBookShelf()[j];
				if (book.getBookId() == bookId){
					book.toggleCheckout();
				}
			}
		}
	}

	returnBookObj(bookId) {
		var bookNum = bookId.toString();
		bookNum = bookNum.substring(1,4);
		if (bookNum % 4 == 0){
			for (var j = 0; j < this.artShelf.getBookShelf().length; j++){
				var book = this.artShelf.getBookShelf()[j];
				if (book.getBookId() == bookId){
					return book;
				}
			}
		}else if (bookNum % 4 == 1){
			for (var j = 0; j < this.scienceShelf.getBookShelf().length; j++){
				var book = this.scienceShelf.getBookShelf()[j];
				if (book.getBookId() == bookId){
					return book;
				}
			}
		}else if (bookNum % 4 == 2){
			for (var j = 0; j < this.sportShelf.getBookShelf().length; j++){
				var book = this.sportShelf.getBookShelf()[j];
				if (book.getBookId() == bookId){
					return book;
				}
			}
		}else {
			for (var j = 0; j < this.literatureShelf.getBookShelf().length; j++){
				var book = this.literatureShelf.getBookShelf()[j];
				if (book.getBookId() == bookId){
					return book;
				}
			}
		}
	}// end of return book function

	addToArt(book) {
		this.artShelf.addBookToShelf(book);
	}

	addToScience(book) {
		this.scienceShelf.addBookToShelf(book);
	}

	addToSport(book) {
		this.sportShelf.addBookToShelf(book);
	}

	addToLiterature(book) {
		this.literatureShelf.addBookToShelf(book);
	}

}// end of library class

function buildLibraryTable(library){
	var tableObj = $('#tablecreate');
	var tableString = "";
	tableString += "<table border='2'>";
	tableString += "<tr><th colspan='4'>Library</th></tr>";
	tableString += "<tr><th>Art</th><th>Science</th><th>Sport</th><th>Literature</th></tr>";

	artShelf = library.artShelf.getBookShelf();
	scienceShelf = library.scienceShelf.getBookShelf();
	sportShelf = library.sportShelf.getBookShelf();
	literatureShelf = library.literatureShelf.getBookShelf();

	var iterations = artShelf.length;
	if (scienceShelf.length > iterations) {
		iterations = scienceShelf.length;
	}
	if (sportShelf.length > iterations) {
		iterations = sportShelf.length;
	}
	if(literatureShelf.length > iterations) {
		iterations = literatureShelf.length;
	}

	for (var i = 0; i < iterations; i++){
		artBook = artShelf[i];
		scienceBook = scienceShelf[i];
		sportBook = sportShelf[i];
		literatureBook = literatureShelf[i];

		bookRowString = "<tr>" + generateTableCell(artBook) + generateTableCell(scienceBook);
		bookRowString += generateTableCell(sportBook) + generateTableCell(literatureBook);
		bookRowString += "</tr>";
		tableString += bookRowString;

	}
	tableString += "</table>";
	tableObj.append(tableString);
}

function generateTableCell(bookObj) {
	stringOut = "";
	try {
		if (bookObj.getBookAvailability() == 1){
			stringOut += "<td onClick = 'checkoutBook(" + bookObj.getBookId() + ")'> " + bookObj.getBookName() + "</td>";

		}
		else {
			stringOut += "<td bgcolor='red' onClick = 'checkoutBook(" + bookObj.getBookId() + ")'> " + bookObj.getBookName() + "</td>";
		}
	}
	catch (err) {
		stringOut = "<td></td>"
	}
	return stringOut;
}

function displayBookInfo(bookId) {
	var bookObj = library.returnBookObj(bookId);
	var returnString = bookObj.getBookInfo();

	$('#bookInfo').empty();
	$('#bookInfo').append(returnString);
}

function addBookToLibrary(book, shelf) {
	if (shelf == 'art'){
		book.setBookId();
		library.addToArt(book);
	}else if (shelf == 'science'){
		book.setBookId();
		library.addToScience(book);
	}else if (shelf == 'sport'){
		book.setBookId();
		library.addToSport(book);
	}else if (shelf == 'literature'){
		book.setBookId();
		library.addToLiterature(book);
	}
	var tableObj = $('#tablecreate');
	tableObj.empty();
	buildLibraryTable(library);
}

function checkoutBook(bookId) {
	var checkouts;
	try {
		checkouts = JSON.parse(window.localStorage.getItem('checkouts'));
	}
	catch (err) {
		checkouts = 0;
	}
	if (checkouts == undefined){
		alert('undefined');
		checkouts = 0;
	}

	var bookCheckoutBool = library.returnBookObj(bookId).getBookAvailability();
	console.log(checkouts);
	if (bookCheckoutBool == 1) {
		if (checkouts < 2){
			library.libraryCheckout(bookId);
			var tableObj = $('#tablecreate');
			tableObj.empty();
			buildLibraryTable(library);
			checkouts += 1;
		}
	}
	else {
		library.libraryCheckout(bookId);
		var tableObj = $('#tablecreate');
		tableObj.empty();
		buildLibraryTable(library);
		checkouts -= 1;
	}

	window.localStorage.setItem('checkouts', JSON.stringify(checkouts));
}
