### Installations
* npm install

### Run

* npm run start


### Importing seats.json to MongoDB using mongoimport

In Windows,
* Copy the seats.json file to Mongodb directory
* Run this command in Mongodb directory(C:\Program Files\MongoDB\Server\3.4\bin)
  mongoimport --db Reservationdb --collection seats --file seats.json
