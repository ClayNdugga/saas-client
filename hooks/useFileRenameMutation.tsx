import { useDashboard } from "@/contexts/DashboardContext";
import { ApiResponse } from "@/models/api";
import { Message } from "@/models/firebase";
import apiClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";

const mutateFile = (fileId: string, newName: string) =>
  apiClient.patch<ApiResponse<{}>>(`/files/${fileId}`, { newName: newName });

export const useRenameFileMuation = () => {
  const { files, setFiles, refetchFiles } = useDashboard();

  return useMutation({
    mutationFn: (variables: { fileId: string; newName: string }) => mutateFile(variables.fileId, variables.newName),

    onMutate: (variables) => {
      const { fileId, newName } = variables;
      // console.log( `mutation variables: ${fileId}`)
      // console.log( `mutation variables: ${newName}`)
      const renamedFiles = files?.map((fileDescriptor) =>
        fileDescriptor.id === fileId
          ? { ...fileDescriptor, name: newName } 
          : fileDescriptor
      );
      setFiles(renamedFiles || [])
    },
    onSuccess: (data) => {
      console.log("File renamed successfully");
    },
    onError: (error) => {
      console.log(error)
      refetchFiles();
    },
  });
};
