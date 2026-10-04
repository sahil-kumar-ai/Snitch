import app from './app/app.js';
import config from './config/config.js';
import connectToDB from './config/database.js';

const PORT = config.PORT;

await connectToDB();

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
});