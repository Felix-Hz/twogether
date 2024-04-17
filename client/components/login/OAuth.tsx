import { Button } from "@/components/ui/button";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function OAuth() {
  /*
    TODO: Pending OAuth implementation 
    */
  return (
    <section>
      <Button className="w-full mb-2" variant="outline">
        <FaGoogle className="text-lg" />
        <p className="inline m-1.5">Continue with Google</p>
      </Button>
      <Button className="w-full mb-2" variant="outline">
        <FaApple className="text-lg" />
        <p className="inline m-1.5">Continue with Apple</p>
      </Button>
      <Button className="w-full" variant="outline">
        <FaFacebook className="text-lg" />
        <p className="inline m-1.5">Continue with Facebook</p>
      </Button>
    </section>
  );
}
