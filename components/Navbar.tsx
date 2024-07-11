import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Logo } from "@/components/Logo";

const Navbar = () => {
  return (
    <div className="my-2 mx-8 flex justify-center items-center py-2">
      <div className="max-w-7xl w-full">
        <div className="flex justify-between items-center">
          <Logo />
          <>
            <SignedOut>
              <SignInButton>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
