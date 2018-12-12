export interface CreateCodeReviewQuestionInput {
  startingLineNum: number;

  endingLineNum: number;

  question: string;

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

export type CreateCodeReviewVariables = {
  startingLineNum: number;
  endingLineNum: number;
  question: string;
  path?: string | null;
  repo: string;
  branch: string;
  username: string;
};

export type CreateCodeReviewMutation = {
  __typename?: "Mutation";

  createCodeReviewQuestion: CreateCodeReviewCreateCodeReviewQuestion;
};

export type CreateCodeReviewCreateCodeReviewQuestion = {
  __typename?: "CreateCodeReviewResponse";

  codeReviewQuestion: CreateCodeReviewCodeReviewQuestion;
};

export type CreateCodeReviewCodeReviewQuestion = CodeReviewQuestionInfoFragment;

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

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: MeMe | null;
};

export type MeMe = {
  __typename?: "User";

  id: string;

  username: string;

  pictureUrl: string;

  bio: string;

  accessToken: string;
};

export type CodeReviewQuestionInfoFragment = {
  __typename?: "CodeReviewQuestion";

  id: string;

  startingLineNum: number;

  endingLineNum: number;

  question: string;

  path: string | null;

  repo: string;

  branch: string;

  username: string;

  creatorId: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const CodeReviewQuestionInfoFragmentDoc = gql`
  fragment CodeReviewQuestionInfo on CodeReviewQuestion {
    id
    startingLineNum
    endingLineNum
    question
    path
    repo
    branch
    username
    creatorId
  }
`;

// ====================================================
// Components
// ====================================================

export const CreateCodeReviewDocument = gql`
  mutation CreateCodeReview(
    $startingLineNum: Int!
    $endingLineNum: Int!
    $question: String!
    $path: String
    $repo: String!
    $branch: String!
    $username: String!
  ) {
    createCodeReviewQuestion(
      question: {
        startingLineNum: $startingLineNum
        endingLineNum: $endingLineNum
        question: $question
        path: $path
        repo: $repo
        branch: $branch
        username: $username
      }
    ) {
      codeReviewQuestion {
        ...CodeReviewQuestionInfo
      }
    }
  }

  ${CodeReviewQuestionInfoFragmentDoc}
`;
export class CreateCodeReviewComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateCodeReviewMutation,
      CreateCodeReviewVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateCodeReviewMutation, CreateCodeReviewVariables>
        mutation={CreateCodeReviewDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateCodeReviewProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateCodeReviewMutation, CreateCodeReviewVariables>
> &
  TChildProps;
export type CreateCodeReviewMutationFn = ReactApollo.MutationFn<
  CreateCodeReviewMutation,
  CreateCodeReviewVariables
>;
export function CreateCodeReviewHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateCodeReviewMutation,
        CreateCodeReviewVariables,
        CreateCodeReviewProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateCodeReviewMutation,
    CreateCodeReviewVariables,
    CreateCodeReviewProps<TChildProps>
  >(CreateCodeReviewDocument, operationOptions);
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
export const MeDocument = gql`
  query Me {
    me {
      id
      username
      pictureUrl
      bio
      accessToken
    }
  }
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
