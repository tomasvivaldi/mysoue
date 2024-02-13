"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "./apolloClient";

const client = createApolloClient();

type ApolloWrapperProps = {
  children?: React.ReactNode;
};

export const ApolloWrapper: React.FC<ApolloWrapperProps> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
