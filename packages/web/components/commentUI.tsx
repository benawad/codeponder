/* TODO: move this file to @codeponder/ui */

import { MyButton, styled, Avatar, Icon, GrayText } from "@codeponder/ui";
import { Card, Flex, Text } from "rebass";
import {
  CodeReviewQuestionInfoFragment,
  QuestionReplyInfoFragment,
} from "./apollo-components";
import { distanceInWordsStrict } from "date-fns";

const CommentCard = styled(Card)`
  background-color: #fff;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  margin: 0.625em;

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

type KeysToExclude = {
  replies: true;
};

export type QuestionInfo = Pick<
  CodeReviewQuestionInfoFragment,
  Exclude<keyof CodeReviewQuestionInfoFragment, keyof KeysToExclude>
>;

export interface QuestionProps extends QuestionInfo {
  isOwner: boolean;
  newComment?: boolean;
}

interface ReplyProps extends QuestionReplyInfoFragment {
  isOwner: boolean;
  newComment?: boolean;
}

export type CommentProps = ReplyProps | QuestionProps;

interface CommentQuestionProps extends QuestionProps {
  onOpenEditor: (e: any) => void;
}

interface CommentReplyPropsProps extends ReplyProps {
  numReplies?: number; // not exist on reply
  onOpenEditor: (e: any) => void;
}

export const CommentBox: React.FC<
  CommentQuestionProps | CommentReplyPropsProps
> = ({
  text,
  isOwner,
  numReplies,
  createdAt,
  creator: { username = "", pictureUrl = "" } = {},
  onOpenEditor,
}) => {
  const dtString = distanceInWordsStrict(new Date(), Date.parse(createdAt), {
    addSuffix: true,
  });

  return (
    <CommentCard>
      <Flex className="comment-title" alignItems="center">
        <Flex alignItems="center">
          <Avatar m="0rem" size={28} src={pictureUrl} />
          <Flex flexDirection="column" justifyContent="center" ml=".6rem">
            <Flex alignItems="center">
              <Text mb=".2rem" fontFamily="rubik" fontSize={2} fontWeight="500">
                {username}
              </Text>
              {isOwner && (
                <Text className="user-role" fontSize={1}>
                  Author
                </Text>
              )}
            </Flex>
            <Flex>
              {numReplies && (
                <>
                  <Icon size={12} name="comment" fill="#A5A5A5" />
                  <GrayText>{numReplies}</GrayText>
                </>
              )}
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
