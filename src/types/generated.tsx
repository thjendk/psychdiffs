import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation';
  _empty?: Maybe<Scalars['Boolean']>;
};

export type Query = {
   __typename?: 'Query';
  _empty?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};


export type User = {
   __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};


