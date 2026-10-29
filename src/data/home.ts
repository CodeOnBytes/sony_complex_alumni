// Home page content. Put photos in /public/images and update the paths here.

export const heroStat = {
  value: "15K+",
  title: "Global Alumni",
  text: "Graduates from every class, staying connected across the world.",
  years: "Classes of 1997 – 2025",
  avatars: ["/images/alumni-1.jpg", "/images/alumni-2.jpg", "/images/alumni-3.jpg", "/images/alumni-4.jpg"],
};

export const features = [
  { title: "Strong Network", text: "Reconnect with classmates and meet graduates from every year.", cta: "Join the Network", href: "#" },
  { title: "Alumni Events", text: "Join reunions, meetups and workshops all year.", cta: "Explore Events", href: "/events" },
  { title: "Career Mentorships", text: "Networking opportunities with and professional advice from fellow alumni.", cta: "Find Opportunities", href: "#" },
  { title: "Giving Back", text: "Support scholarships and projects that help current students succeed.", cta: "Give Now", href: "#" },
];

/** Which card is raised and navy when nobody is hovering (0-3) */
export const defaultFeature = 1;

export const about = {
  badge: "About Our Association",
  title: "Connecting Graduates Through Friendship, Service, and Lifelong Achievement.",
  text: "Our alumni association brings graduates together to celebrate shared memories, support one another, and give back to the school that shaped us. Whether you graduated last year or decades ago, there is a place for you here.",
  points: ["Class and Chapter Reunions", "Mentorship and Career Networking", "Scholarships and Community Projects"],
  image: "/images/about.jpg",
};

export const events = {
  badge: "Experience Alumni Life",
  title: "Alumni Events & Community",
  intro: "Meet up with fellow graduates at reunions, sports days, workshops and service projects throughout the year.",
  slides: [
    { image: "/images/events-1.jpg", stat1: "100+ Events", stat2: "Year-Round Activities", title: "Reunions & Social Gatherings", text: "Come together with your class and chapter to celebrate old friendships and make new ones." },
    { image: "/images/events-2.jpg", stat1: "20+ Teams", stat2: "Annual Tournaments", title: "Sports & Recreation", text: "Join alumni teams, friendly matches and the yearly sports day for graduates of all ages." },
    { image: "/images/events-3.jpg", stat1: "50+ Mentors", stat2: "Monthly Sessions", title: "Workshops & Mentorship", text: "Attend talks and career sessions led by alumni working across many industries." },
    { image: "/images/events-4.jpg", stat1: "30+ Projects", stat2: "Community Impact", title: "Service & Volunteering", text: "Give your time to community projects organised by alumni chapters." },
  ],
};

export const programs = {
  badge: "Chapters & Programs",
  title: "Programs Alumni Love",
  items: [
    { image: "/images/program-1.jpg", count: "12 Chapters", members: "1,200+ Members", title: "Regional Chapters", text: "Meet alumni near you through local chapters that host regular get-togethers and projects.", link: "View Chapters" },
    { image: "/images/program-2.jpg", count: "8 Programs", members: "600+ Mentees", title: "Mentorship Program", text: "Pair with an alumni mentor for career guidance, introductions and practical advice.", link: "Join Mentorship" },
    { image: "/images/program-3.jpg", count: "15 Awards", members: "400+ Students", title: "Scholarship Fund", text: "Help deserving students stay in school through alumni-funded scholarships.", link: "Support Students" },
  ],
};

export const initiatives = {
  badge: "Impact & Initiatives",
  title: "Alumni Initiatives",
  filters: ["All", "Education", "Networking", "Community", "Giving"],
  items: [
    { image: "/images/init-1.jpg", tag: "Education", label: "Education / Scholarships", title: "School Support Projects", text: "Funding classrooms, books and equipment for today's students." },
    { image: "/images/init-2.jpg", tag: "Networking", label: " Networking", title: "Career Networking Events", text: "Connect with  alumni  across different sectors." },
    { image: "/images/init-3.jpg", tag: "Community", label: "Community / Volunteering", title: "Community Service Days", text: "Work side by side with fellow graduates on projects that help our neighbours." },
    { image: "/images/init-4.jpg", tag: "Giving", label: "Giving / Fundraising", title: "Annual Giving Campaign", text: "Every contribution goes to scholarships and school improvements." },
  ],
};

export const testimonials = {
  badge: "Testimonials",
  title: "What Our Alumni Say",
  intro: "Hear from graduates who stayed connected, found mentors, and gave back through the association.",
  items: [
    { name: "Michael Carter", role: "Class of 2012, Business Administration", image: "/images/person-1.jpg", quote: "The alumni network helped me find my first job and later my business partner. Staying connected has been one of the best decisions I made after graduating." },
    { name: "Amina Yusuf", role: "Class of 2016, Engineering", image: "/images/person-2.jpg", quote: "Mentoring younger graduates reminded me how much this community gave me. I look forward to every reunion." },
    { name: "Daniel Okello", role: "Class of 2008, Medicine", image: "/images/person-3.jpg", quote: "From class reunions to scholarship drives, the association keeps us close to the school and to each other." },
  ],
};

export const whyJoin = {
  badge: "Why Join Us",
  title: "Empowering Alumni Through Connection",
  image: "/images/why.jpg",
  points: ["Lifelong Friendships", "Global Opportunities", "Career-Focused Networking", "Mentorship for Every Graduate"],
  cta: "Become a Member",
  cards: [
    { title: "Strong Alumni Network", text: "Stay in touch with classmates and graduates working in every field and city.", icon: "people" },
    { title: "Lifelong Learning", text: "Join talks, workshops and training sessions led by fellow alumni.", icon: "book" },
    { title: "Career Opportunities", text: "Get job leads, referrals and honest advice from people who have been there.", icon: "cap" },
    { title: "Community Impact", text: "Volunteer, mentor and give back to the school and the community around it.", icon: "heart" },
  ],
};

export const ctaBanner = {
  title: "Your Future Begins With Staying Connected",
  text: "Take the next step in your alumni journey. Join the association, meet graduates from every year, and help the next generation succeed.",
  image: "/images/cta.jpg",
  points: ["Free Alumni Membership", "Events and Reunions", "Mentorship and Careers"],
  button: "Join the Association",
};
