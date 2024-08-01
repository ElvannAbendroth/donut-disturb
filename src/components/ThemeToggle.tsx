import { useEffect, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import Icon from '@/ui/icon'
import { getLocalStorageTheme } from '@/utils/utils'

interface ThemeToggleProps {
  variant?: 'mobile' | 'desktop'
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'desktop' }) => {
  const [theme, setTheme] = useState(getLocalStorageTheme())
  const [isMounted, setIsMounted] = useState(false)

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme)
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  if (!isMounted) {
    return null
  }
  if (variant === 'mobile')
    return (
      <div className="flex">
        <ToggleGroup size={'sm'} value={theme} onValueChange={handleClick} type="single" aria-label="Theme toggle">
          <ToggleGroupItem value="light" aria-label="Light Mode">
            <Icon name="Sun" size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" aria-label="Dark Mode">
            <Icon name="Moon" size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    )
  else
    return (
      <div className="flex">
        <ToggleGroup size={'sm'} value={theme} onValueChange={handleClick} type="single" aria-label="Theme toggle">
          <div className={`${theme === 'light' && 'hidden'}`}>
            <ToggleGroupItem value="light" aria-label="Light Mode">
              <Icon name="Sun" size={16} />
            </ToggleGroupItem>
          </div>

          <div className={`${theme === 'dark' && 'hidden'}`}>
            <ToggleGroupItem value="dark" aria-label="Dark Mode">
              <Icon name="Moon" size={16} />
            </ToggleGroupItem>
          </div>
        </ToggleGroup>
      </div>
    )
}

export default ThemeToggle
