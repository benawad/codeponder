/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCodeReviewMutation
// ====================================================

export interface CreateCodeReviewMutation_createCodeReview_codeReview {
  id: string;
  numDays: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
}

export interface CreateCodeReviewMutation_createCodeReview_errors {
  path: string;
  message: string;
}

export interface CreateCodeReviewMutation_createCodeReview {
  codeReview: CreateCodeReviewMutation_createCodeReview_codeReview | null;
  errors: CreateCodeReviewMutation_createCodeReview_errors[] | null;
}

export interface CreateCodeReviewMutation {
  createCodeReview: CreateCodeReviewMutation_createCodeReview;
}

export interface CreateCodeReviewMutationVariables {
  input: CreateCodeReviewInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListCodeReviewsQuery
// ====================================================

export interface ListCodeReviewsQuery_listCodeReviews_owner {
  id: string;
  username: string;
  email: string;
}

export interface ListCodeReviewsQuery_listCodeReviews {
  id: string;
  numDays: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
  owner: ListCodeReviewsQuery_listCodeReviews_owner;
}

export interface ListCodeReviewsQuery {
  listCodeReviews: ListCodeReviewsQuery_listCodeReviews[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateOfferMutation
// ====================================================

export interface CreateOfferMutation_createOffer {
  ok: boolean;
}

export interface CreateOfferMutation {
  createOffer: CreateOfferMutation_createOffer;
}

export interface CreateOfferMutationVariables {
  input: CreateOfferInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateOfferStatusMutation
// ====================================================

export interface UpdateOfferStatusMutation_updateOfferStatus_offer_codeReview {
  id: string;
  numDays: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
}

export interface UpdateOfferStatusMutation_updateOfferStatus_offer_sender {
  id: string;
  username: string;
  email: string;
}

export interface UpdateOfferStatusMutation_updateOfferStatus_offer {
  status: string;
  codeReview: UpdateOfferStatusMutation_updateOfferStatus_offer_codeReview;
  sender: UpdateOfferStatusMutation_updateOfferStatus_offer_sender;
}

export interface UpdateOfferStatusMutation_updateOfferStatus {
  offer: UpdateOfferStatusMutation_updateOfferStatus_offer | null;
}

export interface UpdateOfferStatusMutation {
  updateOfferStatus: UpdateOfferStatusMutation_updateOfferStatus;
}

export interface UpdateOfferStatusMutationVariables {
  input: UpdateOfferStatusInput;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReceivedOffersQuery
// ====================================================

export interface ReceivedOffersQuery_receivedOffers_codeReview {
  id: string;
  numDays: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
}

export interface ReceivedOffersQuery_receivedOffers_sender {
  id: string;
  username: string;
  email: string;
}

export interface ReceivedOffersQuery_receivedOffers {
  status: string;
  codeReview: ReceivedOffersQuery_receivedOffers_codeReview;
  sender: ReceivedOffersQuery_receivedOffers_sender;
}

export interface ReceivedOffersQuery_myOffers_codeReview {
  id: string;
  numDays: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
}

export interface ReceivedOffersQuery_myOffers_sender {
  id: string;
  username: string;
  email: string;
}

export interface ReceivedOffersQuery_myOffers {
  status: string;
  codeReview: ReceivedOffersQuery_myOffers_codeReview;
  sender: ReceivedOffersQuery_myOffers_sender;
}

export interface ReceivedOffersQuery {
  receivedOffers: ReceivedOffersQuery_receivedOffers[];
  myOffers: ReceivedOffersQuery_myOffers[];
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
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation {
  logout: boolean;
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
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  id: string;
  username: string;
  email: string;
}

export interface MeQuery {
  me: MeQuery_me | null;
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

// ====================================================
// GraphQL fragment: OfferInfo
// ====================================================

export interface OfferInfo_codeReview {
  id: string;
  numDays: number | null;
  codeUrl: string;
  techTags: string[];
  notes: string;
}

export interface OfferInfo_sender {
  id: string;
  username: string;
  email: string;
}

export interface OfferInfo {
  status: string;
  codeReview: OfferInfo_codeReview;
  sender: OfferInfo_sender;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserInfo
// ====================================================

export interface UserInfo {
  id: string;
  username: string;
  email: string;
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

export interface UpdateOfferStatusInput {
  userId: string;
  codeReviewId: string;
  status: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
