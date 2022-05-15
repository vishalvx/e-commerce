import express from "express";
import "./config.js";
import { connectDb } from "./db.js";
import  errorMiddleware  from "./middleware/error.js";
//import Router and rename it
import products from "./routes/productsRoutes.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import cookieParser  from "cookie-parser";



// making instance
const app = express();

var server;

// Uncaught Error Handling
process.on("uncaughtException",(err)=>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down Server Because Of Uncaught Exception")
  process.exit(1);
})

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))

// Routes 

app.use("/api",products);
app.use("/api",user);
app.use("/api",order);

// error handler middleware
// this middleware must use below routes call
app.use(errorMiddleware);



const startApp = async () => {
  try {
    // create home route
    app.get("/", (request, respone) => {
      respone.send({
        data: "Hello World!!",
      });
    });

     server = app.listen(process.env.PORT, () => {
      console.log(`Backend running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};


//Unhandled Error Rejection 
process.on("unhandledRejection",err=>{
  console.log(`Error: ${err.message}`);
  console.log("Shutting Down Server")
  server.close(()=>{
    process.exit(1);
  })
})
connectDb().then(() => {
  startApp();
});
