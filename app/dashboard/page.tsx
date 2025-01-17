"use client";

import Dashboard from "@/components/pieces/dashboard";
import { DashboardProvider } from "@/contexts/DashboardContext";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardProvider>
        <Dashboard />
      </DashboardProvider>
    </QueryClientProvider>
  );
};

export default page;
