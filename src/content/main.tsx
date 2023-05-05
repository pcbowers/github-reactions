import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { onElementChange, onURLChange, waitForElm } from '../utils'

const ROOT_ID = 'crx-content-root'
const SIDEBAR_ID = 'partial-discussion-sidebar'

async function addReactionNav() {
  // Only add the app to discussions, issues, and pull requests
  if (!/\/(discussions|issues|pull)\//.test(window.location.pathname)) return

  // Remove any existing root
  document
    .querySelectorAll('#' + 'crx-content-root')
    .forEach((el) => el.remove())

  // Create a new root
  const root = document.createElement('div')
  root.classList.add('discussion-sidebar-item', 'js-discussion-sidebar-item')
  root.id = ROOT_ID

  // Add the root to the page
  const sidebar = await waitForElm<HTMLElement>('#' + SIDEBAR_ID)
  if (!sidebar) return

  sidebar.style.position = 'relative'
  sidebar.style.height = '100%'
  sidebar?.appendChild(root)

  // Render the app
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

// Add the app to the page when the URL changes
// This is necessary because GitHub uses PJAX (i.e. is an SPA)
onURLChange(addReactionNav)

// Add the app to the page when the sidebar changes
// This is necessary because GitHub reloads the sidebar on every PJAX request
// Unfortunately, this means that the extension will re-render entirely rather than just updating the state
onElementChange('.Layout-sidebar', addReactionNav)

// Add the app to the page on initial load
addReactionNav()
