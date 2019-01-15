/* TODO: move this file to @codeponder/ui */

import { MyButton, styled, Avatar, Icon, GrayText } from "@codeponder/ui";
import { Card, Flex, Text } from "rebass";
import {
  CodeReviewQuestionInfoFragment,
  QuestionReplyInfoFragment,
} from "./apollo-components";
import { distanceInWordsStrict } from "date-fns";

export const CommentCard = styled(Card)`
  background-color: #fff;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  margin: 0.652em;

  & .comment-title {
    border-bottom: 1px solid #d1d5da;
    padding: 0.5em;
  }

  & .user-role {
    background-color: rgb(253, 243, 218);
    border: 1px solid rgb(233, 219, 205);
    border-radius: 3px;
    font-family: rubik;
    margin-left: 0.5em;
    padding: 2px 4px;
  }

  & .comment-text {
    margin: 0;
    padding: 0.7rem;
    white-space: normal;
  }

  & .btn-reply {
    border-color: rgba(27, 31, 35, 0.1);
    line-height: 1;
    margin-left: auto;
    margin-right: 5px;
    padding: 0.3em;
  }
`;

export interface Comments {
  [key: number]: CommentProps[];
}

// type Q = Omit<CodeReviewQuestionInfoFragment, "__typename">;
type Q = Pick<
  CodeReviewQuestionInfoFragment,
  Exclude<keyof CodeReviewQuestionInfoFragment, "__typename">
>;

type R = Pick<
  QuestionReplyInfoFragment,
  Exclude<keyof QuestionReplyInfoFragment, "__typename">
>;
export interface CommentProps extends Q, R {
  newComment?: boolean;
  id: string;
  startingLineNum?: number; // not include in reply
  endingLineNum?: number; // not include in reply
  text?: string;
  username?: string;
  isOwner?: boolean;
  __typename?: "CodeReviewQuestion" | "QuestionReply";
  type: "reply" | "question";
}

interface CommentFunctionProps extends CommentProps {
  onOpenEditor: (props: any) => any;
}

interface Props {
  onOpenEditor: (props: any) => any;
  id: string;
  text: string;
  programmingLanguage?: string | null;
  codeSnippet?: string | null;
  numReplies: number;
  createdAt: string;
  path?: string | null;
  creator: {
    id: string;
    username: string;
    pictureUrl: string;
    bio: string;
    accessToken?: string | null;
  };
  username: string;
  isOwner: boolean;
}

export const CommentBox: React.FC<Props> = ({
  text,
  isOwner,
  // username: _username,
  createdAt,
  creator: { username = "", pictureUrl = "" } = {},
  onOpenEditor,
}) => {
  const dtString =
    createdAt &&
    distanceInWordsStrict(new Date(), Date.parse(createdAt), {
      addSuffix: true,
    });

  /*
  * result from question/reply mutation missing:
    - creator
   * result from reply mutation and QuestionReplyInfoFragment missing:
    - createdAt
  */

  return (
    <CommentCard>
      <Flex className="comment-title" alignItems="center">
        <Flex alignItems="center">
          <Avatar m="0rem" size={28} src={pictureUrl} />
          <Flex flexDirection="column" justifyContent="center" ml=".6rem">
            <Flex alignItems="center">
              <Text mb=".2rem" fontFamily="rubik" fontSize={2} fontWeight="500">
                {username || "?????"}
              </Text>
              {isOwner && (
                <Text className="user-role" fontSize={1}>
                  Author
                </Text>
              )}
            </Flex>
            <Flex>
              <Icon size={12} name="clock" fill="#A5A5A5" />
              <GrayText>{dtString}</GrayText>
            </Flex>
          </Flex>
        </Flex>
        <MyButton
          variant="form"
          className="btn-reply"
          onClick={onOpenEditor}
          title="Reply"
        >
          <Icon size={16} name="reply" fill="#555555" />
        </MyButton>
      </Flex>

      <Text
        className="comment-text"
        fontFamily="rubik"
        fontSize={2}
        color="#78909C"
      >
        {text}
        {
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est consequuntur modi quas alias placeat aliquam vitae explicabo magni saepe commodi. Corporis ullam ratione fugit optio tempore provident voluptates commodi quasi!"
        }
      </Text>
    </CommentCard>
  );
};
