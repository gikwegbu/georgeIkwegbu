export const speakingEngagements = [
  {
    id: "spk_droidcon_london_2025",
    title: "Architecting Resilient Offline-First Mobile Apps with Flutter & Local Sync",
    eventName: "Droidcon EMEA & UK Community",
    eventType: "Keynote",
    date: "Oct 2025",
    location: "London, UK",
    isVirtual: false,
    attendees: "450+ Attendees",
    description: "A deep dive into building production-grade offline-first architectures in Flutter. Explored local embedded caching, conflict resolution strategies, background synchronization with WorkManager, and reactive state management patterns with Bloc.",
    keyTakeaways: [
      "Designed fault-tolerant SQLite / Isar local caching layers with atomic transactions",
      "Implemented dual-queue sync pipelines with exponential backoff & retry strategies",
      "Optimized app startup and memory footprints by 40% using lazy stream hydration"
    ],
    tags: ["#Flutter", "#MobileArchitecture", "#OfflineFirst", "#Dart", "#DevOps"],
    heroImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80"
    ],
    eventLink: "https://droidcon.com",
    videoLink: "https://youtube.com",
    slidesLink: "https://speakerdeck.com",
    repoLink: "https://github.com/gikwegbu",
    featured: true,
    order: 2
  },
  {
    id: "spk_gdg_devfest_lagos_2024",
    title: "State Management at Scale: Clean Architecture & BLoC in Enterprise Apps",
    eventName: "GDG DevFest Lagos",
    eventType: "Conference Talk",
    date: "Nov 2024",
    location: "Lagos, Nigeria",
    isVirtual: false,
    attendees: "600+ Attendees",
    description: "Delivered an in-depth technical session on decoupling business logic and UI in multi-module Flutter codebases. Covered clean domain-driven design, repository abstractions, and robust state machine patterns.",
    keyTakeaways: [
      "Decoupled UI presentation from business logic using unidirectional data flow",
      "Structured multi-module mono-repos for enterprise scalability and isolated testing",
      "Achieved >85% unit and integration test coverage on critical business workflows"
    ],
    tags: ["#GDG", "#DevFest", "#Flutter", "#CleanArchitecture", "#BLoC"],
    heroImage: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&auto=format&fit=crop&q=80"
    ],
    eventLink: "https://gdg.community.dev",
    videoLink: "https://youtube.com",
    slidesLink: "https://speakerdeck.com",
    repoLink: "https://github.com/gikwegbu",
    featured: true,
    order: 1
  },
  {
    id: "spk_flutter_summit_iot_2024",
    title: "Hands-On Masterclass: Real-Time IoT & Bluetooth Telemetry in Flutter",
    eventName: "Flutter Global Developers Summit",
    eventType: "Workshop",
    date: "Jun 2024",
    location: "Online / Global Stream",
    isVirtual: true,
    attendees: "250+ Engineers",
    description: "Interactive masterclass guiding developers through BLE (Bluetooth Low Energy) communication, real-time packet parsing, and 60fps telemetry graph rendering in Flutter.",
    keyTakeaways: [
      "Constructed reactive BLE event channels and high-throughput byte buffer parsers",
      "Rendered custom smooth 60fps real-time sensor graphs with CustomPainter",
      "Engineered cross-platform hardware connectivity across iOS, Android, and Web"
    ],
    tags: ["#Flutter", "#IoT", "#Bluetooth", "#RealTime", "#WebSockets"],
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80"
    ],
    eventLink: "https://flutter.dev",
    videoLink: "https://youtube.com",
    slidesLink: "https://speakerdeck.com",
    repoLink: "https://github.com/gikwegbu",
    featured: false,
    order: 0
  }
]
