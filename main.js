document
  .getElementById("issueInputForm")
  .addEventListener("submit", submitIssue);

function submitIssue(e) {
  const getInputValue = (id) => document.getElementById(id).value;
  const description = getInputValue("issueDescription");
  const severity = getInputValue("issueSeverity");
  const assignedTo = getInputValue("issueAssignedTo");
  const id = Math.floor(Math.random() * 100000000) + "";
  const status = "Open";

  const issue = { id, description, severity, assignedTo, status };
  if (id && description && severity && assignedTo) {
    let issues = [];
    if (localStorage.getItem("issues")) {
      issues = JSON.parse(localStorage.getItem("issues"));
    }
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));

    document.getElementById("issueInputForm").reset();
    fetchIssues();
  } else {
    alert("Please enter required field to proceed");
  }
  e.preventDefault();
}
// display closed and total issue
const displayIssueResult = () => {
  const closedIssue = document.getElementById("close-issue");
  const totalIssue = document.getElementById("total-issue");
  const getTotalIssues = JSON.parse(localStorage.getItem("issues"));
  totalIssue.innerText = getTotalIssues.length;
  let closedIssueCount = getTotalIssues.filter((x) => x.status === "Closed");
  closedIssue.innerText = closedIssueCount.length;
};
const closeIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const currentIssue = issues.find((issue) => issue.id === id.toString());
  currentIssue.status = "Closed";
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
};

const deleteIssue = (id) => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const remainingIssues = issues.filter((issue) => issue.id !== id.toString());
  localStorage.setItem("issues", JSON.stringify(remainingIssues));
  fetchIssues();
};

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem("issues"));
  const issuesList = document.getElementById("issuesList");
  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info 
                                ${
                                  status === "Closed" ? "text-danger" : ""
                                }"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                                <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                </div>`;
  }
  displayIssueResult();
};
