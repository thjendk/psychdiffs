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

export type Diagnosis = {
   __typename?: 'Diagnosis';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  icd?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['String']>;
  differentialsHere?: Maybe<Array<Maybe<Differential>>>;
  differentialsThere?: Maybe<Array<Maybe<Differential>>>;
};

export type DiagnosisInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  icd?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['String']>;
};

export type Differential = {
   __typename?: 'Differential';
  diagnosis?: Maybe<Diagnosis>;
  description?: Maybe<Scalars['String']>;
};

export type DifferentialInput = {
  diagnosisId?: Maybe<Scalars['Int']>;
  differentialId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
};

export type LoginInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  _empty?: Maybe<Scalars['Boolean']>;
  login?: Maybe<Scalars['String']>;
  logout?: Maybe<Scalars['String']>;
  createUser?: Maybe<Scalars['String']>;
  createDiagnosis?: Maybe<Diagnosis>;
  removeDiagnosis?: Maybe<Scalars['String']>;
  addDifferential?: Maybe<Diagnosis>;
  removeDifferential?: Maybe<Diagnosis>;
};


export type MutationLoginArgs = {
  data?: Maybe<LoginInput>;
};


export type MutationCreateUserArgs = {
  data?: Maybe<UserInput>;
};


export type MutationCreateDiagnosisArgs = {
  data?: Maybe<DiagnosisInput>;
};


export type MutationRemoveDiagnosisArgs = {
  id?: Maybe<Scalars['Int']>;
};


export type MutationAddDifferentialArgs = {
  data?: Maybe<DifferentialInput>;
};


export type MutationRemoveDifferentialArgs = {
  data?: Maybe<DifferentialInput>;
};

export type Query = {
   __typename?: 'Query';
  _empty?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  diagnoses?: Maybe<Array<Maybe<Diagnosis>>>;
};


export type User = {
   __typename?: 'User';
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
};

export type UserInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};


