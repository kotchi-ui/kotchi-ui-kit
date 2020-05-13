const fs = require("fs-extra");
function removeFiles() {
	try {
		var files = fs.readdirSync("./");
		for (var i = 0; i < files.length; i++) {
            const currentFile = files[i];
			if (currentFile.startsWith("kotchi-") && currentFile.endsWith(".js")) {
                console.log("removing ", currentFile);
				fs.removeSync(currentFile);
			}
		}
		console.log("removing dist from root -> success");
	} catch (err) {
		console.error(err);
	}
}
removeFiles();
