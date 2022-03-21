dependencies
- body-parser :-
- bcryptjs :- Hashed password (private data) of user   
- validator :- VAlid different data  
- nodemailer :- OTP based forget parser 
- cookie-parser :- parse cookie
- jsonwebtoken :- 





APIs:-
-> Product APIs
-> Filter APIs
    - Search()
        1. Search by Product name
    - Filter()
        1. filter by Category
        2. Filter by Price between (eg 1000< price <2100)
    - Products Per Page
    file:- apiFeature   

Handled Error:
-> Error Handle Send Response               File :- ErrorHandler
-> Async Try Catch Error (common Function)  File:- CatchAsyncError
-> Unhandle Error Rejection(when we not catch the error)File:- Index 
-> Uncaught Error(Undefined Error) File:- Index 
-> Invalid Mongo Id File:- error 