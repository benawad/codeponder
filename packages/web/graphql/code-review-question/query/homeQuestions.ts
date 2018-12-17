import gql from "graphql-tag";

export const homeQuestionsQuery = gql`
  query HomeQuestions {
    homeQuestions {
      id
      text
      repo
      username
      programmingLanguage
      creator {
        id
        username
        pictureUrl
      }
    }
  }
`;
