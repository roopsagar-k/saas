import LandingNav from "@/components/LandingNav";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";

interface HomeProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (val: boolean) => void;
}
export default function Home({ children, open, setOpen }: HomeProps) {
  return (
    <main className="h-[50rem] w-full dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <LandingNav />
      <AuthModal
        open={open as boolean}
        setOpen={setOpen as (newVal: boolean) => void}
      >
        {children}
      </AuthModal>
      <div className="flex flex-col justify-center items-center">
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-slate-200 to-blue-500 py-8">
          Are you ready!
        </p>
        <div className="flex gap-4">
          <Button variant="secondary">Check</Button>
          <Button>Get started</Button>
        </div>
      </div>
    </main>
  );
}
