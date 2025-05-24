abstract class Product {
  double getPrice();
  String getDescription();
}

class PhysicalProduct implements Product {
  String? name;
  double price;
  double? weight;
  double shippingCost;

  PhysicalProduct(this.name, this.price, this.weight, this.shippingCost);

  @override
  double getPrice() {
    return price + shippingCost;
  }

  @override
  String getDescription() {
    return "$name - weight:$weight kg , Shipping-cost:$shippingCost and the price is $price";
  }
}

class DigitalProduct implements Product {
  String? name;
  double price;
  double? fileSize;
  String? downloadLink;

  DigitalProduct(this.name, this.price, this.fileSize, this.downloadLink);

  @override
  double getPrice() {
    return price;
  }

  @override
  String getDescription() {
    return "$name (Digital) - Size: ${fileSize}MB, Download: $downloadLink";
  }
}

class ShoppingCart1 {
  List<Product> cart = [];

  void addProduct(Product product) {
    cart.add(product);
  }

  double calculateTotalPrice() {
    double totalPrice = 0;
    for (var product in cart) {
      totalPrice += product.getPrice();
    }
    return totalPrice;
  }

  void showCart() {
    print("=== Cart Summary ===");
    for (var product in cart) {
      print(product.getDescription() + " -> \$${product.getPrice()}");
    }
    print("Total: \$${calculateTotalPrice()}");
  }
}
