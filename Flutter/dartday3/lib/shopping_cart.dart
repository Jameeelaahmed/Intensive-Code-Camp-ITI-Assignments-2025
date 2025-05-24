abstract class DiscountStrategy {
  double applyDiscount(double total);
}

class PercentageDiscount implements DiscountStrategy {
  final double percentage;

  PercentageDiscount(this.percentage);
  @override
  double applyDiscount(double total) {
    return total - (total * (percentage / 100));
  }
}

class FlatDiscount implements DiscountStrategy {
  final double amount;

  FlatDiscount(this.amount);

  @override
  double applyDiscount(double total) {
    return total - amount;
  }
}

class FreeShipping implements DiscountStrategy {
  final double shippingCost;

  FreeShipping(this.shippingCost);

  @override
  double applyDiscount(double total) {
    return total - shippingCost;
  }
}

class ShoppingCart2 {
  List<double> items;
  DiscountStrategy? discountStrategy;

  ShoppingCart2(this.items, [this.discountStrategy]);

  void setDiscountStrategy(DiscountStrategy strategy) {
    discountStrategy = strategy;
  }

  double getTotal() => items.fold(0, (sum, item) => sum + item);

  double getTotalAfterDiscount() {
    final total = getTotal();
    if (discountStrategy != null) {
      return discountStrategy!.applyDiscount(total);
    }
    return total;
  }
}
