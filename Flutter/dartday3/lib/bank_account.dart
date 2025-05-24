class Account {
  // var accountNum;
  int? accountNum;
  double? _balance;
  String? accountHolderName;
  double _withdrawnAmount = 0;

  Account(this.accountNum, this._balance, this.accountHolderName);

  double get balance => _balance ?? 0;
  set balance(double value) => _balance = value;

  double get withdrawnAmount => _withdrawnAmount;

  void deposit(double amount) {
    if (amount <= 0) {
      print("Deposite must be greater than 0");
      return;
    }
    balance += amount;
    print("You put $amount, Your new balance is $balance");
  }

  void withdraw(amount) {
    if (amount <= 0) {
      print("Deposite must be greater than 0");
      return;
    }
    if (balance == 0) {
      print("Your account is empty you can't withdraw!");
    } else if (amount > balance) {
      print("the amount is greater than your balance");
    } else {
      _withdrawnAmount += amount;
      balance -= amount;
      print('your new balance after with draw is :$balance');
    }
  }

  void checkBalance() {
    print("your balance is $balance");
  }

  @override
  String toString() {
    return 'Account(accountNum: $accountNum, holder: $accountHolderName, balance: $balance)';
  }
}

class SavingsAccount extends Account {
  int? interestRate;
  SavingsAccount(
    this.interestRate,
    int accountNum,
    double balance,
    String accountHolderName,
  ) : super(accountNum, balance, accountHolderName);

  void interest(double amount) {
    if (amount <= 0) {
      print("Deposite must be greater than 0");
      return;
    }
    balance += amount;
    print('Interest: $_balance');
  }
}

class CurrentAccount extends Account {
  double overDraftLimit = 1000;
  CurrentAccount(
    this.overDraftLimit,
    int accountNum,
    double balance,
    String accountHolderName,
  ) : super(accountNum, balance, accountHolderName);

  void overDraftHandler(double amount) {
    if (amount <= 0) {
      print("Deposite must be greater than 0");
      return;
    }
    if (_withdrawnAmount > overDraftLimit) {
      print("You can't withdraw beyound the limit");
    } else {
      withdraw(amount);
    }
  }
}
