abstract class Book {
  String bookName;
  String auther;
  Book(this.bookName, this.auther);

  void borrow() {}
  void returnBook() {}
}

class Ebook extends Book {
  double fileSize;
  Ebook(String bookName, String auther, this.fileSize)
    : super(bookName = bookName, auther = auther);
  @override
  void borrow() {
    print("borrowed Ebook is $bookName");
  }

  @override
  void returnBook() {
    print("Ebook $bookName returned");
  }

  void downloadBook() {
    print("Downloading Ebook $bookName whose auther is $auther");
  }
}

class PrintedBook extends Book {
  int _bookAvailable;
  PrintedBook(String bookName, String auther, int bookAvailable)
    : _bookAvailable = bookAvailable,
      super(bookName = bookName, auther = auther);

  @override
  void borrow() {
    if (_bookAvailable > 0) {
      _bookAvailable--;
      print(
        "Printed book $bookName is borrowed whose auther is $auther and there are $_bookAvailable Copies left",
      );
    } else {
      print("The book you are asking for isn't currently available");
    }
  }

  @override
  void returnBook() {
    _bookAvailable++;
    print(
      "Printed book $bookName is returned and there are $_bookAvailable Copies left",
    );
  }

  bool isAvailable() => _bookAvailable > 0;
}

class Library {
  List<Book> books = [];

  void addBook(Book book) {
    books.add(book);
    print("Books available in the library are: $books");
  }

  void borrowBook(String bookname) {
    Book? foundBook = books.firstWhere(
      (book) => book.bookName.toLowerCase() == bookname.toLowerCase(),
      orElse: () => NullBook(),
    );

    if (foundBook is NullBook) {
      print("This book isn't available in the library");
    } else {
      foundBook.borrow();
    }
  }

  void returnBook(bookname) {
    Book? foundBook = books.firstWhere(
      (book) => book.bookName.toLowerCase() == bookname.toLowerCase(),
      orElse: () => NullBook(),
    );

    if (foundBook is NullBook) {
      print("This book isn't available in the library");
    } else {
      foundBook.returnBook();
    }
  }
}

class NullBook extends Book {
  NullBook() : super("Unknown", "Unknown");

  @override
  void borrow() {
    print("This book isn't available in the library");
  }

  @override
  void returnBook() {
    print("This book isn't available in the library");
  }
}
