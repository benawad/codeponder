import {
  QuestionInfoFragment,
  QuestionReplyInfoFragment,
} from "../generated/apollo-components";

export interface EditorSubmitProps {
  submitted: boolean;
  response?: QuestionInfoFragment | QuestionReplyInfoFragment | void;
}

type KeysToExclude = {
  replies: true;
};

export type QuestionInfo = Pick<
  QuestionInfoFragment,
  Exclude<keyof QuestionInfoFragment, keyof KeysToExclude>
>;

export interface QuestionProps extends QuestionInfo {
  isOwner: boolean;
  newComment?: boolean;
}

interface ReplyProps extends QuestionReplyInfoFragment {
  isOwner: boolean;
  newComment?: boolean;
  numReplies?: number; // not exist on reply but we use it in CommentCard
}

export type CommentProps = ReplyProps | QuestionProps;
