import { HOME_SUBSCRIPTIONS } from "@/constants/data";
import { createContext, useContext, useCallback, useState } from "react";

interface SubscriptionContextType {
  subscriptions: Subscription[];
  addSubscription: (subscription: Subscription) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  subscriptions: HOME_SUBSCRIPTIONS,
  addSubscription: () => {},
});

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [subscriptions, setSubscriptions] = useState(HOME_SUBSCRIPTIONS);

  const addSubscription = useCallback((subscription: Subscription) => {
    setSubscriptions((prev) => [subscription, ...prev]);
  }, []);

  return (
    <SubscriptionContext.Provider value={{ subscriptions, addSubscription }}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  return useContext(SubscriptionContext);
}
