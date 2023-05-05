import { ReactionData } from '../utils'
import './Reaction.css'

function Reaction(props: { reaction: ReactionData }) {
  return (
    <div>
      <g-emoji alias={props.reaction.name} className="social-button-emoji">
        {props.reaction.emoji}
      </g-emoji>
      <span className="js-discussion-reaction-group-count">
        {props.reaction.count}
      </span>
    </div>
  )
}

export default Reaction
