import { MyButton } from "@codeponder/ui";
import { Field, Formik } from "formik";
import { get } from "lodash";
import { useContext, useState } from "react";
import * as yup from "yup";
import { FindOrCreatePostComponent } from "../../generated/apollo-components";
import {
  GetRepoQuery,
  GetRepoVariables,
  GetViewerReposNode,
} from "../../generated/github-apollo-components";
import { getRepoQuery } from "../../github-graphql/query/getRepo.github";
import { Router } from "../../server/routes";
import { removeDuplicates } from "../../utils/removeDuplicates";
import { RepoAutoComplete } from "../shared/CreatePostModal/RepoAutoComplete";
import { InputField } from "../shared/formik-fields/InputField";
import { GitHubApolloClientContext } from "../shared/GithubApolloClientContext";
import { Layout } from "../shared/Layout";

const githubUrlRegex = /(?:https:\/\/)?(?:www\.)?github\.com\/([A-Za-z\d-]+)\/([A-Za-z\d-]+)/;

const validationSchema = yup.object().shape({
  githubUrl: yup
    .string()
    .matches(githubUrlRegex, "enter a valid repo")
    .required("required"),
  title: yup.string().required("required"),
});

const makeGitHubUrl = (node: GetViewerReposNode) =>
  `https://github.com/${node.owner.login}/${node.name}`;

export const CreatePost = () => {
  const [
    lastRepoSelected,
    setLastRepoSelected,
  ] = useState<GetViewerReposNode | null>(null);

  const githubClient = useContext(GitHubApolloClientContext);

  return (
    <Layout title="submit to Code Ponder">
      <FindOrCreatePostComponent>
        {mutate => (
          <Formik
            initialValues={{ githubUrl: "", title: "" }}
            onSubmit={async ({ githubUrl, title }, { setErrors }) => {
              let item: GetViewerReposNode;
              if (
                lastRepoSelected &&
                makeGitHubUrl(lastRepoSelected) === githubUrl
              ) {
                item = lastRepoSelected;
              } else {
                const [, owner, name] = githubUrl.match(githubUrlRegex)!;
                try {
                  const response = await githubClient.query<
                    GetRepoQuery,
                    GetRepoVariables
                  >({
                    query: getRepoQuery,
                    variables: { name, owner },
                  });

                  if (!response.data.repository) {
                    return setErrors({ githubUrl: "unable to find repo" });
                  }
                  item = response.data.repository;
                } catch {
                  return setErrors({ githubUrl: "unable to find repo" });
                }
              }

              const programmingLanguages = get(item, "languages.edges", []).map(
                (x: any) => x.node!.name
              );
              const topics = get(item, "repositoryTopics.edges", []).map(
                (x: any) => x.node!.topic.name
              );
              const response = await mutate({
                variables: {
                  post: {
                    title,
                    topics: removeDuplicates([
                      ...programmingLanguages,
                      ...topics,
                    ]),
                    commitId: item.defaultBranchRef!.target.oid,
                    description: item.description || "",
                    repo: item.name,
                    repoOwner: item.owner.login,
                  },
                },
              });

              if (response && response.data) {
                Router.pushRoute("post", {
                  id: response.data.findOrCreatePost.post.id,
                });
              }
            }}
            validationSchema={validationSchema}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ handleSubmit, setFieldValue }) => {
              return (
                <div style={{ display: "flex", width: "100%" }}>
                  <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                    <div>
                      <h1 style={{ marginBottom: "1rem" }}>GitHub repo url</h1>
                      <div style={{ display: "flex" }}>
                        <Field
                          style={{ flex: 1 }}
                          big
                          name="githubUrl"
                          component={InputField}
                        />
                        <div style={{ marginLeft: "1rem", width: 225 }}>
                          <RepoAutoComplete
                            onChange={x => {
                              if (x && x.node) {
                                setFieldValue(
                                  "githubUrl",
                                  makeGitHubUrl(x.node)
                                );
                                setLastRepoSelected(x.node);
                              }
                            }}
                          />
                        </div>
                      </div>
                      <h1 style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                        title
                      </h1>
                      <Field big name="title" component={InputField} />
                    </div>
                    <MyButton
                      variant="primary"
                      style={{ marginTop: "2rem", marginLeft: 0 }}
                      type="submit"
                    >
                      submit
                    </MyButton>
                  </form>
                </div>
              );
            }}
          </Formik>
        )}
      </FindOrCreatePostComponent>
    </Layout>
  );
};
