import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ArticleRating_Key {
  userId: UUIDString;
  articleId: UUIDString;
  __typename?: 'ArticleRating_Key';
}

export interface Article_Key {
  id: UUIDString;
  __typename?: 'Article_Key';
}

export interface DeleteCurrentUserData {
  user_delete?: User_Key | null;
}

export interface GetCurrentUserData {
  user?: {
    id: UUIDString;
  } & User_Key;
}

export interface InsertUserData {
  user_insert: User_Key;
}

export interface Recommendation_Key {
  id: UUIDString;
  __typename?: 'Recommendation_Key';
}

export interface Suggestion_Key {
  id: UUIDString;
  __typename?: 'Suggestion_Key';
}

export interface Topic_Key {
  id: UUIDString;
  __typename?: 'Topic_Key';
}

export interface UpdateUserProfileData {
  user_update?: User_Key | null;
}

export interface UpdateUserProfileVariables {
  displayName?: string | null;
}

export interface UserArticleFavorite_Key {
  userId: UUIDString;
  articleId: UUIDString;
  __typename?: 'UserArticleFavorite_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface InsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<InsertUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<InsertUserData, undefined>;
  operationName: string;
}
export const insertUserRef: InsertUserRef;

export function insertUser(): MutationPromise<InsertUserData, undefined>;
export function insertUser(dc: DataConnect): MutationPromise<InsertUserData, undefined>;

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect): QueryPromise<GetCurrentUserData, undefined>;

interface UpdateUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: UpdateUserProfileVariables): MutationRef<UpdateUserProfileData, UpdateUserProfileVariables>;
  operationName: string;
}
export const updateUserProfileRef: UpdateUserProfileRef;

export function updateUserProfile(vars?: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;
export function updateUserProfile(dc: DataConnect, vars?: UpdateUserProfileVariables): MutationPromise<UpdateUserProfileData, UpdateUserProfileVariables>;

interface DeleteCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<DeleteCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<DeleteCurrentUserData, undefined>;
  operationName: string;
}
export const deleteCurrentUserRef: DeleteCurrentUserRef;

export function deleteCurrentUser(): MutationPromise<DeleteCurrentUserData, undefined>;
export function deleteCurrentUser(dc: DataConnect): MutationPromise<DeleteCurrentUserData, undefined>;

