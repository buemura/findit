const customExpress = require("./config/customExpress");

const app = customExpress();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
