import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from 'config/apolloServer';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  differentials?: Maybe<Array<Maybe<Differential>>>;
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
  User: ResolverTypeWrapper<Partial<User>>,
  Int: ResolverTypeWrapper<Partial<Scalars['Int']>>,
  String: ResolverTypeWrapper<Partial<Scalars['String']>>,
  Diagnosis: ResolverTypeWrapper<Partial<Diagnosis>>,
  Differential: ResolverTypeWrapper<Partial<Differential>>,
  Mutation: ResolverTypeWrapper<{}>,
  LoginInput: ResolverTypeWrapper<Partial<LoginInput>>,
  UserInput: ResolverTypeWrapper<Partial<UserInput>>,
  DiagnosisInput: ResolverTypeWrapper<Partial<DiagnosisInput>>,
  DifferentialInput: ResolverTypeWrapper<Partial<DifferentialInput>>,
  CacheControlScope: ResolverTypeWrapper<Partial<CacheControlScope>>,
  Upload: ResolverTypeWrapper<Partial<Scalars['Upload']>>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  Boolean: Partial<Scalars['Boolean']>,
  User: Partial<User>,
  Int: Partial<Scalars['Int']>,
  String: Partial<Scalars['String']>,
  Diagnosis: Partial<Diagnosis>,
  Differential: Partial<Differential>,
  Mutation: {},
  LoginInput: Partial<LoginInput>,
  UserInput: Partial<UserInput>,
  DiagnosisInput: Partial<DiagnosisInput>,
  DifferentialInput: Partial<DifferentialInput>,
  CacheControlScope: Partial<CacheControlScope>,
  Upload: Partial<Scalars['Upload']>,
}>;

export type DiagnosisResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Diagnosis'] = ResolversParentTypes['Diagnosis']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  icd?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  page?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  differentials?: Resolver<Maybe<Array<Maybe<ResolversTypes['Differential']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type DifferentialResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Differential'] = ResolversParentTypes['Differential']> = ResolversObject<{
  diagnosis?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  login?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationLoginArgs, never>>,
  logout?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createUser?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>,
  createDiagnosis?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType, RequireFields<MutationCreateDiagnosisArgs, never>>,
  removeDiagnosis?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRemoveDiagnosisArgs, never>>,
  addDifferential?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType, RequireFields<MutationAddDifferentialArgs, never>>,
  removeDifferential?: Resolver<Maybe<ResolversTypes['Diagnosis']>, ParentType, ContextType, RequireFields<MutationRemoveDifferentialArgs, never>>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _empty?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  diagnoses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Diagnosis']>>>, ParentType, ContextType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Diagnosis?: DiagnosisResolvers<ContextType>,
  Differential?: DifferentialResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
