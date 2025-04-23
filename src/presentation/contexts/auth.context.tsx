"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { IUsers, IUsersContract } from "@/domain/models/users";
import { createClient } from "@/infra/gateway/supabase";
import { ModalCreateUser } from "../components";
import { NotFoundError } from "@/domain/errors";
import { useToast } from "../hooks";

export interface IContext {
  loading: boolean;
  error: Error | null;
  isNewUser: boolean;
  user: IUsers | undefined;
  setUser: (u?: IUsers) => void;
  handleCheckUser: () => Promise<void>;
}

const defaultValues = {
  loading: true,
  error: null,
  isNewUser: false,
  user: undefined,
  setUser: () => {},
  handleCheckUser: async () => {},
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
  const { toast } = useToast();

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
        return;
      }
      setError(err instanceof Error ? err : new Error("Unknown error"));
      toast({
        variant: "error",
        title: "Erro ao carregar os dados!",
        description: "Por favor, tente novamente mais tarde.",
      });
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
        setUser,
        handleCheckUser,
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
