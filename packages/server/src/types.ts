export interface CreateCodeReviewInput {
  numDays?: number | null;

  codeUrl: string;

  techTags: string[];

  notes: string;
}

export interface CreateOfferInput {
  userId: string;

  codeReviewId: string;
}

export interface LoginInput {
  usernameOrEmail: string;

  password: string;
}

export interface RegisterInput {
  username: string;

  email: string;

  password: string;
}
import { GraphQLResolveInfo } from "graphql";

import { MyContext } from "./context";

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export namespace QueryResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = {}> {
    listcodeReviews?: ListcodeReviewsResolver<
      CodeReviewRequest[],
      TypeParent,
      Context
    >;

    me?: MeResolver<User | null, TypeParent, Context>;
  }

  export type ListcodeReviewsResolver<
    R = CodeReviewRequest[],
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type MeResolver<
    R = User | null,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context>;
}

export namespace CodeReviewRequestResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = CodeReviewRequest
  > {
    id?: IdResolver<string, TypeParent, Context>;

    numDays?: NumDaysResolver<number | null, TypeParent, Context>;

    codeUrl?: CodeUrlResolver<string, TypeParent, Context>;

    techTags?: TechTagsResolver<string[], TypeParent, Context>;

    notes?: NotesResolver<string, TypeParent, Context>;

    ownerId?: OwnerIdResolver<string, TypeParent, Context>;

    owner?: OwnerResolver<User, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = CodeReviewRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type NumDaysResolver<
    R = number | null,
    Parent = CodeReviewRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type CodeUrlResolver<
    R = string,
    Parent = CodeReviewRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type TechTagsResolver<
    R = string[],
    Parent = CodeReviewRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type NotesResolver<
    R = string,
    Parent = CodeReviewRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type OwnerIdResolver<
    R = string,
    Parent = CodeReviewRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type OwnerResolver<
    R = User,
    Parent = CodeReviewRequest,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    username?: UsernameResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type UsernameResolver<
    R = string,
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = string,
    Parent = User,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = {}> {
    createCodeReview?: CreateCodeReviewResolver<
      CreateCodeReviewResponse,
      TypeParent,
      Context
    >;

    createOffer?: CreateOfferResolver<CreateOfferResponse, TypeParent, Context>;

    login?: LoginResolver<LoginResponse, TypeParent, Context>;

    register?: RegisterResolver<RegisterResponse, TypeParent, Context>;
  }

  export type CreateCodeReviewResolver<
    R = CreateCodeReviewResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, CreateCodeReviewArgs>;
  export interface CreateCodeReviewArgs {
    input: CreateCodeReviewInput;
  }

  export type CreateOfferResolver<
    R = CreateOfferResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, CreateOfferArgs>;
  export interface CreateOfferArgs {
    input: CreateOfferInput;
  }

  export type LoginResolver<
    R = LoginResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    input: LoginInput;
  }

  export type RegisterResolver<
    R = RegisterResponse,
    Parent = {},
    Context = MyContext
  > = Resolver<R, Parent, Context, RegisterArgs>;
  export interface RegisterArgs {
    input: RegisterInput;
  }
}

export namespace CreateCodeReviewResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = CreateCodeReviewResponse
  > {
    errors?: ErrorsResolver<Error[] | null, TypeParent, Context>;

    codeReview?: CodeReviewResolver<
      CodeReviewRequest | null,
      TypeParent,
      Context
    >;
  }

  export type ErrorsResolver<
    R = Error[] | null,
    Parent = CreateCodeReviewResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type CodeReviewResolver<
    R = CodeReviewRequest | null,
    Parent = CreateCodeReviewResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
}

export namespace ErrorResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = Error> {
    path?: PathResolver<string, TypeParent, Context>;

    message?: MessageResolver<string, TypeParent, Context>;
  }

  export type PathResolver<
    R = string,
    Parent = Error,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type MessageResolver<
    R = string,
    Parent = Error,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
}

export namespace CreateOfferResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = CreateOfferResponse
  > {
    ok?: OkResolver<boolean, TypeParent, Context>;
  }

  export type OkResolver<
    R = boolean,
    Parent = CreateOfferResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
}

export namespace LoginResponseResolvers {
  export interface Resolvers<Context = MyContext, TypeParent = LoginResponse> {
    errors?: ErrorsResolver<Error[] | null, TypeParent, Context>;

    user?: UserResolver<User | null, TypeParent, Context>;
  }

  export type ErrorsResolver<
    R = Error[] | null,
    Parent = LoginResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = User | null,
    Parent = LoginResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
}

export namespace RegisterResponseResolvers {
  export interface Resolvers<
    Context = MyContext,
    TypeParent = RegisterResponse
  > {
    errors?: ErrorsResolver<Error[] | null, TypeParent, Context>;
  }

  export type ErrorsResolver<
    R = Error[] | null,
    Parent = RegisterResponse,
    Context = MyContext
  > = Resolver<R, Parent, Context>;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  listcodeReviews: CodeReviewRequest[];

  me?: User | null;
}

export interface CodeReviewRequest {
  id: string;

  numDays?: number | null;

  codeUrl: string;

  techTags: string[];

  notes: string;

  ownerId: string;

  owner: User;
}

export interface User {
  id: string;

  username: string;

  email: string;
}

export interface Mutation {
  createCodeReview: CreateCodeReviewResponse;

  createOffer: CreateOfferResponse;

  login: LoginResponse;

  register: RegisterResponse;
}

export interface CreateCodeReviewResponse {
  errors?: Error[] | null;

  codeReview?: CodeReviewRequest | null;
}

export interface Error {
  path: string;

  message: string;
}

export interface CreateOfferResponse {
  ok: boolean;
}

export interface LoginResponse {
  errors?: Error[] | null;

  user?: User | null;
}

export interface RegisterResponse {
  errors?: Error[] | null;
}

// ====================================================
// Arguments
// ====================================================

export interface CreateCodeReviewMutationArgs {
  input: CreateCodeReviewInput;
}
export interface CreateOfferMutationArgs {
  input: CreateOfferInput;
}
export interface LoginMutationArgs {
  input: LoginInput;
}
export interface RegisterMutationArgs {
  input: RegisterInput;
}
