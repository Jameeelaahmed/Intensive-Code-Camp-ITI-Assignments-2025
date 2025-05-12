void task1() {
  //* TASK 1
  print("*********TASK 1 ***************");
  for (int i = 0; i < 10; i++) {
    print("time table for $i is -> ");
    for (int j = 0; j <= 10; j++) {
      if (i * j % 2 == 0) {
        print("$i * $j = ${j * i} -> EVEN");
      } else {
        print("$i * $j = ${j * i} -> ODD");
      }
    }
  }
}

// * TASK 2
void task2(int val) {
  print("*********TASK 2 ***************");

  if (val >= 90) {
    print('A');
  } else if (val >= 80 && val <= 89) {
    print('B');
  } else if (val >= 70 && val <= 79) {
    print('C');
  } else if (val >= 60 && val <= 69) {
    print('D');
  } else {
    print('F');
  }
}

// * TASK 3

void task3() {
  print("*********TASK 3 ***************");

  String val = 'jameela';
  print(val);
}

// *Task 4

void task4() {
  print("*********TASK 4 ***************");

  String fName = 'jameela';
  String lName = 'ahmed';
  print('$fName $lName');
}

// *Task 5

void task5() {
  print("*********TASK 5 ***************");

  String name = 'jameela';
  int age = 23;
  print("Name is : $name , Age is : $age");
}

// *Task 6

void task6() {
  print("*********TASK 6 ***************");

  var age = 20;
  print(age.toString());
}

// *Task 7

void task7() {
  print("*********TASK 7 ***************");

  var n1 = 10;
  var n2 = 5;
  print((n1 / n2).toInt());
}

// *task 8

void task8() {
  print("*********TASK 8 ***************");

  int num = 20;
  if (num % 2 == 0) {
    print("Num is Even");
  } else {
    print("Num is Odd");
  }
}

// *task9

void task9() {
  print("*********TASK 9 ***************");

  String s1 = 'ab';
  String s2 = 'cabd';
  print(s2.indexOf(s1));
}
// *task10

void task10() {
  print("*********TASK 10 ***************");
  String val = 'jameela';
  String res = '';
  for (int i = val.length - 1; i >= 0; i--) {
    res += val[i];
  }
  print(res);
}
