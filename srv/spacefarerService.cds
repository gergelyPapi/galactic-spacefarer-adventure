using { spacefarer.model as sm } from '../db/spacefarerModel';

service SpacefarerService {
  @odata.draft.enabled
  @odata.draft.bypass
  entity Spacefarers as projection on sm.Spacefarer
}