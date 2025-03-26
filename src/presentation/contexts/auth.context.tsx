"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { IUsers, IUsersContract } from "@/domain/models/users";
import { createClient } from "@/infra/gateway/supabase";
import { ModalCreateUser } from "../components";
import { NotFoundError } from "@/domain/errors";

export interface IContext {
  loading: boolean;
  error: Error | null;
  isNewUser: boolean;
  user: IUsers | undefined;
}

const defaultValues = {
  loading: true,
  error: null,
  isNewUser: false,
  user: undefined,
};

export const AuthContext = createContext<IContext>(defaultValues);

interface AuthProviderProps {
  children: ReactNode;
  service: IUsersContract;
}

export function AuthProvider({ children, service }: AuthProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [user, setUser] = useState<IUsers | undefined>(undefined);

  const supabase = createClient();

  const handleCheckUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();

      if (supabaseUser) {
        const userData = await service.getUser({
          providerId: supabaseUser.id,
        });
        setUser(userData);
        setIsNewUser(false);
      }
    } catch (err) {
      if (err instanceof NotFoundError) {
        setIsNewUser(true);
        setUser(undefined);
      }
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCheckUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        isNewUser,
        user,
      }}
    >
      <ModalCreateUser
        service={service}
        open={isNewUser}
        setIsNewUser={setIsNewUser}
      />
      {children}
    </AuthContext.Provider>
  );
}
