import * as React from "react";
import Modal from "react-modal";
import { Input, MyButton, Icon } from "@codeponder/ui";
import { Heading } from "rebass";
import { RepoAutoComplete } from "./RepoAutoComplete";
import { FindOrCreateCodeReviewPostComponent } from "./apollo-components";
import { get } from "lodash";
import { useInputValue } from "../utils/useInputValue";
import { removeDuplicates } from "../utils/removeDuplicates";
import { GetViewerReposEdges } from "./github-apollo-components";
import { Router } from "../server/routes";
import { findCodeReviewPostQuery } from "../graphql/code-review-post/queries/findCodeReviewPost";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    height: 500,
    backgroundColor: "#f9fbfd",
  },
};

export const CreateCodeReviewModal = () => {
  const [open, changeOpen] = React.useState(false);
  const [item, changeItem] = React.useState<GetViewerReposEdges | null>(null);
  const [title, changeTitle] = useInputValue("");

  return (
    <FindOrCreateCodeReviewPostComponent
      refetchQueries={[
        {
          query: findCodeReviewPostQuery,
          variables: {
            input: {
              limit: 6,
              offset: 0,
              topics: [],
            },
          },
        },
      ]}
    >
      {mutate => (
        <>
          <Modal
            isOpen={open}
            onRequestClose={() => changeOpen(false)}
            style={customStyles}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "2rem",
                alignItems: "center",
              }}
            >
              <Heading color="#07385A" fontSize={6}>
                Create Code Review
              </Heading>
              <Icon
                size={24}
                name="x"
                fill="#0d0d0d"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => changeOpen(false)}
              />
            </div>
            <Input
              style={{ marginBottom: "2rem" }}
              placeholder="Descriptive title"
              value={title}
              onChange={changeTitle}
            />
            <RepoAutoComplete onChange={x => changeItem(x)} />
            <div style={{ display: "flex" }}>
              <MyButton
                style={{
                  marginLeft: "auto",
                  marginTop: "2rem",
                  marginRight: 0,
                }}
                variant="primary"
                onClick={async () => {
                  if (!item) {
                    return null;
                  }

                  const programmingLanguages = get(
                    item,
                    "node.languages.edges",
                    []
                  ).map((x: any) => x.node!.name);
                  const topics = get(
                    item,
                    "node.repositoryTopics.edges",
                    []
                  ).map((x: any) => x.node!.topic.name);
                  const response = await mutate({
                    variables: {
                      codeReviewPost: {
                        title,
                        topics: removeDuplicates([
                          ...programmingLanguages,
                          ...topics,
                        ]),
                        commitId: item.node!.defaultBranchRef!.target.oid,
                        description: item.node!.description || "",
                        repo: item.node!.name,
                        repoOwner: item.node!.owner.login,
                      },
                    },
                  });

                  console.log(response);
                  if (response && response.data) {
                    changeOpen(false);
                    Router.pushRoute("post", {
                      id:
                        response.data.findOrCreateCodeReviewPost.codeReviewPost
                          .id,
                    });
                  }
                }}
              >
                Save
              </MyButton>
            </div>
          </Modal>
          <MyButton variant="primary" onClick={() => changeOpen(true)}>
            NEW CODE REVIEW
          </MyButton>
        </>
      )}
    </FindOrCreateCodeReviewPostComponent>
  );
};
