import { cn } from "@/lib/utils";
import './footer.css'
import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Logo } from "./logo";

export function SiteFooter({ className }) {

  return (
    <footer className={cn(className)}>
      <div className="outer">
        <div className="dot"></div>
        <div className="card">

          <div className="flex flex-col md:flex-row py-[180px] px-[70px] gap-5 md:gap-3  justify-between">
            <div className="flex flex-col md:w-[40%] gap-[20px]">
              <div className="flex items-center gap-4">
                <Logo />
                <p className="font-[800] text-[24px]">Learnoutofbox</p>
              </div>
              <p>Working to bring significant changes in online-based learning by doing extensive research for course curriculum preparation, student engagements, and looking forward to the flexible education!</p>
              <div className="flex gap-3">
                <div className="bg-[#1d1c2e] py-[6px] px-[9px] rounded-[2px]">
                  <Link
                    target="_blank"
                    href={`https://www.linkedin.com/in/noushadzaman`}>
                    <Linkedin />
                  </Link>
                </div>
                <div className="bg-[#1d1c2e] py-[6px] px-[9px] rounded-[2px]">
                  <Link
                    target="_blank"
                    href={`https://x.com/Noushad_xaman`}>
                    <Twitter />
                  </Link>
                </div>
                <div className="bg-[#1d1c2e] py-[6px] px-[9px] rounded-[2px]">
                  <Link
                    target="_blank"
                    href={`https://github.com/noushadzaman`}>
                    <Github />
                  </Link>
                </div>
                <div className="bg-[#1d1c2e] py-[6px] px-[9px] rounded-[2px]">
                  <Link
                    target="_blank"
                    href={`https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=PNRMKbkfcSLwBNqHzGltXPXxbNZRcMjbmDxBnzbDnCLcGRLHNBNzCLkqwmzslcRTcmKklnxGqgdTRCL`}>
                    <Mail />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:w-[20%] gap-[15px]">
              <h3 className="font-[800] text-[24px]">Inspired by</h3>
              <p>Udemy</p>
              <p>Roadmap.sh</p>
              <p>Reddit</p>
            </div>
            <div className="flex flex-col md:w-[20%] gap-[15px]">
              <h3 className="font-[800] text-[24px]">Address</h3>
              <p>Azimpur Dhaka, Bangladesh.</p>
              <p>1205</p>
              <p>noushadozi333@gmail.com</p>
              <p>01534672418</p>
            </div>
          </div>

          <div className="line topl"></div>
          <div className="line leftl"></div>
          <div className="line bottoml">
            <div className="flex flex-col md:flex-row pt-3 justify-between items-center md:pr-[150px] md:pl-[150px] gap-1 text-center">
              <p>© 2024 Learnoutofbox is Proudly developed by {' '}
                <Link
                  href="https://github.com/noushadzaman"
                  target="_blank"
                  className="text-[#ff4852] underline"
                >Noushad Zaman.</Link>
              </p>
              <p>Privacy Policy | Terms & Conditions</p>
            </div>
          </div>
          <div className="line rightl"></div>
        </div>
      </div>
    </footer>
  );
}
