/**
 * Wait for an element to be available in the DOM
 * @param selector The element selector
 * @param timeout The timeout in ms
 * @returns A promise that resolves to the element or null
 */
export function waitForElm<T extends Element>(
  selector: string,
  timeout = 30000
) {
  return new Promise<T | null>((resolve) => {
    // If the element is already available, return it
    if (document.querySelector(selector)) {
      return resolve(document.querySelector<T>(selector))
    }

    // Otherwise, set a timeout
    const timeoutId = setTimeout(() => resolve(null), timeout)

    // And observe the DOM for changes
    const observer = new MutationObserver(() => {
      // If the element is now available, clear the timeout and resolve
      if (document.querySelector(selector)) {
        resolve(document.querySelector<T>(selector))
        clearTimeout(timeoutId)
        observer.disconnect()
      }
    })

    // Start observing the DOM
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

/**
 * Call a callback when the URL changes
 * @param callback The callback to execute when the URL changes
 */
export function onURLChange(callback: () => unknown) {
  // Keep track of the previous URL
  let previousUrl = ''

  // Observe the DOM for changes
  const observer = new MutationObserver(() => {
    if (location.href !== previousUrl) {
      previousUrl = location.href
      callback()
    }
  })

  // Start observing the DOM
  observer.observe(document, {
    childList: true,
    subtree: true,
  })
}

/**
 * Call a callback when an element changes
 * @param selector The element selector
 * @param callback The callback to call
 */
export function onElementChange(selector: string, callback: () => unknown) {
  // Observe the DOM for changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(
      (mutation) =>
        mutation.type === 'childList' &&
        (mutation.target as Element).matches(selector) &&
        callback()
    )
  })

  // Start observing the DOM
  observer.observe(document, {
    childList: true,
    subtree: true,
  })
}

export interface ReactionData {
  emoji: string
  name: string
  count?: string
}

export const REACTIONS: ReactionData[] = [
  { emoji: '👍', name: '+1' },
  { emoji: '🚀', name: 'rocket' },
  { emoji: '🎉', name: 'tada' },
  { emoji: '😄', name: 'smile' },
  { emoji: '❤️', name: 'heart' },
  { emoji: '😕', name: 'thinking_face' },
  { emoji: '👎', name: '-1' },
  { emoji: '👀', name: 'eyes' },
]

export function elementContainsReaction(element: Element) {
  return (reaction: ReactionData) => {
    return !!element.querySelector(`g-emoji[alias="${reaction.name}"]`)
  }
}

export function getReactionSections(selector: string) {
  return Array.from(document.querySelectorAll(selector)).filter((element) =>
    REACTIONS.some(elementContainsReaction(element))
  )
}

export function getReactionData(
  element: Element,
  selector: string
): ReactionData[] {
  return Array.from(element.querySelectorAll(selector))
    .map((element) => ({
      reaction: REACTIONS.find(elementContainsReaction(element)),
      count: element.textContent?.match(/\d+/)?.join(''),
    }))
    .filter((reaction) => reaction.reaction && reaction.count)
    .map((reaction) => ({
      emoji: reaction.reaction?.emoji as string,
      name: reaction.reaction?.name as string,
      count: reaction.count as string,
    }))
}

export function getParentID(element: Element) {
  while (element !== undefined) {
    if (element.id) return element.id
    element = element.parentElement as Element
  }

  return undefined
}
