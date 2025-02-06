import { useDashboard } from "@/contexts/DashboardContext";
import { ApiResponse } from "@/models/api";
import { Message } from "@/models/firebase";
import apiClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";


const mutateFile = (fileId: string) => apiClient.delete<ApiResponse<{ responseMessage: Message }>>(`/files/${fileId}`);

export const useDeleteFileMuation = () => {
  // Grab setChat from context
  const { setFileId, fileId, files, setFiles, refetchFiles } = useDashboard();

  return useMutation({
    mutationFn: (deletedFileId: string) => mutateFile(deletedFileId),
    onMutate: (deletedFileId: string) => {
      console.log(`Deleting file: ${deletedFileId}`);
      const updatedFiles = files?.filter((file) => file.id !== deletedFileId);
      setFiles(updatedFiles || []);

      if (fileId === deletedFileId) {
        setFileId("");
      }
    },
    onSuccess: (data) => {
      console.log("File deleted successfully");
      refetchFiles();

    },
    onError: (error) => {
      console.log(`Error deleting file: ${error}`);
      refetchFiles();
    },
  });
};