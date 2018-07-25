const axios = require("axios").default;
const { settings } = require("./settings");
//Tokens

//Tokens
const {
  GITLAB_TOKEN,
  GITHUB_TOKEN,
  GITLAB_PROJECT_ID,
  GITHUB_REPO_NAME,
  GITHUB_USERNAME
} = settings;

console.log(settings);

const GITHUB_HOSTNAME = "https://api.github.com";
const GITLAB_HOSTNAME = "https://gitlab.com/api/v4";
const ISSUE_ROUTE = `${GITLAB_HOSTNAME}/projects/${GITLAB_PROJECT_ID}/issues`;

/**
 * @returns {Array} Returns a list of issues from gitlab
 */
async function get_issues_from_gitlab() {
  let issuesReq = axios.get(ISSUE_ROUTE, {
    params: {
      private_token: GITLAB_TOKEN,
      per_page: 50
    }
  });

  let issueData = (await issuesReq).data;
  return await issueData;
}

/**
 *
 * @param {Array} issues_from_gitlab Contains the issues from Gitlab repo
 */
async function add_issues_to_github(issues_from_gitlab) {
  try {
    let issues_request = [];
    for (issue of issues_from_gitlab) {
      const issue_title = issue.title;
      const issue_description = issue.description;
      const issue_labels = issue.labels;
      const gitlab_issue_assignees = issue.assignees;
      let issue_assignees = [];
      for (assignee of gitlab_issue_assignees) {
        if (assignee.username === "aviral254") {
          issue_assignees.push("avisrivastava254084");
        } else {
          issue_assignees.push(assignee.username);
        }
      }
      console.log(issue_assignees);
      const POST_URL = `${GITHUB_HOSTNAME}/repos/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/issues?access_token=${GITHUB_TOKEN}`;
      await axios.post(POST_URL, {
        title: issue_title,
        body: issue_description,
        labels: issue_labels
      });
    }
    console.log("Done!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

(async () => {
  try {
    const issues_from_gitlab = await get_issues_from_gitlab();
    await add_issues_to_github(issues_from_gitlab);
  } catch (err) {
    console.log(err);
  }
})();
