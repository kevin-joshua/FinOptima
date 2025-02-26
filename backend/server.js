import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js'
import adminRoutes from './routes/admin.routes.js';
import userRoutes from './routes/user.routes.js';
import companyRoutes from './routes/company.routes.js';
import budgetRoutes from './routes/budget.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import categoryRoutes from './routes/category.routes.js';
const PORT = process.env.PORT;

//initializing express`
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


// Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/budget", budgetRoutes);
app.use("/api/v1/category", categoryRoutes);

// app.use("/api/wolfram", wolframRoutes);


;(async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
})();


