import {useState, useEffect } from 'react'

/**
 * This will ensure we only end the api call to search for a song
 * after the user has stopped typing for .5 seconds saving us requests
 * and not sending one upon every char input.
 * @param value 
 * @param delay 
 * @returns 
 */
function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
  
    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
  
      return () => {
        clearTimeout(timer)
      }
    }, [value, delay])
  
    return debouncedValue
  }
export default useDebounce;