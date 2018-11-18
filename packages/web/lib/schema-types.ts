/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCodeReviewRequestMutation
// ====================================================

export interface CreateCodeReviewRequestMutation_createCodeReview_codeReview {
  id: string;
  numDays: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
}

export interface CreateCodeReviewRequestMutation_createCodeReview_errors {
  path: string;
  message: string;
}

export interface CreateCodeReviewRequestMutation_createCodeReview {
  codeReview: CreateCodeReviewRequestMutation_createCodeReview_codeReview | null;
  errors: CreateCodeReviewRequestMutation_createCodeReview_errors[] | null;
}

export interface CreateCodeReviewRequestMutation {
  createCodeReview: CreateCodeReviewRequestMutation_createCodeReview;
}

export interface CreateCodeReviewRequestMutationVariables {
  input: CreateCodeReviewInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListcodeReviewsQuery
// ====================================================

export interface ListcodeReviewsQuery_listcodeReviews_owner {
  id: string;
  username: string;
}

export interface ListcodeReviewsQuery_listcodeReviews {
  id: string;
  numDays: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
  owner: ListcodeReviewsQuery_listcodeReviews_owner;
}

export interface ListCodeReviewsQuery {
  listcodeReviews: ListcodeReviewsQuery_listcodeReviews[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login_user {
  id: string;
  username: string;
  email: string;
}

export interface LoginMutation_login_errors {
  path: string;
  message: string;
}

export interface LoginMutation_login {
  user: LoginMutation_login_user | null;
  errors: LoginMutation_login_errors[] | null;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  input: LoginInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation_register_errors {
  path: string;
  message: string;
}

export interface RegisterMutation_register {
  errors: RegisterMutation_register_errors[] | null;
}

export interface RegisterMutation {
  register: RegisterMutation_register;
}

export interface RegisterMutationVariables {
  input: RegisterInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CodeReviewInfo
// ====================================================

export interface CodeReviewInfo {
  id: string;
  numDays: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateCodeReviewInput {
  numDays?: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
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

//==============================================================
// END Enums and Input Objects
//==============================================================
