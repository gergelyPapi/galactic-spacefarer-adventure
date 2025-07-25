## Galactic Spacefarer Adventure

### Project introduction

In the far reaches of the SAP-verse, you’ve been tasked with developing the Galactic Spacefarer Adventure
System. In this cosmic realm, the spacefarers are on a journey through the SAP galaxy. Your mission is to
create a List Report and Object Page Fiori application using SAP CAP, incorporating cosmic custom events
in the Service API call when a new spacefaring candidate embarks on their adventure.

### Startup

1. Open a new terminal & cd into project directory
2. Run `npm i` to install dependancies
3. Run `cds watch` to run the CAP service in watch mode
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
    "spacesuitColor": "green"
  }'

#### Read all Spacefareres

curl http://localhost:4004/odata/v4/spacefarer/Spacefarers

#### Read one Spacefarer by ID

curl http://localhost:4004/odata/v4/spacefarer/Spacefarers(<ID>)

#### Update a Spacefarer

curl -X PATCH http://localhost:4004/odata/v4/spacefarer/Spacefarers(<ID>) \
  -H "Content-Type: application/json" \
  -d '{"spacesuitColor": "gold"}'

#### Delete a Spacefarer

curl -X DELETE http://localhost:4004/odata/v4/spacefarer/Spacefarers(<ID>)
// 2839e936-1291-42c2-a0d2-ea1f1443c2b4

#### Query params example

curl "http://localhost:4004/odata/v4/spacefarer/Spacefarers?$orderby=wormholeNavigationSkill desc"
(Navigation skill descending)