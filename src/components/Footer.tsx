import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter, FaTiktok } from "react-icons/fa";
import { BsThreads } from "react-icons/bs";
import Logo from "./Logo";

export default function Footer() {
  return (
    <>
      <footer id="contact" className="bg-teal text-white pt-6 pb-5 md:pt-10 md:pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Row - Logo + Social */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 pb-4 md:mb-8 md:pb-6 border-b border-white/10">
            <Logo theme="light" />
            <div className="flex flex-wrap justify-center gap-1.5">
              {[
                { icon: FaFacebookF, href: "https://www.facebook.com/share/1C6TLz4jCG/" },
                { icon: FaInstagram, href: "https://www.instagram.com/burkibooks/profilecard/?igsh=MW05aGt2c3R6eWFwZA==" },
                { icon: FaWhatsapp, href: "https://wa.me/message/HUW2DFBLWKKLI1" },
                { icon: FaTwitter, href: "https://x.com/BurkiBooks?t=6L-KtcaGlaMLkh9BzDP5oQ&s=09" },
                { icon: FaTiktok, href: "https://www.tiktok.com/@burkibooks" },
                { icon: BsThreads, href: "https://www.threads.com/@burkibooks" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 md:w-8 md:h-8 bg-white/10 hover:bg-white hover:text-teal text-white rounded-full flex items-center justify-center transition-all duration-300 text-[10px] md:text-xs"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Main Grid - 2 cols mobile, 4 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {/* Quick Links */}
            <div>
              <h5 className="text-xs font-semibold text-white mb-2 md:text-sm md:mb-3">Quick Links</h5>
              <ul className="space-y-1 md:space-y-1.5">
                {["Home", "Featured", "Popular", "Special Offers", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-white/60 text-[11px] md:text-xs hover:text-white transition">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visit Us + Connect merged on mobile */}
            <div>
              <h5 className="text-xs font-semibold text-white mb-2 md:text-sm md:mb-3">Visit Us</h5>
              <p className="text-white/60 text-[11px] md:text-xs leading-relaxed mb-1.5">
                Burki Books HQ<br />
                Cantt, Lahore
              </p>
              <p className="text-white/60 text-[11px] md:text-xs mb-2">Pickup by appointment</p>
              <div className="md:hidden mt-2 pt-2 border-t border-white/10">
                <h5 className="text-xs font-semibold text-white mb-1.5">Connect</h5>
                <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px]">
                  <a href="https://www.threads.com/@burkibooks" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1"><BsThreads /> Threads</a>
                  <span className="text-white/20">|</span>
                  <a href="https://www.tiktok.com/@burkibooks" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1"><FaTiktok /> TikTok</a>
                  <span className="text-white/20">|</span>
                  <a href="https://wa.me/message/HUW2DFBLWKKLI1" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1"><FaWhatsapp /> WhatsApp</a>
                  <span className="text-white/20">|</span>
                  <a href="https://www.facebook.com/share/1C6TLz4jCG/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1"><FaFacebookF /> Facebook</a>
                  <span className="text-white/20">|</span>
                  <a href="https://www.instagram.com/burkibooks/profilecard/?igsh=MW05aGt2c3R6eWFwZA==" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1"><FaInstagram /> Instagram</a>
                  <span className="text-white/20">|</span>
                  <a href="https://x.com/BurkiBooks?t=6L-KtcaGlaMLkh9BzDP5oQ&s=09" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1"><FaTwitter /> Twitter</a>
                </div>
              </div>
            </div>

            {/* Connect */}
            <div className="hidden md:block">
              <h5 className="text-sm font-semibold text-white mb-3">Connect</h5>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <a href="https://www.threads.com/@burkibooks" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1.5">
                    <BsThreads /> Threads
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@burkibooks" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1.5">
                    <FaTiktok /> TikTok
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/message/HUW2DFBLWKKLI1" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1.5">
                    <FaWhatsapp /> WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/share/1C6TLz4jCG/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1.5">
                    <FaFacebookF /> Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/burkibooks/profilecard/?igsh=MW05aGt2c3R6eWFwZA==" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1.5">
                    <FaInstagram /> Instagram
                  </a>
                </li>
                <li>
                  <a href="https://x.com/BurkiBooks?t=6L-KtcaGlaMLkh9BzDP5oQ&s=09" target="_blank" rel="noreferrer" className="text-white/60 hover:text-white transition inline-flex items-center gap-1.5">
                    <FaTwitter /> Twitter / X
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bottom */}
      <div className="py-1.5 bg-[#155f65]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-0.5">
          <p className="text-white/50 text-[10px]">
            &copy; 2024 Burki Books. All rights reserved.
          </p>
          <p className="text-white/30 text-[10px]">
            Developed by{" "}
            <a href="https://www.zameerahmed.online" target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition underline underline-offset-2">
              Zameer Ahmed Mehsood
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
