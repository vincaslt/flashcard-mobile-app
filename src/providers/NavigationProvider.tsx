import * as React from 'react'

interface Navigator {
  navigate: (sheetKey: string) => void
}

const RouterContext = React.createContext<string>('')
const NavigatorContext = React.createContext<Navigator>({ navigate: () => undefined })

interface RouterProps {
  children: React.ReactNode
  index: string
  routes: string[]
}

const NavigationProvider = ({ routes, index, children }: RouterProps) => {
  const [activeRoute, setActiveRoute] = React.useState(index)

  const route = routes.find(key => key === activeRoute)

  if (!route) {
    throw Error(`Route ${activeRoute} not found!`)
  }

  return (
    <RouterContext.Provider value={activeRoute}>
      <NavigatorContext.Provider
        value={{
          navigate: setActiveRoute
        }}
      >
        {children}
      </NavigatorContext.Provider>
    </RouterContext.Provider>
  )
}

const useNavigation = () => React.useContext(NavigatorContext)
const useActiveRoute = () => React.useContext(RouterContext)

export { NavigationProvider, useNavigation, useActiveRoute }
