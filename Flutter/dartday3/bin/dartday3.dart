import 'package:dartday3/bank_account.dart';
import 'package:dartday3/library_system.dart';
import 'package:dartday3/shape.dart';
import 'package:dartday3/school_management_system.dart';
import 'package:dartday3/game_charactars.dart';
import 'package:dartday3/ecommmerce.dart';
import 'package:dartday3/dynamic_confoguration_system.dart';
import 'package:dartday3/shopping_cart.dart';
import 'package:dartday3/vehicle_system.dart';
import 'package:dartday3/real_time_notfication_system.dart';

void main(List<String> arguments) {
  print(
    "\n---------------------------------------------------------------------------- Task1--------------------------------------",
  );
  // *Task 1
  Account bankAccount = Account(2, 50000, 'Jameela');
  CurrentAccount currentAccount = CurrentAccount(1000, 2, 50000, 'Jameela');
  bankAccount.checkBalance();
  bankAccount.deposit(2000);
  currentAccount.overDraftHandler(999);
  // *Task 2

  print(
    "\n---------------------------------------------------------------------------- Task2--------------------------------------",
  );
  Library library = Library();

  Ebook ebook = Ebook("Flutter Guide", "Alice Smith", 5.5);
  PrintedBook printedBook = PrintedBook("Dart in Action", "Bob Johnson", 2);

  library.addBook(ebook);
  library.addBook(printedBook);

  // ? Borrowing Books
  print("\n--- Borrowing Books ---");
  library.borrowBook("Flutter Guide");
  ebook.downloadBook();

  library.borrowBook("Dart in Action");
  library.borrowBook("Dart in Action");
  library.borrowBook("Dart in Action"); // ! unavailable

  // ? Returning Books
  print("\n--- Returning Books ---");
  library.returnBook("Dart in Action");

  // ? Check availability
  print("\n--- Check availability ---");
  print("Is 'Dart in Action' available? ${printedBook.isAvailable()}");

  // *TAsk 3

  print(
    "\n---------------------------------------------------------------------------- Task3--------------------------------------",
  );
  print("\n--- Rectangle ---");
  Rectangle rectangle = Rectangle(5, 3);
  rectangle.calculateArea();
  rectangle.perimeter();
  print("\n--- Circle ---");
  Circle circle = Circle(5);
  circle.calculateArea();
  circle.perimeter();
  print("\n--- Triangle ---");
  Triangle triangle = Triangle(10, 6, 6, 12);
  triangle.calculateArea();
  triangle.perimeter();
  print("\n--- Cube ---");
  Cube cube = Cube(3);
  cube.calculateArea();
  cube.volume();
  // *TAsk 4

  print(
    "\n---------------------------------------------------------------------------- Task4--------------------------------------",
  );
  List<Person> schoolMembers = [
    Student(1, "Jameela", "A+"),
    Teacher(2, "Mr. Ahmed", "Math"),
    Staff(3, "Khadijah", "HR"),
  ];

  for (var member in schoolMembers) {
    member.displayDetails();
    print("Role: ${member.getRole()}");
  }
  // *TAsk5

  print(
    "\n---------------------------------------------------------------------------- Task5--------------------------------------",
  );
  List<Character> team = [Warrior("Aragon"), Mage("Merlin"), Archer("Legolas")];

  for (var character in team) {
    character.attack();
    character.defend();
    character.heal();
    print("----------");
  }

  // *TAsk6

  print(
    "\n---------------------------------------------------------------------------- Task6--------------------------------------",
  );
  var cart1 = ShoppingCart1();

  var book = PhysicalProduct("Dart Book", 30.0, 1.2, 5.0);
  var app = DigitalProduct("Music App", 15.99, 120.5, "https://download.link");

  cart1.addProduct(book);
  cart1.addProduct(app);

  cart1.showCart();

  // *TAsk7

  print(
    "\n---------------------------------------------------------------------------- Task7--------------------------------------",
  );

  List<Configurable> configs = [AppConfig(), ServerConfig(), UserConfig()];

  applyAllConfigs(configs);
  // *TAsk8

  print(
    "\n---------------------------------------------------------------------------- Task8--------------------------------------",
  );

  final cart = ShoppingCart2([20.0, 40.0, 30.0]); // Total: 90

  print("Cart Total: \$${cart.getTotal()}");

  cart.setDiscountStrategy(PercentageDiscount(10));
  print("After 10% Discount: \$${cart.getTotalAfterDiscount()}");

  cart.setDiscountStrategy(FlatDiscount(15));
  print("After \$15 Discount: \$${cart.getTotalAfterDiscount()}");

  cart.setDiscountStrategy(FreeShipping(20));
  print("After Free Shipping (\$10): \$${cart.getTotalAfterDiscount()}");

  // *TAsk9

  print(
    "\n---------------------------------------------------------------------------- Task9--------------------------------------",
  );
  List<Vehicle> vehicles = [
    Car("Toyota Camry", "Petrol"),
    Bike("Yamaha MT-15", "4-stroke"),
    Truck("Volvo FH16", 18.5),
  ];

  for (var vehicle in vehicles) {
    vehicle.start();
  }

  // *TAsk10

  print(
    "\n---------------------------------------------------------------------------- Task10--------------------------------------",
  );
  Notification email = EmailNotification("jameela@example.com");
  Notification sms = SMSNotification("+201004245652");

  List<Notification> notifications = [email, sms];

  for (var notification in notifications) {
    notification.send();
  }
}
