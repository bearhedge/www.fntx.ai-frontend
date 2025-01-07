import { createContext, useState, useEffect } from "react";
import Fetch from "../common/api/fetch";

const MainContext = createContext({});

interface IProps {
  children: React.ReactNode;
}

const AppContext: React.FC<IProps> = ({ children }) => {
  const [settings, setSettings] = useState({
    ibkr: false,
    id: '',
    active_subscription: false,
    metamask_address: false
  });
  
  const getUserSettings = () => {
    Fetch('ibkr/onboarding/user-onboarding').then((res: any) => {
      if (res.status) {
        setSettings((prev) => ({
          ...prev,
          id: res.data?.id,
          ibkr: res.data?.authenticated ? true : false,
          active_subscription: res.data?.active_subscription,
          metamask_address: res.data?.metamask_address ? true : false
        }))
      }
    });
  };
  const updateIbkrAuth=(val:boolean)=>{
    setSettings((prev) => ({
      ...prev,
      ibkr: val,
    }))
  }
  useEffect(() => {
    getUserSettings();
  }, []);
  return (
    <MainContext.Provider value={{ settings, getUserSettings,updateIbkrAuth }}>
      {children}
    </MainContext.Provider>
  );
};

export default AppContext;

export const withContext = (Component: React.ComponentType<any>) => {
  const WrappedComponent = (props: any) => (
    <MainContext.Consumer>
      {(value) => <Component context={value} {...props} />}
    </MainContext.Consumer>
  );

  WrappedComponent.displayName = `withContext(${Component.displayName || Component.name || "Component"})`;

  return WrappedComponent;
};
