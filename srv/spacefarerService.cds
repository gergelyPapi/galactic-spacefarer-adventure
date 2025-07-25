using { spacefarer.model as sm } from '../db/spacefarerModel';

service SpacefarerService {
  @odata.draft.enabled
  entity Spacefarers as projection on sm.Spacefarer
}