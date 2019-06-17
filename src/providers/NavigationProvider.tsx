import * as React from 'react'
import { BackHandler } from 'react-native'

interface Navigator {
  navigate: (sheetKey: string) => void
}

interface Route {
  key: string
  screen: React.ComponentType
}

const RouterContext = React.createContext<string>('')
const NavigatorContext = React.createContext<Navigator>({ navigate: () => undefined })

interface RouterProps {
  children: (Screen: React.ReactNode) => React.ReactNode
  index: string
  routes: Route[]
}

const NavigationProvider = ({ index, routes, children }: RouterProps) => {
  const history = React.useRef<string[]>([])
  const [activeRoute, setActiveRoute] = React.useState(index)

  const route = routes.find(({ key }) => key === activeRoute)

  const navigate = (target: string) => {
    history.current.push(activeRoute)
    setActiveRoute(target)
  }

  if (!route) {
    throw Error(`Route ${activeRoute} not found!`)
  }

  BackHandler.addEventListener('hardwareBackPress', () => {
    const previous = history.current.pop()
    if (previous) {
      setActiveRoute(previous)
      return true
    }
    return false
  })

  const Screen = route.screen

  return (
    <RouterContext.Provider value={activeRoute}>
      <NavigatorContext.Provider
        value={{
          navigate
        }}
      >
        {children(<Screen />)}
      </NavigatorContext.Provider>
    </RouterContext.Provider>
  )
}

const useNavigation = () => React.useContext(NavigatorContext)
const useActiveRoute = () => React.useContext(RouterContext)

export { NavigationProvider, useNavigation, useActiveRoute }
