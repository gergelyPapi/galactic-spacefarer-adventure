namespace spacefarer.model;

entity Spacefarer {
  key ID: UUID @Core.Computed;
  name: String;
  stardustCollection: Integer;
  wormholeNavigationSkill: Integer;
  originPlanet: String;
  spacesuitColor: String;
}