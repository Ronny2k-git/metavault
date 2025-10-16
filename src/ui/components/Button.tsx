import { cva } from "class-variance-authority"

interface ButtonProps {
  size: string
  variant: string
}

const buttonStyle = cva("", {
    variants: {
        variant: 
    }
})

export function Button() {
  return <button></button>
}
gr