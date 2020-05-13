const fs = require("fs-extra");

function copyFiles() {
	try {
		fs.copySync("./dist", "./");
		console.log("copy dist to root -> success");
	} catch (err) {
		console.error(err);
	}
}
copyFiles();
