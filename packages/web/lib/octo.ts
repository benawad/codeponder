import Octokit from "@octokit/rest";

export const octokit = new Octokit({
  headers: {
    accept: "application/vnd.github.mercy-preview+json"
  }
});
