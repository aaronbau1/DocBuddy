import { useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Expand, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import SimpleBar from "simplebar-react";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Page, Document } from "react-pdf";

interface PdfFullScreenProps {
  fileUrl: string
}

const PdfFullScreen = ({fileUrl}: PdfFullScreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();
  
  const {toast} = useToast();
  const {width, ref} = useResizeDetector();

  return (
    <Dialog open={isOpen} onOpenChange={(v) => {
      if (!v) setIsOpen(v);
    }}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant='ghost' className="gap-1.5" >
          <Expand ara-label='fullscreen' className="h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <div ref={ref}>
            <Document loading={
              <div className='flex justify-center'>
                <Loader2 className='my-24 h-6 w-6 animate-spin' />
              </div>
            }
            onLoadError={() => {
              toast({
                title: 'Error loading PDF',
                description: 'Please try again later',
                variant: 'destructive',
              })
            }}
            onLoadSuccess={({ numPages }) =>
                setNumPages(numPages)
              }
            file={fileUrl}
            className='max-h-full'
            >
            {... Array(numPages).fill(0).map((_, i) => {
              return (
                <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
              )
            }
            )}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  )
}

export default PdfFullScreen