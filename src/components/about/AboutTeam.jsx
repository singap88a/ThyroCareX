"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Award, GraduationCap, Briefcase } from "lucide-react";

const AboutTeam = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      specialty: "Endocrinology & Oncology",
      experience: "15+ years",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop&crop=face",
      achievements: [
        { text: "Harvard Medical School", icon: <GraduationCap size={16} /> },
        { text: "200+ Published Papers", icon: <Award size={16} /> },
        { text: "FDA Advisory Board", icon: <Briefcase size={16} /> },
      ],
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head of AI Research",
      specialty: "Machine Learning & Healthcare",
      experience: "12+ years",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=500&fit=crop&crop=face",
      achievements: [
        { text: "Stanford AI Lab", icon: <GraduationCap size={16} /> },
        { text: "PhD Computer Science", icon: <Award size={16} /> },
        { text: "50+ AI Patents", icon: <Briefcase size={16} /> },
      ],
    },
    {
      name: "Dr. Emily Watson",
      role: "Clinical Director",
      specialty: "Thyroid Surgery",
      experience: "18+ years",
      image:
        "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=500&h=500&fit=crop&crop=face",
      achievements: [
        { text: "Mayo Clinic Alumni", icon: <GraduationCap size={16} /> },
        { text: "1000+ Surgeries", icon: <Award size={16} /> },
        { text: "Teaching Professor", icon: <Briefcase size={16} /> },
      ],
    },
    {
      name: "Dr. James Kim",
      role: "Data Science Lead",
      specialty: "Medical Imaging & AI",
      experience: "10+ years",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&h=500&fit=crop&crop=face",
      achievements: [
        { text: "MIT Research", icon: <GraduationCap size={16} /> },
        { text: "Deep Learning Expert", icon: <Award size={16} /> },
        { text: "NVIDIA Partnership", icon: <Briefcase size={16} /> },
      ],
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* ===== Header Section ===== */}
        <div className="mb-16 text-center">
          <span className="px-4 py-1.5 text-sm font-semibold tracking-wider text-primary uppercase rounded-full bg-primary/10">
            Our Specialists
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-primary">
              Expert Team
            </span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Dedicated professionals combining medical excellence and AI innovation to redefine thyroid care.
          </p>
        </div>

        {/* ===== Swiper Section ===== */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          pagination={{
            clickable: true,
            bulletClass:
              "swiper-pagination-bullet !w-6 !h-1.5 !rounded-full !bg-gray-300 opacity-60 transition-all duration-300",
            bulletActiveClass:
              "swiper-pagination-bullet-active !bg-primary opacity-100 !w-8",
          }}
          grabCursor={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1.3 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-md group rounded-2xl hover:shadow-xl">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full transition-transform duration-700 h-72 group-hover:scale-105"
                  />
                  {/* Overlay with name + role */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                    <div className="transition-all duration-300 transform group-hover:translate-y-[-4px]">
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-sm font-medium text-primary">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <p className="mb-2 text-sm text-gray-600">{member.specialty}</p>
                  <p className="mb-4 text-xs text-gray-500">
                    {member.experience} experience
                  </p>

                  <div className="space-y-2">
                    {member.achievements.map((ach, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="text-primary">{ach.icon}</span>
                        {ach.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AboutTeam;
