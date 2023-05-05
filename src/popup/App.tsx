import './App.css'
import logo from '../../images/icon-128.png'

function App() {
  return (
    <>
      <div className="card">
        <a
          href="https://github.com/pcbowers/github-reactions"
          className="unstyled"
          target="_blank"
        >
          <img
            src={chrome.runtime.getURL(logo)}
            className="logo react"
            alt="GitHub Reactions logo"
          />
        </a>
        <div className="info">
          <a
            href="https://github.com/pcbowers/github-reactions"
            className="unstyled"
            target="_blank"
          >
            <h1>Github Reactions</h1>
          </a>
          <p>
            By{' '}
            <a href="https://github.com/pcbowers" target="_blank">
              Chris Bowers
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default App
