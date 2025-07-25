## Galactic Spacefarer Adventure

### Project introduction

In the far reaches of the SAP-verse, you’ve been tasked with developing the Galactic Spacefarer Adventure
System. In this cosmic realm, the spacefarers are on a journey through the SAP galaxy. Your mission is to
create a List Report and Object Page Fiori application using SAP CAP, incorporating cosmic custom events
in the Service API call when a new spacefaring candidate embarks on their adventure.

### Startup

1. Open a new terminal & cd into project directory
2. Run `npm i` to install dependancies
3. Run `npm start` to run the CAP service in watch mode
4. Use the enpoints to interact with data

### Endpoints and examples

#### CREATE

curl -X POST http://localhost:4004/odata/v4/spacefarer/Spacefarers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fenix Orion",
    "stardustCollection": 0,
    "wormholeNavigationSkill": 5,
    "originPlanet": "Dagobah",
    "spacesuitColor": "green",
    "accessCode": "KAEa7e9d21c"
  }'

#### Read all Spacefareres

curl http://localhost:4004/odata/v4/spacefarer/Spacefarers

#### Read one Spacefarer by ID (with auth)

The entry we are looking for
  {
    "ID": "569a59c8-deb3-43d8-a93a-b8d58f07f849",
    "name": "Nova Quinn",
    "stardustCollection": 1978,
    "wormholeNavigationSkill": 10,
    "originPlanet": "Aether",
    "spacesuitColor": "Graphite",
    "accessCode": "KAEa7e9d21c"
  },
Entity requesting the data
  {
    "ID": "58d61696-997c-46a8-8d04-9cbecb8ed339",
    "name": "Riven Sol",
    "stardustCollection": 3936,
    "wormholeNavigationSkill": 7,
    "originPlanet": "Aether",
    "spacesuitColor": "Obsidian",
    "accessCode": "RAEa88f09a7"
  },

(These entities make part of the default database you can try out staight away)

This will result in valid request:
curl "http://localhost:4004/odata/v4/spacefarer/Spacefarers(ID=569a59c8-deb3-43d8-a93a-b8d58f07f849,IsActiveEntity=true)" \
  -H "x-access-code: RAEa88f09a7" \
  -H "x-origin-planet: Aether"

This will result that you are a cosmic invader:

curl "http://localhost:4004/odata/v4/spacefarer/Spacefarers(ID=569a59c8-deb3-43d8-a93a-b8d58f07f849,IsActiveEntity=true)" \
  -H "x-access-code: RAEa88f09a7" \
  -H "x-origin-planet: Planet Monday"

Note that u need `access-code` and `origin-planet` to be specified and valid for the query otherwise you will
be considered as a cosmic invader

#### Update a Spacefarer

curl -X PATCH "http://localhost:4004/odata/v4/spacefarer/Spacefarers(ID=569a59c8-deb3-43d8-a93a-b8d58f07f849,IsActiveEntity=true)" \
  -H "Content-Type: application/json" \
  -H "x-access-code: KAEa7e9d21c" \
  -H "x-origin-planet: Aether" \
  -d '{"spacesuitColor": "gold"}'

#### Delete a Spacefarer

curl -X DELETE "http://localhost:4004/odata/v4/spacefarer/Spacefarers(ID=569a59c8-deb3-43d8-a93a-b8d58f07f849,IsActiveEntity=true)" \
  -H "Content-Type: application/json" \
  -H "x-access-code: RAEa88f09a7" \
  -H "x-origin-planet: Aether"