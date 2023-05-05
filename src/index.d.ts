declare global {
  namespace JSX {
    interface IntrinsicElements {
      'g-emoji': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { alias: string },
        HTMLElement
      >
    }
  }
}

export {}
