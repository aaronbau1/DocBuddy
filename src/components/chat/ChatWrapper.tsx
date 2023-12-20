import { trpc } from "@/app/_trpc/client";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

interface ChatWrapperProps {
  fileId: string
}

const ChatWrapper =  ({fileId}: ChatWrapperProps) => {
  
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );
  
  return (
    <div className="relative min-f full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
      <div className="fkex-1 justify-between flex flex-col mb-28">
        <Messages />
      </div>

      <ChatInput />
    </div>
  )
}

export default ChatWrapper;