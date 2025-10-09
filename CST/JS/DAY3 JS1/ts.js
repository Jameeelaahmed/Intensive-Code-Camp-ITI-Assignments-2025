//! HOISTING 
//?? ازاي ال هويستنج بيحصل ان الكود قبل ما يحصله اكسكيوت بيحصل سكان للسكريبت و يدور ع اي var statemnet or function statement و يحطهم ف الميموري ب undefind لحد ما يحصل execute للكود ??/ 
//? ايه ال function statement 
//? function name(){}
//* الشكل دا بس ال بنقول عليه فانكشن ستيتمنت اي شكل غير كده مش فانكشن ستيتمنت 

//TODO Example 1 :

// console.log(x);
// var x = 10; // * هتتحط ف الميموري global

//----------------------------------------------


//TODO Example 2 

var res = fun(3, 5);

function fun(x, y) {//?local 
    var z = x + y; //* لكن دي مش هتتحط ف الميموري غير لما يحصل اكسكيوت للفانكشن
    return z;
}
//* لو عملت كومنت ع ال result فوق 
//* ال z هتبقي ب ريفرينس ايرور
//* ⬇ لانه اه حصل هويستنج للفانكشن بس مش هيقدر يشوف الجواها غير لما يحصل اكسكيوت للفانكشن اني اشيل الكومنت من ع 
//* res فوق 

//-----------------------------------------------


//TODO Example 3
//! for 

console.log(i)//* undefind بسبب الهويستنج 
for (var i = 0; i < 3; i++) { // ! مش معني انها for 
    //! انها تبقي local scope
    // ! بسبب ال var
    // ! هي global scope 
    // ! و حصلها هويستنيج 
    console.log(i) //* 0 1 2
}
console.log(i) //* 3

//!  مش موجود ع مستوي اللوب بس موجود ع مستوي السكريبت i 
// ! موجود ف ال window object
//! GLOBAL

//-------------------------------------------------


//TODO Example 4

console.log(y)
y = 0; // ! Refrence error 
// ?   ليه؟ عشان مفيش قبلها var ف محصلهاش hoisting محصلش scan

//------------------------------------------------

// ? ⬇ الفاريابلز
// ? ⬇ لحد ما نوصل ES6
//? ⬇ ليها
//? 2 scopes local (function ) or global (window object)


//! مفيش حاجه اسمها block
//! لحد ما نوصل ES6
//! ال let و ال const هما ال حققو ال
//! ال بلوك سكوب
//! لحد ما نوصل ES6
//! ال function local scope
//! و اي حاجه غير ال function statement تبقي global scope 