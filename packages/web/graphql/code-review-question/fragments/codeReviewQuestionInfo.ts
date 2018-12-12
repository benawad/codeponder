import gql from "graphql-tag";

export const codeReviewQuestionInfoFragment = gql`
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
