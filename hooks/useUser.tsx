import { ApiResponse } from "@/models/api";
import { FirebaseDBUser } from "@/models/firebase";
import apiClient from "@/services/api-client";

import { useQuery } from "@tanstack/react-query";

const useUser = () =>
  useQuery<ApiResponse<{ userData: FirebaseDBUser}>>({
    queryKey: ["User"],
    queryFn: async () => {
      return apiClient.get("/users");
    },
  });

export default useUser;
