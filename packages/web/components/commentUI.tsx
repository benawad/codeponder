/* TODO: move this file to @codeponder/ui */

import { MyButton, styled } from "@codeponder/ui";

export const CommentBoxContainer = styled.div`
  background-color: #fff;

  & .comment-inner-box {
    border: 1px solid #d1d5da;
    border-radius: 3px;
    margin: 0.652em;
  }

  & .comment-title {
    align-items: center;
    border-bottom: 1px solid #d1d5da;
    display: flex;
    padding: 0.5em;
  }

  & .comment-creator {
    font-weight: 600;
  }

  & .repo-owner {
    background-color: rgb(253, 243, 218);
    border: 1px solid rgb(233, 219, 205);
    margin-left: 0.5em;
    padding: 2px 4px;
  }

  & .comment-text {
    margin: 0;
    padding: 0.5em;
    white-space: normal;
  }

  & .btn-reply {
    margin-left: auto;
  }
`;

export interface Comments {
  [key: number]: CommentProps[];
}

export interface CommentProps {
  id: string;
  startingLineNum?: number; // not include in reply
  endingLineNum?: number; // not include in reply
  text?: string;
  username?: string;
  isOwner?: boolean;
  type: "reply" | "question";
}

interface CommentFunctionProps extends CommentProps {
  onOpenEditor: (props: any) => any;
}

export const CommentBox: React.SFC<CommentFunctionProps> = ({
  username,
  text,
  isOwner,
  onOpenEditor,
}) => (
  <CommentBoxContainer>
    <div className="comment-inner-box">
      <div className="comment-title">
        <span className="comment-creator">{username}</span>
        {isOwner ? <span className="repo-owner">Author</span> : null}
        <MyButton
          variant="form"
          className="btn-reply primary"
          onClick={onOpenEditor}
        >
          Reply
        </MyButton>
      </div>
      <p className="comment-text">
        {text}
        {
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est consequuntur modi quas alias placeat aliquam vitae explicabo magni saepe commodi. Corporis ullam ratione fugit optio tempore provident voluptates commodi quasi!"
        }
      </p>
    </div>
  </CommentBoxContainer>
);
