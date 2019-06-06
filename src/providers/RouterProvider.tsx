import * as React from 'react'

interface Navigator {
  navigate: (sheetKey: string) => void
}

const RouterContext = React.createContext<string>('')
const NavigatorContext = React.createContext<Navigator>({ navigate: () => undefined })

interface RouterProps {
  render: (screen: React.ReactNode) => React.ReactNode
  index: string
  routes: Array<{
    key: string
    screen: React.ReactType
  }>
}

const Router = ({ routes, index, render }: RouterProps) => {
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
        {render(<Screen />)}
      </NavigatorContext.Provider>
    </RouterContext.Provider>
  )
}

const useNavigation = () => React.useContext(NavigatorContext)
const useActiveRoute = () => React.useContext(RouterContext)

export { Router, useNavigation, useActiveRoute }
