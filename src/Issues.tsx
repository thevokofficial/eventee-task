import React, { useEffect, useState } from "react"
import axios from "axios"
import Issue from "./Issue"

function Issues() {
  const [variableName, setVariableName] = useState("")
  const [issues, setIssues] = useState([] as any)
  const [selected, setSelected] = useState("all")

  useEffect(() => {
    const fetchIssue = async () => {
      let issuesResponse = await axios.get(
        `https://api.github.com/repos/angular/angular/issues`
      )
      setIssues(issuesResponse.data)
    }
    document.title = "task for eventee"
    fetchIssue()
  })

  return (
    <div>
      <div className="navbarButtons">
        <button onClick={() => setSelected("all")}>show all issues</button>
        <button onClick={() => setSelected("open")}>show opened issues</button>
        <button onClick={() => setSelected("closed")}>
          show closed issues
        </button>
      </div>

      <div className="issues">
        {issues
          .filter((issue: any) => selected == "all" || issue.state == selected)
          .map((issue: any, index: any) => {
            return (
              <a href={"/" + issue.number}>
                <div className="issue" key={index}>
                  <h2 className="name">{issue.title}</h2>
                  <p className="state">
                    <img src="images/stateicon.png" alt="stateIcon" />{" "}
                    {issue.state}
                  </p>
                  <p className="comments">
                    <img src="images/commenticon.png" alt="commentIcon" />{" "}
                    {issue.comments}
                  </p>
                  <p className="number">#{issue.number}</p>

                  {issue.state == "open" && (
                    <p className="created">created at: {issue.created_at}</p>
                  )}
                  {issue.state == "closed" && (
                    <p className="closed">closed at: {issue.closed_at}</p>
                  )}
                </div>
              </a>
            )
          })}
      </div>
    </div>
  )
}

export default Issues
