const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/api/userRoutes');
const initiativeRoutes = require('./routes/api/initiatives');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));

app.use('/api/users', userRoutes);
app.use('/api/initiatives', initiativeRoutes);
