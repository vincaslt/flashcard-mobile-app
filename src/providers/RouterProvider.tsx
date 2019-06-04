import * as React from "react";

interface Navigator {
  navigate: (sheetKey: string) => void
}

const RouterContext = React.createContext<string>('');
const NavigatorContext = React.createContext<Navigator>({ navigate: () => {} })

interface RouterProps {
  index: string
  routes: Array<{
    key: string,
    parent?: string
    screen: React.ReactType
  }>
}

const Router = ({ routes, index }: RouterProps) => {
  const [activeRoute, setActiveRoute] = React.useState(index)

  const route = routes.find(route => route.key === activeRoute)
  
  if (!route) {
    throw Error(`Route ${activeRoute} not found!`)
  }

  const Screen = route.screen

  return (
    <RouterContext.Provider value={activeRoute}>
      <NavigatorContext.Provider value={{
        navigate: setActiveRoute
      }}>
        <Screen />
      </NavigatorContext.Provider>
    </RouterContext.Provider>
  )
}

const useNavigation = () => React.useContext(NavigatorContext)
const useActiveRoute = () => React.useContext(RouterContext)

export {
  Router,
  useNavigation,
  useActiveRoute 
}