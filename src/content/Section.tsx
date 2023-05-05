import Reaction from './Reaction'
import './Section.css'
import { getParentID, getReactionData } from '../utils'

function Section(props: { element: Element }) {
  const reactions = getReactionData(props.element, 'button[class*="reaction"]')
  const url =
    window.location.origin +
    window.location.pathname +
    window.location.search +
    '#' +
    getParentID(props.element)

  if (reactions.length) {
    return (
      <a href={url} className="crx-content-reaction">
        <button className="social-reaction-summary-item js-reaction-group-button js-optimistic-reaction-render-button btn-link d-flex no-underline color-fg-muted flex-items-baseline">
          {reactions.map((reaction) => (
            <Reaction key={reaction.name} reaction={reaction} />
          ))}
        </button>
      </a>
    )
  }

  return <></>
}

export default Section
