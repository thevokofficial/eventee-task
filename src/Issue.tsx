import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function Issue() {
  let params = useParams()
  let [issue, setIssue] = useState({} as any)
  let [comments, setComments] = useState([] as any)
  useEffect(() => {
    const fetchIssue = async () => {
      let issueResponse = await axios.get(
        `https://api.github.com/repos/angular/angular/issues/${params.issueId}`
      )
      setIssue(issueResponse.data)

      let commentResponse = await axios.get(
        `https://api.github.com/repos/angular/angular/issues/${params.issueId}/comments`
      )
      setComments(commentResponse.data)
    }
    fetchIssue()
  })

  return (
    <div className="request">
      <a href="/">
        <p className="home">home</p>
      </a>
      <h1>
        {issue.title} #{issue.number}
      </h1>
      <p className="state">
        {issue.state} · created at: {issue.created_at} · {issue.comments}{" "}
        comments
      </p>
      <div className="comments">
        {comments.map((comment: any, index: any) => {
          return (
            <div className="comment" key={index}>
              <h2 className="user">
                <img src={comment.user.avatar_url} alt="avatar" /> ·{" "}
                {comment.user.login} commented {comment.created_at}
              </h2>
              <p>{comment.body}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Issue
