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
ENV_PRESENT=ja // Must be set to "ja"

BUCKET_ID= // ID of your BackBlaze bucket in which you want to backup files

APP_KEY_ID= // "BackBlaze's keyID"
APP_KEY= // BackBlaze's "applicationKey"

DISCORD_WH_ID= // Discord's webhook ID
DISCORD_WH_TOKEN= // Discord's webhook token

TIME=4:50 // Time when the backup occures
```

Install all neded dependencies

```
npm install
node app.js
```

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
