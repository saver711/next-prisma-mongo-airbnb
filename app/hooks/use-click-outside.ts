import { useEffect, RefObject } from "react"

type ClickOutsideHandler = (event: MouseEvent | TouchEvent) => void

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: ClickOutsideHandler
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return
      callback(event)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [ref, callback])
}
