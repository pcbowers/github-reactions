import Section from './Section'
import './App.css'
import { getReactionSections } from '../utils'

function App() {
  const allPosts = getReactionSections('.js-comment-reactions-options')

  return (
    <>
      <div className="discussion-sidebar-heading text-bold">
        <a href="https://github.com/pcbowers/github-reactions" target="_blank">
          Github Reactions
        </a>
      </div>
      <div id="crx-content-posts">
        {allPosts.length > 0 &&
          allPosts.map((element, index) => (
            <Section key={index} element={element} />
          ))}
        {allPosts.length === 0 && <>No Reactions Found 🤷‍♂️</>}
      </div>
    </>
  )
}

export default App
