import React, { useEffect, useState } from "react"
import Issues from "./Issues"
import Issue from "./Issue"
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Issues />}></Route>
        <Route path="/:issueId" element={<Issue />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
