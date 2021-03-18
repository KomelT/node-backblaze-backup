// .env package import
require('dotenv').config()

// Node.js built in "File System" package
const fs = require("fs")

// BackBlaze Node.js SDK
const B2 = require('backblaze-b2');
// Documentation https://www.npmjs.com/package/backblaze-b2

//Discord SDK
const Discord = require('discord.js');

// Folder in which are files
const folder = "/files/" // Must end with /

// Specify which files / folders you want to ignore locally
const ignoreLocalFiles = ["_old"]

if (process.env.ENV_PRESENT !== "ja") {
	console.log(".env is missing!!");
	process.exit(1);
}

// Bucket ID where are backedup files
const bucketId = process.env.BUCKET_ID

// API Key credentials
const b2 = new B2({
	applicationKeyId: process.env.APP_KEY_ID, // or accountId: 'accountId'
	applicationKey: process.env.APP_KEY // or masterApplicationKey
});

// Discord Webhook credentials
const webhookClient = new Discord.WebhookClient(process.env.DISCORD_WH_ID, process.env.DISCORD_WH_TOKEN);

const sendMsg = true;

function sendErr(msg) {

	if (!sendMsg)
		return ""

	let date = new Date();

	const embed = new Discord.MessageEmbed()
		.setTitle('**MySQL to BackBlaze backup ERROR**')
		.setFooter(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getYear() + " " + date.toLocaleTimeString())
		.setThumbnail("https://i.imgur.com/tlooVc1.png")
		.addFields([
			{
				name: "Message:",
				value: "`" + msg + "`"
			}
		])

	webhookClient.send("", {
		embeds: [embed]
	})
}

function sendSuc(msg) {

	if (!sendMsg)
		return ""

	let date = new Date();

	const embed = new Discord.MessageEmbed()
		.setTitle('**MySQL to BackBlaze backup SUCCEED**')
		.setFooter(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getYear() + " " + date.toLocaleTimeString())
		.setThumbnail("https://i.imgur.com/tlooVc1.png")
		.addFields([
			{
				name: "Message:",
				value: "`" + msg + "`"
			}
		])

	webhookClient.send("", {
		embeds: [embed]
	})
}

async function getBucketFiles() {

	try {
		await b2.authorize();

		let res = await b2.listFileNames({
			bucketId: bucketId,
		})

		let arr = res.data.files

		let arr2 = arr.map((file) => {
			return file.fileName
		})

		return arr2;

	} catch (err) {
		//sendErr("Data can't be fetched from BackBlaze API! 'getBucketFiles()'")
		console.log(err)
		return null;
	}
}

async function getLocalFiles() {
	return new Promise((resolve, reject) => {
		fs.readdir(folder, (err, files) => {
			if (err) {
				sendErr("Local files can't be fetched! 'getLocalFiles()'")
				return null
			}
			else {

				files.map((file, i) => {
					ignoreLocalFiles.map((name) => {
						if (file === name)
							files.splice(i, 1)
					})
				})

				resolve(files)
			}
		})
	})
}

async function getFileId(fileName) {
	try {
		await b2.authorize();

		let res = await b2.listFileNames({
			bucketId: bucketId,
		})

		let arr = res.data.files

		let out = [];

		arr.map((file) => {
			if (file.fileName == fileName) {
				out.push(file.fileId)
			}
		})

		return out;
	} catch (err) {
		console.log(err)
		sendErr(err + " 'getFileId()'")
		return null
	}
}

function compare(bucket, local) {
	let missing = [];
	let tooM = [];

	missing.indexOf

	bucket.map((file) => {
		if (local.indexOf(file) == -1)
			tooM.push(file)
	})

	local.map(file => {
		if (bucket.indexOf(file) == -1)
			missing.push(file)
	})

	return [missing, tooM];
}

async function sendFiles(file) {

	try {
		await b2.authorize();

		let uploadUrl = await b2.getUploadUrl({ bucketId: bucketId });

		let authorizationToken = uploadUrl.data.authorizationToken;
		uploadUrl = uploadUrl.data.uploadUrl;


		fs.readFile(folder + file, (err, file1) => {
			if (err) {
				console.log("File can't be readed! 'sendFiles(file)'")
				sendErr("File can't be readed! 'sendFiles(file)'")
			}
			else {

				let fileBuffer = Buffer.from(file1)

				b2.uploadFile({
					uploadUrl: uploadUrl,
					uploadAuthToken: authorizationToken,
					fileName: file,
					data: fileBuffer
				}).catch(err => {
					console.log(err + "Hej")
				})
			}

			return true;
		})
	} catch (err) {
		sendErr(err + " 'sendFiles(file)'")
		return false;
	}
}

async function deleteFile(fileName) {
	try {

		await b2.authorize();

		let fileId = await getFileId(fileName)

		await b2.deleteFileVersion({ fileName: fileName, fileId: fileId[0] })

		return true
	} catch (err) {
		console.log(err)
		sendErr(err + " 'deleteFiles(file)'")
		return false;
	}
}

async function main() {

	sendSuc("Program started!")
	let localFiles = await getLocalFiles();
	let bucketFiles = await getBucketFiles();

	if (localFiles == null || bucketFiles == null) {
		setTimeout(() => {
			process.exit(1);
		}, 2000)
	}
	else {
		let tmp = compare(bucketFiles, localFiles)

		let missing = tmp[0];
		let tooM = tmp[1];

		console.log(missing)
		console.log(tooM)

		missing.map(file => {
			console.log(file)
			if (!sendFiles(file)) {
				setTimeout(() => {
					process.exit(1);
				}, 2000)
			}
		})

		tooM.map(file => {
			if (!deleteFile(file)) {
				setTimeout(() => {
					process.exit(1);
				}, 2000)
			}
		})

		sendSuc("Finished with sucess")
	}
}

setInterval(() => {

	console.log("Hi from app.js")

	let date = new Date();
	let time = date.getHours() + ":" + date.getMinutes();

	console.log(time)
	console.log(process.env.TIME)

	if (time === process.env.TIME) {
		main();
	}
}, 60000)