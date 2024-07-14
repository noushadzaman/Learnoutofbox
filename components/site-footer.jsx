import { cn } from "@/lib/utils";
import './footer.css'

export function SiteFooter({ className }) {

  return (
    <footer className={cn(className)}>
      <div className="outer">
        <div className="dot"></div>
        <div className="card">

          <div className="flex flex-col md:flex-row py-[180px] px-[70px] gap-5 md:gap-3  justify-between">
            <div className="flex flex-col md:w-[40%] gap-[20px]">
              <p className="font-[800] text-[24px]">Learnoutofbox</p>
              <p>Working to bring significant changes in online-based learning by doing extensive research for course curriculum preparation, student engagements, and looking forward to the flexible education!</p>
              <div className="flex gap-3">
                <div className="bg-[#1d1c2e] py-[4px] px-[9px] rounded-[2px]">s</div>
                <div className="bg-[#1d1c2e] py-[4px] px-[9px] rounded-[2px]">s</div>
                <div className="bg-[#1d1c2e] py-[4px] px-[9px] rounded-[2px]">s</div>
                <div className="bg-[#1d1c2e] py-[4px] px-[9px] rounded-[2px]">s</div>
              </div>
            </div>
            <div className="flex flex-col md:w-[20%] gap-[15px]">
              <h3 className="font-[800] text-[24px]">Explore</h3>
              <p>Home</p>
              <p>About</p>
              <p>Courses</p>
              <p>Events</p>
              <p>Contact</p>
            </div>
            <div className="flex flex-col md:w-[20%] gap-[15px]">
              <h3 className="font-[800] text-[24px]">Resources</h3>
              <p>Student Success</p>
              <p>Scholarships</p>
              <p>For Business</p>
              <p>Go Premium</p>
              <p>Team Plans</p>
            </div>
            <div className="flex flex-col md:w-[20%] gap-[15px]">
              <h3 className="font-[800] text-[24px]">Address</h3>
              <p>2750 Quadra Street Golden Victoria Road, New York, USA</p>
              <p>+1 (123) 456 7890</p>
              <p>hello@edemy.com</p>
              <p>+55 785 4578964</p>
            </div>
          </div>

          <div className="line topl"></div>
          <div className="line leftl"></div>
          <div className="line bottoml">
            <div className="flex flex-col md:flex-row pt-3 justify-between items-center md:pr-[150px] md:pl-[150px] gap-1 text-center">
              <p>© 2024 Learnoutofbox is Proudly developed by
                <span className="text-[#ff4852]"> Noushad Zaman.</span>
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
