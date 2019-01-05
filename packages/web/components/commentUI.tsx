/* TODO: move this file to @codeponder/ui */

import { MyButton, styled } from "@codeponder/ui";

export const getBorderColor = (type: string) => {
  const colors: { [key: string]: string } = {
    question: "rgb(238, 238, 88)",
    reply: "rgb(235, 73, 144)",
    editor: "rgb(0, 238, 88)",
  };
  return colors[type];
};

export const CommentBoxContainer = styled.div`
  background-color: #fff;
  display: grid;
  grid-template-columns: 3em auto;
  grid-column-gap: 0.65em;

  & .comment-inner-box {
    border: 1px solid #999;
    border-left: 10px solid
      ${(p: { color?: string }) => p.color || getBorderColor("question")};
    margin: 4px 0;
  }

  & .comment-title {
    align-items: center;
    border-bottom: 1px solid #999;
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
  type,
  onOpenEditor,
}) => (
  <CommentBoxContainer color={getBorderColor(type)}>
    <span className="line-number comment" />
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

// TODO: fix type definition
export const wrapEditor = (ChildComponent: (props: any) => JSX.Element) => (
  props: any
) => (
  <CommentBoxContainer color={getBorderColor("editor")}>
    <span className="line-number comment" />
    <div className="comment-inner-box">
      <ChildComponent {...props} />
    </div>
  </CommentBoxContainer>
);
