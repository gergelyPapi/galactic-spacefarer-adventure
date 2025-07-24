using { spacefarer.model as sm } from '../db/spacefarerModel';

service SpacefarerService {
  entity Spacefarers as projection on sm.Spacefarer
}

