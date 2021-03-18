# node-backblaze-backup

Node.js application to backup files daily to BacBlaze B2 bucket

## Getting Started

### Installing

To run project locally you need to install Node.js or Docker.

#### Running project in Node.js

```
git clone https://github.com/KomelT/node-backblaze-backup.git
cd node-backblaze-backup
mv .env.sample .env
```
Open `.env` and edit some variables.

```
ENV_PRESENT=ja // Must be set to "ja"

BUCKET_ID= // ID of your BackBlaze bucket in which you want to backup files

APP_KEY_ID= // "BackBlaze's keyID"
APP_KEY= // BackBlaze's "applicationKey"

DISCORD_WH_ID= // Discord's webhook ID
DISCORD_WH_TOKEN= // Discord's webhook token

TIME=4:50 // Time when the backup occures
```

Open also `app.js` and edit there some more variables.

```
...
const folder = "/files/"; // Specify where files that you want to backup are
...
const ignoreLocalFiles = ["_old"] // If you want to ignore some of the files specify them in
...
const sendMsg = true; // If you don't want to recive error / sucess message on Discord set ti to "false"
...
```

Install all required dependencies.

```
npm install
node app.js
```

and application now should run.

#### Running project in Docker

You can pull down image from Docker Hub. But to change needed variables you need to mount image on your filesystem. `/usr/src/app` -> `Your desired location`. To know more about variables look up on **"Running project in Node.js"** where are shown `.env` and `app.js`.

Pull image down from Docker Hub
 ```
 docker pull komelt/nodebackblazebackup
 ```
 or
 ```
 Clone git repository and biuld image from ".dockerfile" by yourself.
 ```
 
 **If you have any suggestions or problems contact me. Nice regards!**