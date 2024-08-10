import Image from "next/image";
import { Button } from "@/components/ui/button";

import { doSocialLogin } from "@/app/actions";
import { Card } from "@/components/ui/card";

const SocialLogins = () => {

  return (
    <Card className="mx-auto max-w-sm w-full mt-5 pb-4">
      <div className="text-center text-md mt-3 text-gray-500">
        or Signup with
      </div>
      <form action={doSocialLogin}>
        <div className="flex justify-center gap-2">
          <Button
            className="mt-4 py-6 px-10 rounded-md flex items-center gap-2 justify-center"
            type="submit"
            name="action"
            value="google">
            <Image src="/google.png" alt="google" width={40} height={40} />
            <span>Google</span>
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default SocialLogins;