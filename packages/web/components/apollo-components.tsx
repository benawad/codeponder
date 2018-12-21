export type Maybe<T> = T | null;

export interface FindCodeReviewPostInput {
  topics?: Maybe<string[]>;

  offset: number;

  limit: number;
}

export interface CreateQuestionReplyInput {
  text: string;

  questionId: string;
}

export interface CreateCodeReviewQuestionInput {
  startingLineNum: number;

  endingLineNum: number;

  text: string;

  postId: string;

  path?: Maybe<string>;

  codeSnippet?: Maybe<string>;

  programmingLanguage: string;
}

export interface CreateCodeReviewPostInput {
  topics: string[];

  repo: string;

  title: string;

  description: string;

  commitId: string;

  repoOwner: string;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export type FindOrCreateCodeReviewPostVariables = {
  codeReviewPost: CreateCodeReviewPostInput;
};

export type FindOrCreateCodeReviewPostMutation = {
  __typename?: "Mutation";

  findOrCreateCodeReviewPost: FindOrCreateCodeReviewPostFindOrCreateCodeReviewPost;
};

export type FindOrCreateCodeReviewPostFindOrCreateCodeReviewPost = {
  __typename?: "CreateCodeReviewPostResponse";

  codeReviewPost: FindOrCreateCodeReviewPostCodeReviewPost;
};

export type FindOrCreateCodeReviewPostCodeReviewPost = CodeReviewPostInfoFragment;

export type FindCodeReviewPostVariables = {
  input: FindCodeReviewPostInput;
};

export type FindCodeReviewPostQuery = {
  __typename?: "Query";

  findCodeReviewPost: FindCodeReviewPostFindCodeReviewPost;
};

export type FindCodeReviewPostFindCodeReviewPost = {
  __typename?: "FindCodeReviewPostResponse";

  hasMore: boolean;

  posts: FindCodeReviewPostPosts[];
};

export type FindCodeReviewPostPosts = CodeReviewPostInfoFragment;

export type GetCodeReviewPostByIdVariables = {
  id: string;
};

export type GetCodeReviewPostByIdQuery = {
  __typename?: "Query";

  getCodeReviewPostById: Maybe<GetCodeReviewPostByIdGetCodeReviewPostById>;
};

export type GetCodeReviewPostByIdGetCodeReviewPostById = CodeReviewPostInfoFragment;

export type CreateCodeReviewQuestionVariables = {
  codeReviewQuestion: CreateCodeReviewQuestionInput;
};

export type CreateCodeReviewQuestionMutation = {
  __typename?: "Mutation";

  createCodeReviewQuestion: CreateCodeReviewQuestionCreateCodeReviewQuestion;
};

export type CreateCodeReviewQuestionCreateCodeReviewQuestion = {
  __typename?: "CreateCodeReviewQuestionResponse";

  codeReviewQuestion: CreateCodeReviewQuestionCodeReviewQuestion;
};

export type CreateCodeReviewQuestionCodeReviewQuestion = CodeReviewQuestionInfoFragment;

export type FindCodeReviewQuestionsVariables = {
  postId: string;
  path?: Maybe<string>;
};

export type FindCodeReviewQuestionsQuery = {
  __typename?: "Query";

  findCodeReviewQuestions: FindCodeReviewQuestionsFindCodeReviewQuestions[];
};

export type FindCodeReviewQuestionsFindCodeReviewQuestions = CodeReviewQuestionInfoFragment;

export type HomeQuestionsVariables = {
  offset?: Maybe<number>;
  limit?: Maybe<number>;
};

export type HomeQuestionsQuery = {
  __typename?: "Query";

  homeQuestions: HomeQuestionsHomeQuestions[];
};

export type HomeQuestionsHomeQuestions = {
  __typename?: "CodeReviewQuestion";

  id: string;

  text: string;

  programmingLanguage: string;

  creator: HomeQuestionsCreator;
};

export type HomeQuestionsCreator = {
  __typename?: "User";

  id: string;

  username: string;

  pictureUrl: string;
};

export type CreateQuestionReplyVariables = {
  questionReply: CreateQuestionReplyInput;
};

export type CreateQuestionReplyMutation = {
  __typename?: "Mutation";

  createQuestionReply: CreateQuestionReplyCreateQuestionReply;
};

export type CreateQuestionReplyCreateQuestionReply = {
  __typename?: "CreateQuestionReplyResponse";

  questionReply: CreateQuestionReplyQuestionReply;
};

export type CreateQuestionReplyQuestionReply = QuestionReplyInfoFragment;

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = UserInfoFragment;

export type CodeReviewPostInfoFragment = {
  __typename?: "CodeReviewPost";

  id: string;

  title: string;

  repo: string;

  commitId: string;

  repoOwner: string;

  topics: string[];

  numQuestions: number;

  createdAt: DateTime;

  creator: CodeReviewPostInfoCreator;
};

export type CodeReviewPostInfoCreator = UserInfoFragment;

export type CodeReviewQuestionInfoFragment = {
  __typename?: "CodeReviewQuestion";

  id: string;

  startingLineNum: number;

  endingLineNum: number;

  text: string;

  programmingLanguage: string;

  creator: CodeReviewQuestionInfoCreator;

  replies: CodeReviewQuestionInfoReplies[];
};

export type CodeReviewQuestionInfoCreator = UserInfoFragment;

export type CodeReviewQuestionInfoReplies = QuestionReplyInfoFragment;

export type QuestionReplyInfoFragment = {
  __typename?: "QuestionReply";

  id: string;

  text: string;

  creator: QuestionReplyInfoCreator;
};

export type QuestionReplyInfoCreator = UserInfoFragment;

export type UserInfoFragment = {
  __typename?: "User";

  id: string;

  username: string;

  pictureUrl: string;

  bio: string;

  accessToken: Maybe<string>;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    username
    pictureUrl
    bio
    accessToken
  }
`;

export const CodeReviewPostInfoFragmentDoc = gql`
  fragment CodeReviewPostInfo on CodeReviewPost {
    id
    title
    repo
    commitId
    repoOwner
    topics
    numQuestions
    createdAt
    creator {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;

export const QuestionReplyInfoFragmentDoc = gql`
  fragment QuestionReplyInfo on QuestionReply {
    id
    text
    creator {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;

export const CodeReviewQuestionInfoFragmentDoc = gql`
  fragment CodeReviewQuestionInfo on CodeReviewQuestion {
    id
    startingLineNum
    endingLineNum
    text
    programmingLanguage
    creator {
      ...UserInfo
    }
    replies {
      ...QuestionReplyInfo
    }
  }

  ${UserInfoFragmentDoc}
  ${QuestionReplyInfoFragmentDoc}
`;

// ====================================================
// Components
// ====================================================

export const FindOrCreateCodeReviewPostDocument = gql`
  mutation FindOrCreateCodeReviewPost(
    $codeReviewPost: CreateCodeReviewPostInput!
  ) {
    findOrCreateCodeReviewPost(codeReviewPost: $codeReviewPost) {
      codeReviewPost {
        ...CodeReviewPostInfo
      }
    }
  }

  ${CodeReviewPostInfoFragmentDoc}
`;
export class FindOrCreateCodeReviewPostComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      FindOrCreateCodeReviewPostMutation,
      FindOrCreateCodeReviewPostVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        FindOrCreateCodeReviewPostMutation,
        FindOrCreateCodeReviewPostVariables
      >
        mutation={FindOrCreateCodeReviewPostDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindOrCreateCodeReviewPostProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    FindOrCreateCodeReviewPostMutation,
    FindOrCreateCodeReviewPostVariables
  >
> &
  TChildProps;
export type FindOrCreateCodeReviewPostMutationFn = ReactApollo.MutationFn<
  FindOrCreateCodeReviewPostMutation,
  FindOrCreateCodeReviewPostVariables
>;
export function FindOrCreateCodeReviewPostHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindOrCreateCodeReviewPostMutation,
        FindOrCreateCodeReviewPostVariables,
        FindOrCreateCodeReviewPostProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindOrCreateCodeReviewPostMutation,
    FindOrCreateCodeReviewPostVariables,
    FindOrCreateCodeReviewPostProps<TChildProps>
  >(FindOrCreateCodeReviewPostDocument, operationOptions);
}
export const FindCodeReviewPostDocument = gql`
  query findCodeReviewPost($input: FindCodeReviewPostInput!) {
    findCodeReviewPost(input: $input) {
      hasMore
      posts {
        ...CodeReviewPostInfo
      }
    }
  }

  ${CodeReviewPostInfoFragmentDoc}
`;
export class FindCodeReviewPostComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<FindCodeReviewPostQuery, FindCodeReviewPostVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<FindCodeReviewPostQuery, FindCodeReviewPostVariables>
        query={FindCodeReviewPostDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindCodeReviewPostProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindCodeReviewPostQuery, FindCodeReviewPostVariables>
> &
  TChildProps;
export function FindCodeReviewPostHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindCodeReviewPostQuery,
        FindCodeReviewPostVariables,
        FindCodeReviewPostProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindCodeReviewPostQuery,
    FindCodeReviewPostVariables,
    FindCodeReviewPostProps<TChildProps>
  >(FindCodeReviewPostDocument, operationOptions);
}
export const GetCodeReviewPostByIdDocument = gql`
  query GetCodeReviewPostById($id: String!) {
    getCodeReviewPostById(id: $id) {
      ...CodeReviewPostInfo
    }
  }

  ${CodeReviewPostInfoFragmentDoc}
`;
export class GetCodeReviewPostByIdComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      GetCodeReviewPostByIdQuery,
      GetCodeReviewPostByIdVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        GetCodeReviewPostByIdQuery,
        GetCodeReviewPostByIdVariables
      >
        query={GetCodeReviewPostByIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetCodeReviewPostByIdProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    GetCodeReviewPostByIdQuery,
    GetCodeReviewPostByIdVariables
  >
> &
  TChildProps;
export function GetCodeReviewPostByIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetCodeReviewPostByIdQuery,
        GetCodeReviewPostByIdVariables,
        GetCodeReviewPostByIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetCodeReviewPostByIdQuery,
    GetCodeReviewPostByIdVariables,
    GetCodeReviewPostByIdProps<TChildProps>
  >(GetCodeReviewPostByIdDocument, operationOptions);
}
export const CreateCodeReviewQuestionDocument = gql`
  mutation CreateCodeReviewQuestion(
    $codeReviewQuestion: CreateCodeReviewQuestionInput!
  ) {
    createCodeReviewQuestion(codeReviewQuestion: $codeReviewQuestion) {
      codeReviewQuestion {
        ...CodeReviewQuestionInfo
      }
    }
  }

  ${CodeReviewQuestionInfoFragmentDoc}
`;
export class CreateCodeReviewQuestionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateCodeReviewQuestionMutation,
      CreateCodeReviewQuestionVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateCodeReviewQuestionMutation,
        CreateCodeReviewQuestionVariables
      >
        mutation={CreateCodeReviewQuestionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateCodeReviewQuestionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    CreateCodeReviewQuestionMutation,
    CreateCodeReviewQuestionVariables
  >
> &
  TChildProps;
export type CreateCodeReviewQuestionMutationFn = ReactApollo.MutationFn<
  CreateCodeReviewQuestionMutation,
  CreateCodeReviewQuestionVariables
>;
export function CreateCodeReviewQuestionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateCodeReviewQuestionMutation,
        CreateCodeReviewQuestionVariables,
        CreateCodeReviewQuestionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateCodeReviewQuestionMutation,
    CreateCodeReviewQuestionVariables,
    CreateCodeReviewQuestionProps<TChildProps>
  >(CreateCodeReviewQuestionDocument, operationOptions);
}
export const FindCodeReviewQuestionsDocument = gql`
  query FindCodeReviewQuestions($postId: String!, $path: String) {
    findCodeReviewQuestions(postId: $postId, path: $path) {
      ...CodeReviewQuestionInfo
    }
  }

  ${CodeReviewQuestionInfoFragmentDoc}
`;
export class FindCodeReviewQuestionsComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<
      FindCodeReviewQuestionsQuery,
      FindCodeReviewQuestionsVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Query<
        FindCodeReviewQuestionsQuery,
        FindCodeReviewQuestionsVariables
      >
        query={FindCodeReviewQuestionsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindCodeReviewQuestionsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<
    FindCodeReviewQuestionsQuery,
    FindCodeReviewQuestionsVariables
  >
> &
  TChildProps;
export function FindCodeReviewQuestionsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindCodeReviewQuestionsQuery,
        FindCodeReviewQuestionsVariables,
        FindCodeReviewQuestionsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindCodeReviewQuestionsQuery,
    FindCodeReviewQuestionsVariables,
    FindCodeReviewQuestionsProps<TChildProps>
  >(FindCodeReviewQuestionsDocument, operationOptions);
}
export const HomeQuestionsDocument = gql`
  query HomeQuestions($offset: Int, $limit: Int) {
    homeQuestions(offset: $offset, limit: $limit) {
      id
      text
      programmingLanguage
      creator {
        id
        username
        pictureUrl
      }
    }
  }
`;
export class HomeQuestionsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<HomeQuestionsQuery, HomeQuestionsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<HomeQuestionsQuery, HomeQuestionsVariables>
        query={HomeQuestionsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type HomeQuestionsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<HomeQuestionsQuery, HomeQuestionsVariables>
> &
  TChildProps;
export function HomeQuestionsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        HomeQuestionsQuery,
        HomeQuestionsVariables,
        HomeQuestionsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    HomeQuestionsQuery,
    HomeQuestionsVariables,
    HomeQuestionsProps<TChildProps>
  >(HomeQuestionsDocument, operationOptions);
}
export const CreateQuestionReplyDocument = gql`
  mutation CreateQuestionReply($questionReply: CreateQuestionReplyInput!) {
    createQuestionReply(questionReply: $questionReply) {
      questionReply {
        ...QuestionReplyInfo
      }
    }
  }

  ${QuestionReplyInfoFragmentDoc}
`;
export class CreateQuestionReplyComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateQuestionReplyMutation,
      CreateQuestionReplyVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateQuestionReplyMutation,
        CreateQuestionReplyVariables
      >
        mutation={CreateQuestionReplyDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateQuestionReplyProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    CreateQuestionReplyMutation,
    CreateQuestionReplyVariables
  >
> &
  TChildProps;
export type CreateQuestionReplyMutationFn = ReactApollo.MutationFn<
  CreateQuestionReplyMutation,
  CreateQuestionReplyVariables
>;
export function CreateQuestionReplyHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateQuestionReplyMutation,
        CreateQuestionReplyVariables,
        CreateQuestionReplyProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateQuestionReplyMutation,
    CreateQuestionReplyVariables,
    CreateQuestionReplyProps<TChildProps>
  >(CreateQuestionReplyDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
