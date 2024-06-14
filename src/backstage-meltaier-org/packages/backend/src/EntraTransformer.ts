import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import {
  defaultGroupTransformer,
  defaultUserTransformer,
  defaultOrganizationTransformer,
} from '@backstage/plugin-catalog-backend-module-msgraph';
import { GroupEntity, UserEntity } from '@backstage/catalog-model';

// This group transformer completely replaces the built in logic with custom logic.
export async function myGroupTransformer(
  group: MicrosoftGraph.Group,
  groupPhoto?: string,
): Promise<GroupEntity | undefined> {
    const backstageGroup = await defaultGroupTransformer(group, groupPhoto);
    if (backstageGroup) {
      backstageGroup.metadata.description = 'Loaded from Microsoft Entra ID';
    }
    return backstageGroup;
}

// This user transformer makes use of the built in logic, but also sets the description field
export async function myUserTransformer(
  graphUser: MicrosoftGraph.User,
  userPhoto?: string,
): Promise<UserEntity | undefined> {
  const backstageUser = await defaultUserTransformer(graphUser, userPhoto);

  if (backstageUser) {
    backstageUser.metadata.description = 'Loaded from Microsoft Entra ID';
  }

  return backstageUser;
}

// This organization transformer makes use of the built in logic, but also sets the description field
export async function myOrganizationTransformer(
  graphOrganization: MicrosoftGraph.Organization,
): Promise<GroupEntity | undefined> {
    const backstageOrganization = await defaultOrganizationTransformer(graphOrganization);
    if (backstageOrganization) {
      backstageOrganization.metadata.description = 'Loaded from Microsoft Entra ID';
    }
    return backstageOrganization;
}