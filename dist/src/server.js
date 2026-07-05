import app from "./app";
import config from "./config";
const main = () => {
    try {
        app.listen(config.port, () => {
            console.log(`server running on port ${config.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
main();
//# sourceMappingURL=server.js.map