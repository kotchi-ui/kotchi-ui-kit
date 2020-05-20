const fsExtra = require("fs-extra");

try {
    fsExtra.copySync("./dist", "./");
    console.log("copy dist to root -> success");
} catch (err) {
    console.error(err);
}