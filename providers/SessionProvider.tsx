"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type ContextType = {
  session: Session | null;
};

const defaultContext: ContextType = {
  session: null,
};

const SessionContext = createContext<ContextType>(defaultContext);

export const SessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const s = await getSession();

      setSession(s);
    })();
  }, []);

  console.log(session);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const { session } = useContext(SessionContext);

  return session;
};
