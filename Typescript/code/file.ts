(function () {
  //    ! Q1
  interface User {
    name: string;
    age: number;
  }

  type pickName = Partial<User>;

  const User: pickName = {
    name: "jameela",
  };

  console.log(`only name : ${User.name}`);

  //    ! Q2

  interface Profile {
    username?: string;
    email?: string;
  }

  const obj: Required<Profile> = {
    username: "jameela",
    email: "jameela@gmail.com",
  };

  console.log(
    `optioal props => 'username' : ${obj.username} , 'email' : ${obj.email} `
  );

  //    ! Q3

  type colorRec = Record<"red" | "green" | "blue", string>;
  const colors: colorRec = {
    red: "#FF0000",
    green: "#008000",
    blue: "#0000ff",
  };

  console.log(colors.red);

  //    ! Q4

  interface Person {
    name: string;
    age: number;
    email: string;
  }

  type two = Pick<Person, "name" | "email">;

  const Person: two = {
    name: "jameela",
    email: "jameela@gmail.com",
  };

  console.log(`'name' : ${Person.name} , 'email' : ${Person.email}`);

  //    ! Q5

  type notAge = Omit<Person, "age">;

  const test: notAge = {
    name: "jameela",
    email: "jameela@gmail.com",
  };

  console.log(test);

  //    ! Q6

  type colors = "red" | "green" | "blue" | "yellow";

  type notYellow = Exclude<colors, "yellow">;

  const allowdColors: notYellow = "blue";
  const notAllowedColor: notYellow = "yellow";

  //    ! Q7

  type justRedBlue = Extract<colors, "red" | "blue">;
  const allowdColors1: justRedBlue = "blue";
  const allowdColors2: justRedBlue = "red";
  const notAllowedColor2: justRedBlue = "yellow";
  const notAllowedColor3: justRedBlue = "green";

  //    ! Q8

  type mayBeString = string | null | undefined;
  type onlyString = NonNullable<mayBeString>;

  const isItString: onlyString = "jameela";
  const isItNull: onlyString = null;
  const isItUndefined: onlyString = undefined;
})();
