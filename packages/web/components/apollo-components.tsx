export interface CreateQuestionReplyInput {
  text: string;

  questionId: string;
}

export interface CreateCodeReviewQuestionInput {
  startingLineNum: number;

  endingLineNum: number;

  text: string;

  path?: string | null;

  repo: string;

  branch: string;

  username: string;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

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
  username: string;
  branch: string;
  repo: string;
  path?: string | null;
};

export type FindCodeReviewQuestionsQuery = {
  __typename?: "Query";

  findCodeReviewQuestions: FindCodeReviewQuestionsFindCodeReviewQuestions[];
};

export type FindCodeReviewQuestionsFindCodeReviewQuestions = CodeReviewQuestionInfoFragment;

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

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: MeMe | null;
};

export type MeMe = UserInfoFragment;

export type CodeReviewQuestionInfoFragment = {
  __typename?: "CodeReviewQuestion";

  id: string;

  startingLineNum: number;

  endingLineNum: number;

  text: string;

  path: string | null;

  repo: string;

  branch: string;

  username: string;

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

  accessToken: string;
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
    path
    repo
    branch
    username
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
  query FindCodeReviewQuestions(
    $username: String!
    $branch: String!
    $repo: String!
    $path: String
  ) {
    findCodeReviewQuestions(
      username: $username
      branch: $branch
      repo: $repo
      path: $path
    ) {
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
