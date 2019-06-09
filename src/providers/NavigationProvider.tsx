import * as React from 'react'

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
  const [activeRoute, setActiveRoute] = React.useState(index)

  const route = routes.find(({ key }) => key === activeRoute)

  if (!route) {
    throw Error(`Route ${activeRoute} not found!`)
  }

  const Screen = route.screen

  return (
    <RouterContext.Provider value={activeRoute}>
      <NavigatorContext.Provider
        value={{
          navigate: setActiveRoute
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
