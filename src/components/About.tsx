import { FaGlobeAsia, FaBookOpen, FaUsers, FaShippingFast } from "react-icons/fa";

const stats = [
  { icon: FaBookOpen, label: "Books Available", value: "5,000+" },
  { icon: FaUsers, label: "Happy Customers", value: "500+" },
  { icon: FaGlobeAsia, label: "Countries Served", value: "3+" },
  { icon: FaShippingFast, label: "Books Delivered", value: "2,000+" },
];

export default function About() {
  return (
    <section id="about" className="bg-teal py-10 md:py-14 text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header + Content side by side on desktop */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-10">
          {/* Left - Title */}
          <div className="md:w-5/12 flex-shrink-0">
            <span className="text-white/50 uppercase text-[10px] tracking-widest">Our Story</span>
            <h2 className="text-2xl md:text-3xl font-semibold mt-1 text-white leading-tight">
              About Burki Books
            </h2>
            <span className="block mt-2 w-10 h-0.5 bg-white/50" />
          </div>

          {/* Right - Description */}
          <div className="md:w-7/12 space-y-3">
            <p className="text-white/70 leading-relaxed text-sm">
              Burki Books is a growing online bookstore dedicated to offering a diverse and rich collection
              of new and old books across a wide spectrum of genres, including Fiction, History, Politics, and much more.
            </p>
            <p className="text-white/70 leading-relaxed text-sm">
              Founded in Lahore on October 30, 2021, by <a href="https://www.facebook.com/share/1C6TLz4jCG/" target="_blank" rel="noreferrer" className="text-white font-bold hover:underline underline-offset-2 transition">Faridoon Burki</a>,
              a passionate social and environmental activist hailing from South Waziristan.
              Driven by a mission to make reading accessible, the platform quickly established a strong presence.
            </p>
            <p className="text-white/70 leading-relaxed text-sm">
              While rooted in Pakistan, Burki Books has expanded its reach globally,
              delivering books to the Netherlands, KSA, and across the globe.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center bg-white/10 hover:bg-white/15 transition-colors duration-300 rounded-xl p-4 group">
              <stat.icon className="text-2xl text-white/80 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-xl md:text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-white/50 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
