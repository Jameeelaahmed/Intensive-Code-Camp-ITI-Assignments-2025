class Person {
  String? _name;
  int? _id;

  String get name => _name ?? '';
  int get id => _id ?? 0;

  Person(this._name, this._id);

  void displayDetails() {}
  String getRole() => '';
}

class Student implements Person {
  int? _id;
  String? _name;
  String? _grade;

  Student(this._id, this._name, this._grade);

  @override
  int get id => _id ?? 0;
  set id(value) => _id = value;
  @override
  String get name => _name ?? '';
  set name(value) => _name = value;

  String get grade => _grade ?? '';
  set grade(value) => _grade = value;

  @override
  void displayDetails() {
    print("Student name is $name : grade is $grade and Id is $id");
  }

  @override
  String getRole() {
    return 'Role is Student';
  }
}

class Teacher implements Person {
  int? _id;
  String? _name;
  String? _subject;

  Teacher(this._id, this._name, this._subject);

  @override
  int get id => _id ?? 0;
  set id(value) => _id = value;
  @override
  String get name => _name ?? '';
  set name(value) => _name = value;

  String get subject => _subject ?? '';
  set subject(value) => _subject = value;

  @override
  void displayDetails() {
    print("Teacher name is $name : Subject is $subject and Id is $id");
  }

  @override
  String getRole() {
    return 'Role is Teacher';
  }
}

class Staff implements Person {
  int? _id;
  String? _name;
  String? _department;

  Staff(this._id, this._name, this._department);

  @override
  int get id => _id ?? 0;
  set id(value) => _id = value;
  @override
  String get name => _name ?? '';
  set name(value) => _name = value;
  String get department => _department ?? '';
  set deparment(value) => _department = value;

  @override
  void displayDetails() {
    print(
      "Staff member name is $name : Department is $department and Id is $id",
    );
  }

  @override
  String getRole() {
    return 'Role is Staff';
  }
}
