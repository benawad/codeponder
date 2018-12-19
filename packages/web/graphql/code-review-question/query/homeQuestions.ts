import gql from "graphql-tag";

export const homeQuestionsQuery = gql`
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
