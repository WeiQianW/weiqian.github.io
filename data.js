// ============================================
// PORTFOLIO DATA - Edit this file to update your portfolio content
// ============================================
// To add new items, simply add a new object to the relevant array below.
// See SETUP_GITHUB_PAGES.md for detailed examples.
// ============================================

const portfolioData = {
    education: [
        {
            institution: "ITE College West",
            level: "NITEC",
            course: "Mechatronics & Robotics",
            duration: "2025 - Present",
            status: "current",
            icon: "🎓",
            gpa: {
                cumulative: "4.0",
                semesters: [
                    { label: "Sem 1", value: "4.0" },
                    { label: "Sem 2", value: "--" }
                ]
            }
        }
    ],

    // Work Experience - Leave this array empty [] to hide the section entirely.
    // Add entries when you have work experience to show.
    workExperience: [],

    skills: [
        {
            name: "IoT Development",
            icon: "🔌",
            description: "Building connected devices with ESP32, sensors, and cloud integration for real-world applications."
        },
        {
            name: "Embedded Systems",
            icon: "🖥️",
            description: "Programming microcontrollers including ESP32, Arduino, and working with various communication protocols."
        },
        {
            name: "Python",
            icon: "🐍",
            description: "Data analysis, automation scripts, and machine learning applications using Python ecosystem."
        },
        {
            name: "C/C++",
            icon: "⚡",
            description: "Low-level programming for embedded systems and performance-critical applications."
        },
        {
            name: "3D Printing & CAD",
            icon: "🖨️",
            description: "Designing and prototyping custom enclosures and mechanical components for projects."
        },
        {
            name: "Electronics",
            icon: "📡",
            description: "Circuit design, PCB layout, soldering, and working with various electronic components."
        }
    ],

    projects: [
        {
            title: "Project SOS: The IoT Safety Net",
            label: "🏆 1st Place - Asia Design-to-Make 2025",
            featured: true,
            description: "An innovative IoT-based safety monitoring system designed for elderly care and workplace safety. The system consists of two components:",
            features: [
                { bold: "Main Unit:", text: "Environmental monitoring station displaying real-time Temperature, Humidity, NO2 levels, eCO2, and TVOC with emergency alert button" },
                { bold: "Portable Unit:", text: "Wearable device for personal safety tracking and emergency notifications" }
            ],
            techTags: ["ESP32", "IoT", "Sensors", "3D Printing", "C/C++"],
            images: [
                { src: "assets/images/project-sos-main.jpeg", alt: "Project SOS Main Unit - Environmental monitoring device with display" },
                { src: "assets/images/project-sos-portable.jpeg", alt: "Project SOS Portable Unit - Wearable safety device" }
            ]
        }
    ],

    certificates: [
        {
            title: "1st Place - Asia Design-to-Make Skills Competition 2025",
            organization: "ITE College Central & Autodesk",
            description: "Designing for Dignity: Innovation for an Aging and Inclusive Future",
            icon: "🥇",
            filePath: "assets/certificates/asia-design-to-make-1st-place.png",
            fileType: "image"
        },
        {
            title: "Director's List",
            organization: "ITE College",
            description: "Academic Excellence - Multiple Semesters",
            icon: "⭐",
            fileType: "multi-pdf",
            files: [
                { label: "Jan - Jun", path: "assets/certificates/directors-list.pdf" },
                { label: "July - Dec", path: "assets/certificates/directors-list-july-dec.pdf" }
            ]
        },
        {
            title: "Drone Odysseys",
            organization: "Certification Program",
            description: "Drone operation and programming certification",
            icon: "🚁",
            filePath: "assets/certificates/drone-odysseys.pdf",
            fileType: "pdf"
        },
        {
            title: "EC-Council Certified Ethical Hacker",
            organization: "NTUC Learning Hub",
            description: "Cybersecurity and ethical hacking certification",
            icon: "🔐",
            filePath: "assets/certificates/ec-council-ceh.pdf",
            fileType: "pdf"
        },
        {
            title: "Gold Star Award",
            organization: "ITE College",
            description: "Recognition for outstanding academic and co-curricular achievements",
            icon: "🌟",
            filePath: "assets/certificates/gold-star-award.pdf",
            fileType: "pdf"
        },
        {
            title: "IBM Data Science Professional Certificate",
            organization: "Coursera",
            description: "Comprehensive data science certification covering Python, SQL, Machine Learning",
            icon: "📊",
            filePath: "assets/certificates/ibm-data-science.pdf",
            fileType: "pdf"
        }
    ]
};
