export interface CreateCodeReviewQuestionInput {
  startingLineNum: number;

  endingLineNum: number;

  question: string;

  path: string;

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
  path: string;
  repo: string;
  branch: string;
  username: string;
};

export type CreateCodeReviewMutation = {
  __typename?: "Mutation";

  createCodeReviewQuestion: CreateCodeReviewCreateCodeReviewQuestion | null;
};

export type CreateCodeReviewCreateCodeReviewQuestion = {
  __typename?: "CreateCodeReviewResponse";

  codeReviewQuestion: CreateCodeReviewCodeReviewQuestion;
};

export type CreateCodeReviewCodeReviewQuestion = {
  __typename?: "CodeReviewQuestion";

  id: string;

  startingLineNum: number;

  endingLineNum: number;

  question: string;

  path: string;

  repo: string;

  branch: string;

  username: string;

  creatorId: string;
};

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

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const CreateCodeReviewDocument = gql`
  mutation CreateCodeReview(
    $startingLineNum: Int!
    $endingLineNum: Int!
    $question: String!
    $path: String!
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
    }
  }
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
