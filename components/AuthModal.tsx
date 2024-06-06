"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: (val: boolean) => void;
}

const AuthModal: React.FC<ModalProps> = ({ children, open, setOpen }) => {
  const router = useRouter();
  const handleClose = () => {
    router.push("/");
    return setOpen;
  };
  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogContent className="bg-transparent p-0">{children}</DialogContent>
    </Dialog>
  );
};

export default AuthModal;
