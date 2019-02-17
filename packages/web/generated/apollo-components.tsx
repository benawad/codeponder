export type Maybe<T> = T | null;

export interface FindPostInput {
  topics?: Maybe<string[]>;

  cursor?: Maybe<string>;
}

export interface CreateCommentInput {
  text: string;

  questionId: string;
}

export interface CreatePostInput {
  topics: string[];

  repo: string;

  title: string;

  description: string;

  commitId: string;

  repoOwner: string;
}

export interface CreateQuestionInput {
  lineNum?: Maybe<number>;

  title: string;

  text: string;

  postId: string;

  path?: Maybe<string>;

  codeSnippet?: Maybe<string>;

  programmingLanguage?: Maybe<string>;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export type CreateCommentVariables = {
  comment: CreateCommentInput;
};

export type CreateCommentMutation = {
  __typename?: "Mutation";

  createComment: CreateCommentCreateComment;
};

export type CreateCommentCreateComment = {
  __typename?: "CommentResponse";

  comment: CreateCommentComment;
};

export type CreateCommentComment = CommentInfoFragment;

export type FindOrCreatePostVariables = {
  post: CreatePostInput;
};

export type FindOrCreatePostMutation = {
  __typename?: "Mutation";

  findOrCreatePost: FindOrCreatePostFindOrCreatePost;
};

export type FindOrCreatePostFindOrCreatePost = {
  __typename?: "PostResponse";

  post: FindOrCreatePostPost;
};

export type FindOrCreatePostPost = PostInfoFragment;

export type FindPostVariables = {
  input: FindPostInput;
};

export type FindPostQuery = {
  __typename?: "Query";

  findPost: FindPostFindPost;
};

export type FindPostFindPost = {
  __typename?: "FindPostResponse";

  hasMore: boolean;

  posts: FindPostPosts[];
};

export type FindPostPosts = PostInfoFragment;

export type GetPostByIdVariables = {
  id: string;
};

export type GetPostByIdQuery = {
  __typename?: "Query";

  getPostById: Maybe<GetPostByIdGetPostById>;
};

export type GetPostByIdGetPostById = PostInfoFragment;

export type MarkAllNotificationsAsReadVariables = {};

export type MarkAllNotificationsAsReadMutation = {
  __typename?: "Mutation";

  markAllNotificationsAsRead: MarkAllNotificationsAsReadMarkAllNotificationsAsRead;
};

export type MarkAllNotificationsAsReadMarkAllNotificationsAsRead = {
  __typename?: "OkResponse";

  ok: boolean;
};

export type UpdateNotificationReadVariables = {
  read: boolean;
  questionId: string;
  commentId: string;
};

export type UpdateNotificationReadMutation = {
  __typename?: "Mutation";

  updateNotificationRead: UpdateNotificationReadUpdateNotificationRead;
};

export type UpdateNotificationReadUpdateNotificationRead = {
  __typename?: "OkResponse";

  ok: boolean;
};

export type NotificationsVariables = {
  cursor?: Maybe<string>;
};

export type NotificationsQuery = {
  __typename?: "Query";

  notifications: NotificationsNotifications;
};

export type NotificationsNotifications = {
  __typename?: "NotificationsResponse";

  hasMore: boolean;

  notifications: Notifications_Notifications[];
};

export type Notifications_Notifications = {
  __typename?: "QuestionCommentNotification";

  type: string;

  createdAt: DateTime;

  read: boolean;

  comment: NotificationsComment;

  question: NotificationsQuestion;
};

export type NotificationsComment = {
  __typename?: "Comment";

  id: string;

  creator: NotificationsCreator;
};

export type NotificationsCreator = {
  __typename?: "User";

  username: string;

  pictureUrl: string;
};

export type NotificationsQuestion = {
  __typename?: "Question";

  id: string;

  title: string;

  path: Maybe<string>;

  post: NotificationsPost;
};

export type NotificationsPost = {
  __typename?: "Post";

  id: string;

  repo: string;

  creator: Notifications_Creator;
};

export type Notifications_Creator = {
  __typename?: "User";

  username: string;
};

export type CreateQuestionVariables = {
  question: CreateQuestionInput;
};

export type CreateQuestionMutation = {
  __typename?: "Mutation";

  createQuestion: CreateQuestionCreateQuestion;
};

export type CreateQuestionCreateQuestion = {
  __typename?: "QuestionResponse";

  question: CreateQuestionQuestion;
};

export type CreateQuestionQuestion = QuestionInfoFragment;

export type FindQuestionsVariables = {
  postId: string;
  path?: Maybe<string>;
};

export type FindQuestionsQuery = {
  __typename?: "Query";

  findQuestions: FindQuestionsFindQuestions[];
};

export type FindQuestionsFindQuestions = QuestionInfoFragment;

export type HomeQuestionsVariables = {
  offset?: Maybe<number>;
  limit?: Maybe<number>;
};

export type HomeQuestionsQuery = {
  __typename?: "Query";

  homeQuestions: HomeQuestionsHomeQuestions[];
};

export type HomeQuestionsHomeQuestions = {
  __typename?: "Question";

  id: string;

  text: string;

  programmingLanguage: Maybe<string>;

  creator: HomeQuestionsCreator;
};

export type HomeQuestionsCreator = {
  __typename?: "User";

  id: string;

  username: string;

  pictureUrl: string;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = UserInfoFragment;

export type CommentInfoFragment = {
  __typename?: "Comment";

  id: string;

  text: string;

  createdAt: DateTime;

  creator: CommentInfoCreator;
};

export type CommentInfoCreator = UserInfoFragment;

export type PostInfoFragment = {
  __typename?: "Post";

  id: string;

  title: string;

  repo: string;

  commitId: string;

  repoOwner: string;

  topics: string[];

  numQuestions: number;

  createdAt: DateTime;

  creator: PostInfoCreator;
};

export type PostInfoCreator = UserInfoFragment;

export type QuestionInfoFragment = {
  __typename?: "Question";

  id: string;

  lineNum: Maybe<number>;

  title: string;

  text: string;

  programmingLanguage: Maybe<string>;

  codeSnippet: Maybe<string>;

  numComments: number;

  createdAt: DateTime;

  path: Maybe<string>;

  postId: string;

  creator: QuestionInfoCreator;

  comments: QuestionInfoComments[];
};

export type QuestionInfoCreator = UserInfoFragment;

export type QuestionInfoComments = CommentInfoFragment;

export type UserInfoFragment = {
  __typename?: "User";

  id: string;

  username: string;

  pictureUrl: string;

  bio: string;

  accessToken: Maybe<string>;

  hasUnreadNotifications: boolean;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    username
    pictureUrl
    bio
    accessToken
    hasUnreadNotifications
  }
`;

export const PostInfoFragmentDoc = gql`
  fragment PostInfo on Post {
    id
    title
    repo
    commitId
    repoOwner
    topics
    numQuestions
    createdAt
    creator {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;

export const CommentInfoFragmentDoc = gql`
  fragment CommentInfo on Comment {
    id
    text
    createdAt
    creator {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;

export const QuestionInfoFragmentDoc = gql`
  fragment QuestionInfo on Question {
    id
    lineNum
    title
    text
    programmingLanguage
    codeSnippet
    numComments
    createdAt
    path
    postId
    creator {
      ...UserInfo
    }
    comments {
      ...CommentInfo
    }
  }

  ${UserInfoFragmentDoc}
  ${CommentInfoFragmentDoc}
`;

// ====================================================
// Components
// ====================================================

export const CreateCommentDocument = gql`
  mutation CreateComment($comment: CreateCommentInput!) {
    createComment(comment: $comment) {
      comment {
        ...CommentInfo
      }
    }
  }

  ${CommentInfoFragmentDoc}
`;
export class CreateCommentComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateCommentMutation, CreateCommentVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateCommentMutation, CreateCommentVariables>
        mutation={CreateCommentDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateCommentProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateCommentMutation, CreateCommentVariables>
> &
  TChildProps;
export type CreateCommentMutationFn = ReactApollo.MutationFn<
  CreateCommentMutation,
  CreateCommentVariables
>;
export function CreateCommentHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateCommentMutation,
        CreateCommentVariables,
        CreateCommentProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateCommentMutation,
    CreateCommentVariables,
    CreateCommentProps<TChildProps>
  >(CreateCommentDocument, operationOptions);
}
export const FindOrCreatePostDocument = gql`
  mutation FindOrCreatePost($post: CreatePostInput!) {
    findOrCreatePost(post: $post) {
      post {
        ...PostInfo
      }
    }
  }

  ${PostInfoFragmentDoc}
`;
export class FindOrCreatePostComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      FindOrCreatePostMutation,
      FindOrCreatePostVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<FindOrCreatePostMutation, FindOrCreatePostVariables>
        mutation={FindOrCreatePostDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindOrCreatePostProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<FindOrCreatePostMutation, FindOrCreatePostVariables>
> &
  TChildProps;
export type FindOrCreatePostMutationFn = ReactApollo.MutationFn<
  FindOrCreatePostMutation,
  FindOrCreatePostVariables
>;
export function FindOrCreatePostHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindOrCreatePostMutation,
        FindOrCreatePostVariables,
        FindOrCreatePostProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindOrCreatePostMutation,
    FindOrCreatePostVariables,
    FindOrCreatePostProps<TChildProps>
  >(FindOrCreatePostDocument, operationOptions);
}
export const FindPostDocument = gql`
  query findPost($input: FindPostInput!) {
    findPost(input: $input) {
      hasMore
      posts {
        ...PostInfo
      }
    }
  }

  ${PostInfoFragmentDoc}
`;
export class FindPostComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindPostQuery, FindPostVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindPostQuery, FindPostVariables>
        query={FindPostDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindPostProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindPostQuery, FindPostVariables>
> &
  TChildProps;
export function FindPostHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindPostQuery,
        FindPostVariables,
        FindPostProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindPostQuery,
    FindPostVariables,
    FindPostProps<TChildProps>
  >(FindPostDocument, operationOptions);
}
export const GetPostByIdDocument = gql`
  query GetPostById($id: String!) {
    getPostById(id: $id) {
      ...PostInfo
    }
  }

  ${PostInfoFragmentDoc}
`;
export class GetPostByIdComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetPostByIdQuery, GetPostByIdVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetPostByIdQuery, GetPostByIdVariables>
        query={GetPostByIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetPostByIdProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetPostByIdQuery, GetPostByIdVariables>
> &
  TChildProps;
export function GetPostByIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetPostByIdQuery,
        GetPostByIdVariables,
        GetPostByIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetPostByIdQuery,
    GetPostByIdVariables,
    GetPostByIdProps<TChildProps>
  >(GetPostByIdDocument, operationOptions);
}
export const MarkAllNotificationsAsReadDocument = gql`
  mutation MarkAllNotificationsAsRead {
    markAllNotificationsAsRead {
      ok
    }
  }
`;
export class MarkAllNotificationsAsReadComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      MarkAllNotificationsAsReadMutation,
      MarkAllNotificationsAsReadVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        MarkAllNotificationsAsReadMutation,
        MarkAllNotificationsAsReadVariables
      >
        mutation={MarkAllNotificationsAsReadDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MarkAllNotificationsAsReadProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    MarkAllNotificationsAsReadMutation,
    MarkAllNotificationsAsReadVariables
  >
> &
  TChildProps;
export type MarkAllNotificationsAsReadMutationFn = ReactApollo.MutationFn<
  MarkAllNotificationsAsReadMutation,
  MarkAllNotificationsAsReadVariables
>;
export function MarkAllNotificationsAsReadHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MarkAllNotificationsAsReadMutation,
        MarkAllNotificationsAsReadVariables,
        MarkAllNotificationsAsReadProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MarkAllNotificationsAsReadMutation,
    MarkAllNotificationsAsReadVariables,
    MarkAllNotificationsAsReadProps<TChildProps>
  >(MarkAllNotificationsAsReadDocument, operationOptions);
}
export const UpdateNotificationReadDocument = gql`
  mutation UpdateNotificationRead(
    $read: Boolean!
    $questionId: String!
    $commentId: String!
  ) {
    updateNotificationRead(
      read: $read
      questionId: $questionId
      commentId: $commentId
    ) {
      ok
    }
  }
`;
export class UpdateNotificationReadComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UpdateNotificationReadMutation,
      UpdateNotificationReadVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UpdateNotificationReadMutation,
        UpdateNotificationReadVariables
      >
        mutation={UpdateNotificationReadDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateNotificationReadProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    UpdateNotificationReadMutation,
    UpdateNotificationReadVariables
  >
> &
  TChildProps;
export type UpdateNotificationReadMutationFn = ReactApollo.MutationFn<
  UpdateNotificationReadMutation,
  UpdateNotificationReadVariables
>;
export function UpdateNotificationReadHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateNotificationReadMutation,
        UpdateNotificationReadVariables,
        UpdateNotificationReadProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateNotificationReadMutation,
    UpdateNotificationReadVariables,
    UpdateNotificationReadProps<TChildProps>
  >(UpdateNotificationReadDocument, operationOptions);
}
export const NotificationsDocument = gql`
  query Notifications($cursor: String) {
    notifications(cursor: $cursor) {
      hasMore
      notifications {
        type
        createdAt
        read
        comment {
          id
          creator {
            username
            pictureUrl
          }
        }
        question {
          id
          title
          path
          post {
            id
            repo
            creator {
              username
            }
          }
        }
      }
    }
  }
`;
export class NotificationsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<NotificationsQuery, NotificationsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<NotificationsQuery, NotificationsVariables>
        query={NotificationsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type NotificationsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<NotificationsQuery, NotificationsVariables>
> &
  TChildProps;
export function NotificationsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        NotificationsQuery,
        NotificationsVariables,
        NotificationsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    NotificationsQuery,
    NotificationsVariables,
    NotificationsProps<TChildProps>
  >(NotificationsDocument, operationOptions);
}
export const CreateQuestionDocument = gql`
  mutation CreateQuestion($question: CreateQuestionInput!) {
    createQuestion(question: $question) {
      question {
        ...QuestionInfo
      }
    }
  }

  ${QuestionInfoFragmentDoc}
`;
export class CreateQuestionComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateQuestionMutation, CreateQuestionVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateQuestionMutation, CreateQuestionVariables>
        mutation={CreateQuestionDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateQuestionProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateQuestionMutation, CreateQuestionVariables>
> &
  TChildProps;
export type CreateQuestionMutationFn = ReactApollo.MutationFn<
  CreateQuestionMutation,
  CreateQuestionVariables
>;
export function CreateQuestionHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateQuestionMutation,
        CreateQuestionVariables,
        CreateQuestionProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateQuestionMutation,
    CreateQuestionVariables,
    CreateQuestionProps<TChildProps>
  >(CreateQuestionDocument, operationOptions);
}
export const FindQuestionsDocument = gql`
  query FindQuestions($postId: String!, $path: String) {
    findQuestions(postId: $postId, path: $path) {
      ...QuestionInfo
    }
  }

  ${QuestionInfoFragmentDoc}
`;
export class FindQuestionsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<FindQuestionsQuery, FindQuestionsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<FindQuestionsQuery, FindQuestionsVariables>
        query={FindQuestionsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type FindQuestionsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<FindQuestionsQuery, FindQuestionsVariables>
> &
  TChildProps;
export function FindQuestionsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        FindQuestionsQuery,
        FindQuestionsVariables,
        FindQuestionsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    FindQuestionsQuery,
    FindQuestionsVariables,
    FindQuestionsProps<TChildProps>
  >(FindQuestionsDocument, operationOptions);
}
export const HomeQuestionsDocument = gql`
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
export class HomeQuestionsComponent extends React.Component<
  Partial<ReactApollo.QueryProps<HomeQuestionsQuery, HomeQuestionsVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<HomeQuestionsQuery, HomeQuestionsVariables>
        query={HomeQuestionsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type HomeQuestionsProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<HomeQuestionsQuery, HomeQuestionsVariables>
> &
  TChildProps;
export function HomeQuestionsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        HomeQuestionsQuery,
        HomeQuestionsVariables,
        HomeQuestionsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    HomeQuestionsQuery,
    HomeQuestionsVariables,
    HomeQuestionsProps<TChildProps>
  >(HomeQuestionsDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
