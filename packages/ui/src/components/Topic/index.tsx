import styled from "styled-components";

const Topic = styled.div`
  display: inline;
  padding: 0.5em;
  border-radius: 3px;
  background: #e2f3ff;
  text-align: center;
  font-family: "Rubik", sans-serif;
  font-size: 0.5rem;
  font-weight: 500;
  color: #3290d4;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 0.625rem;
  }
  &:hover {
    background: #f3faff;
  }
`;

export default Topic;
