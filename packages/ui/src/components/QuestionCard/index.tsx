import * as React from "react";
import styled from "../../theme/styled-components";
import Topic from "../Topic";

interface Props {
  id: string;
  text: string;
  repo: string;
  username: string;
  programmingLanguage: string;
  creator: {
    id: string;
    username: string;
    pictureUrl: string;
  };
}

const Container = styled.div`
  border-radius: 9px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 16px;
  width: 376px;
  height: 157px;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 16px;
  color: #07385a;
`;

const CardBodyText = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 13px;
  color: #78909c;
  padding: 6px 0;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
`;

const SmallAvatar = styled.img`
  height: 16px;
  width: 16px;
  border-radius: 16.5px;
`;

const Username = styled.div`
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
  font-size: 12px;

  color: #3290d4;
  padding-left: 8px;
`;

export const QuestionCard: React.SFC<Props> = ({
  username: owner,
  repo,
  text,
  programmingLanguage,
  creator: { pictureUrl, username },
}) => {
  return (
    <Container>
      <CardHeader>
        {owner}/{repo}
      </CardHeader>
      <CardBodyText>{text}</CardBodyText>
      <CardFooter>
        <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
          <SmallAvatar src={pictureUrl} alt="avatar" />
          <Username>{username}</Username>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Topic>{programmingLanguage}</Topic>
        </div>
      </CardFooter>
    </Container>
  );
};
