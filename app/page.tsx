import LandingNav from "@/components/LandingNav";
import { Button } from "@/components/ui/button";
import AuthModal from "@/components/AuthModal";

interface HomeProps {
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: (val: boolean) => void;
}
 const Home = ({ children, open, setOpen }: HomeProps) =>  {
  return (
    <main className="h-[50rem] w-full dark:bg-grid-white/[0.1] bg-grid-black/[0.3] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <LandingNav />
      <AuthModal
        open={open as boolean}
        setOpen={setOpen as (newVal: boolean) => void}
      >
        {children}
      </AuthModal>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className="text-5xl font-bold text-center md:text-7xl lg:text-8xl">
            Questionpaper Hub
          </h1>
        </div>
        <div className="flex gap-4 mt-4">
          <Button variant="secondary">Check</Button>
          <Button>Get started</Button>
        </div>
      </div>
    </main>
  );
}

export default Home;
