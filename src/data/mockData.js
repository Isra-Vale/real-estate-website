// ---------------------------------------------------------------------------
// MOCK DATA — used automatically whenever the live API is unreachable.
//
// Every record has an `image` path like "/images/oceanfront-villa.jpg".
// Drop matching files into /public/images/ (any .jpg/.png works — the
// filename just needs to match). If a file is missing, <PropertyImage>
// will quietly fall back to a generated placeholder graphic instead of
// showing a broken image icon, so the site never looks broken either way.
// ---------------------------------------------------------------------------

import oceanfrontVilla from "../images/oceanfront-villa.jpg";
import tropicalIslandEstate from "../images/tropical-island-estate.jpg";
import grandPenthouseSuite from "../images/grand-penthouse-suite.jpg";
import modernLuxuryVilla from "../images/modern-luxury-villa.jpg";
import islandResortEstate from "../images/island-resort-estate.jpg";
import countrysideManor from "../images/countryside-manor.jpg";

import agentSarahMitchell from "../images/agent-sarah-mitchell.jpg";
import agentMarcusChen from "../images/agent-marcus-chen.jpg";
import agentIsabelleLaurent from "../images/agent-isabelle-laurent.jpg";

import blogFutureOfArchitecture from "../images/blog-future-of-architecture.jpg";
import blogOffMarketGuide from "../images/blog-off-market-guide.jpg";
import blogCoastalInvestment from "../images/blog-coastal-investment.jpg";
import blogStagingSecrets from "../images/blog-staging-secrets.jpg";
import blogHistoricEstates from "../images/blog-historic-estates.jpg";
import blogSmartHome from "../images/blog-smart-home.jpg";

import rentalHamptonsSummerHouse from "../images/rental-hamptons-summer-house.jpg";
import rentalLakeComoVilla from "../images/rental-lake-como-villa.jpg";
import rentalAspenSkiChalet from "../images/rental-aspen-ski-chalet.jpg";
import rentalMiamiSkylineLoft from "../images/rental-miami-skyline-loft.jpg";

export const properties = [
  {
    id: "oceanfront-villa",
    tag: "New Listing",
    name: "Oceanfront Villa",
    location: "Malibu, California",
    price: 4250000,
    beds: 5,
    baths: 6,
    sqft: 6200,
    pool: true,
    features: ["Beachfront", "Pool", "Smart Home"],
    image: oceanfrontVilla,
    art: { variant: "dusk", seed: 1 },
    blurb:
      "A glass-walled retreat set directly above the surf line, where every room frames the Pacific.",
    year: 2022,
  },
  {
    id: "tropical-island-estate",
    tag: "Featured",
    name: "Tropical Island Estate",
    location: "Palm Beach, Florida",
    price: 6800000,
    beds: 7,
    baths: 8,
    sqft: 8100,
    pool: true,
    features: ["Beachfront", "Resort", "Tropical"],
    image: tropicalIslandEstate,
    art: { variant: "emerald", seed: 2 },
    blurb:
      "Private cove access, a working citrus grove, and a boathouse rebuilt in 2023.",
    year: 2018,
  },
  {
    id: "grand-penthouse-suite",
    tag: "New Listing",
    name: "Grand Penthouse Suite",
    location: "Manhattan, New York",
    price: 7500000,
    beds: 4,
    baths: 5,
    sqft: 6800,
    pool: true,
    features: ["Penthouse", "City View", "Smart Home"],
    image: grandPenthouseSuite,
    art: { variant: "night", seed: 3 },
    blurb:
      "Floor-to-ceiling glass on three exposures, sixty stories above Central Park.",
    year: 2021,
  },
  {
    id: "modern-luxury-villa",
    tag: "Featured",
    name: "Modern Luxury Villa",
    location: "Beverly Hills, California",
    price: 12800000,
    beds: 6,
    baths: 7,
    sqft: 10500,
    pool: true,
    features: ["Luxury", "Pool", "Home Theater"],
    image: modernLuxuryVilla,
    art: { variant: "amber", seed: 4 },
    blurb:
      "A Neutra-inspired compound with a private screening room and motor court for twelve.",
    year: 2020,
  },
  {
    id: "island-resort-estate",
    tag: "Exclusive",
    name: "Island Resort Estate",
    location: "Phuket, Thailand",
    price: 3950000,
    beds: 5,
    baths: 6,
    sqft: 7200,
    pool: true,
    features: ["Beachfront", "Resort", "Tropical"],
    image: islandResortEstate,
    art: { variant: "rose", seed: 5 },
    blurb:
      "Eleven acres of hillside jungle descending to a private white-sand beach.",
    year: 2019,
  },
  {
    id: "countryside-manor",
    tag: "Sold",
    name: "Surrey Country Manor",
    location: "Surrey, United Kingdom",
    price: 11500000,
    beds: 9,
    baths: 8,
    sqft: 14200,
    pool: false,
    features: ["Estate", "Historic", "Equestrian"],
    image: countrysideManor,
    art: { variant: "dusk", seed: 6 },
    blurb:
      "A Georgian estate on 40 acres with stabling for fourteen and a walled garden.",
    year: 1789,
  },
];

export const agents = [
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    title: "Senior Luxury Concierge",
    rating: 4.9,
    reviews: 127,
    phone: "(555) 123-4567",
    email: "sarah@aurum.com",
    badge: "Top 1% Agent",
    image: agentSarahMitchell,
    quote:
      "I help clients find not just a home, but a sanctuary that reflects their aspirations. With 15 years in ultra-prime markets, I bring an unmatched global network and a deeply personal approach to every transaction.",
    specialty: "Beachfront & Island Estates",
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    title: "Director, Urban Portfolio",
    rating: 4.8,
    reviews: 98,
    phone: "(555) 234-5678",
    email: "marcus@aurum.com",
    badge: "Top 1% Agent",
    image: agentMarcusChen,
    quote:
      "Penthouses are about light and silence as much as square footage. I spend more time on a building's bones than its brochure.",
    specialty: "Penthouses & City Towers",
  },
  {
    id: "isabelle-laurent",
    name: "Isabelle Laurent",
    title: "Head of European Estates",
    rating: 5.0,
    reviews: 84,
    phone: "(555) 345-6789",
    email: "isabelle@aurum.com",
    badge: "Founding Partner",
    image: agentIsabelleLaurent,
    quote:
      "Historic estates ask for patience and discretion. My clients trust me with both the negotiation and the legacy.",
    specialty: "Manors & Heritage Property",
  },
];

export const testimonials = [
  {
    quote:
      "Working with Aurum was an absolute dream. They found us our forever home in just two weeks. The level of service was unlike anything we had experienced before.",
    name: "The Johnson Family",
    detail: "Purchased: $3.8M Estate, Beverly Hills",
    closed: "Closed June 2024",
  },
  {
    quote:
      "Aurum's concierge team went above and beyond. From the private jet tours to the bespoke negotiations, every detail was handled with extraordinary care.",
    name: "Mr. & Mrs. Vandermeer",
    detail: "Purchased: $6.2M Penthouse, Manhattan",
    closed: "Closed March 2024",
  },
  {
    quote:
      "Selling our estate through Aurum fetched eighteen percent above asking. Their global network of ultra-high-net-worth buyers is simply unmatched in the industry.",
    name: "Sir Edmund Blackwood",
    detail: "Sold: $11.5M Country Estate, Surrey",
    closed: "Closed August 2024",
  },
];

export const stats = [
  { value: 2.4, suffix: "B", prefix: "$", label: "Sold in 2024" },
  { value: 340, suffix: "+", label: "Properties Closed" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 18, suffix: " yrs", label: "Average Agent Experience" },
];

export const posts = [
  {
    id: "future-of-architecture",
    title: "The Future of Architecture",
    excerpt:
      "From sustainable materials to AI-assisted design, here is what's actually changing how luxury homes get built.",
    category: "Design",
    readTime: "6 min read",
    image: blogFutureOfArchitecture,
    art: { variant: "night", seed: 21 },
    body: [
      "Ten years ago, 'smart home' meant a thermostat you could control from your phone. Today it means a building envelope that responds to weather, occupancy, and energy pricing in real time, often without anyone noticing.",
      "The shift our buyers ask about most is structural: mass timber and low-carbon concrete are now viable at the scale of a 10,000 square foot residence, not just a boutique build. That changes both the carbon footprint and the acoustics of a home in ways that are immediately felt.",
      "We're also seeing architecture firms lean on generative design tools earlier in the process, not to replace the architect but to explore massing and daylight options that would have taken weeks to model by hand. The result, when it works, is more light and less waste, not a stranger-looking house.",
    ],
  },
  {
    id: "off-market-guide",
    title: "A Buyer's Guide to Off-Market Listings",
    excerpt:
      "Why the best properties never reach a public listing — and how to get access to them.",
    category: "Market Insight",
    readTime: "4 min read",
    image: blogOffMarketGuide,
    art: { variant: "amber", seed: 22 },
    body: [
      "A surprising share of the transactions we close never appear on a public portal. Sellers at this level are often more concerned with privacy and timing than with maximum exposure, so they work through a small circle of trusted agents instead.",
      "Getting access to that circle isn't about connections so much as readiness: proof of funds, a clear mandate, and an agent who can vouch for you. Sellers would rather show a property to one serious buyer than a hundred curious ones.",
      "If you're searching in this segment, the most useful thing you can do is brief your agent precisely, neighborhood, must-haves, deal-breakers, so they can flag a match the moment it surfaces, often before it's photographed.",
    ],
  },
  {
    id: "coastal-investment",
    title: "Why Coastal Property Still Outperforms",
    excerpt: "A look at five-year appreciation data across our top beachfront markets.",
    category: "Investment",
    readTime: "5 min read",
    image: blogCoastalInvestment,
    art: { variant: "emerald", seed: 23 },
    body: [
      "Coastal scarcity is structural: you cannot build more shoreline. Across the markets we track most closely, that constraint has kept appreciation ahead of comparable inland luxury property over the last five years, even through rate cycles that slowed the broader market.",
      "Climate risk is part of the conversation now in a way it wasn't a decade ago, and it should be. The properties holding value best are the ones with serious resilience work already done, elevated mechanicals, hardened windows, updated drainage, not just an attractive view.",
      "Our take for buyers: treat resilience due diligence the same way you'd treat a structural inspection. It's not optional anymore, and it's increasingly what separates a property that holds its value from one that doesn't.",
    ],
  },
  {
    id: "staging-secrets",
    title: "Staging Secrets from Our Top Agents",
    excerpt: "Small, inexpensive changes that consistently add six figures to a sale price.",
    category: "Selling Tips",
    readTime: "3 min read",
    image: blogStagingSecrets,
    art: { variant: "rose", seed: 24 },
    body: [
      "The single highest-return change we see is also the simplest: removing roughly a third of the furniture in every room. Buyers consistently misjudge square footage downward in a crowded room, and that misjudgment shows up in offers.",
      "After that, lighting. Warm, layered lighting at three different heights reads as 'finished home' in a way that overhead light alone never does, and it costs a fraction of any renovation.",
      "Finally, smell and sound get underrated. A quiet, neutral-scented home lets buyers project themselves into the space; anything stronger becomes the story they tell about the house afterward.",
    ],
  },
  {
    id: "historic-estates",
    title: "Restoring Historic Estates the Right Way",
    excerpt: "What heritage-property buyers need to know before they start renovating.",
    category: "Heritage",
    readTime: "7 min read",
    image: blogHistoricEstates,
    art: { variant: "dusk", seed: 25 },
    body: [
      "Heritage listing status is the first thing to understand, fully, before you fall in love with a property. It can restrict everything from window replacement to the color of exterior paint, and the rules vary enormously by jurisdiction.",
      "The renovations that hold value best work with the original architecture rather than against it: restoring original joinery instead of replacing it, matching reclaimed materials rather than imitating them in new stock.",
      "Budget for surprises specifically. On every historic restoration we've supported, the largest cost overruns came from what was found once walls and floors were opened, not from the visible scope of work.",
    ],
  },
  {
    id: "smart-home-2026",
    title: "Smart Home Features Worth the Investment in 2026",
    excerpt: "Climate, security, and lighting systems our buyers actually keep using after move-in.",
    category: "Technology",
    readTime: "5 min read",
    image: blogSmartHome,
    art: { variant: "noon", seed: 26 },
    body: [
      "Most smart home features get used heavily for the first month and then quietly ignored. The ones that survive past that point share a pattern: they remove a decision rather than adding one.",
      "Zoned climate control is the clearest example. Once it's set up correctly, nobody touches a thermostat again, and the energy savings compound over years rather than months.",
      "Security systems with on-device processing, rather than constant cloud streaming, have also become the standard our buyers ask for, both for the lower long-term subscription cost and for the added privacy.",
    ],
  },
];

export const rentals = [
  {
    id: "hamptons-summer-house",
    name: "Hamptons Summer House",
    location: "East Hampton, New York",
    rate: 28000,
    period: "week",
    beds: 6,
    minStay: "1 week",
    image: rentalHamptonsSummerHouse,
    art: { variant: "noon", seed: 41 },
  },
  {
    id: "lake-como-villa",
    name: "Lake Como Villa",
    location: "Como, Italy",
    rate: 42000,
    period: "week",
    beds: 8,
    minStay: "5 nights",
    image: rentalLakeComoVilla,
    art: { variant: "emerald", seed: 42 },
  },
  {
    id: "aspen-ski-chalet",
    name: "Aspen Ski Chalet",
    location: "Aspen, Colorado",
    rate: 35000,
    period: "week",
    beds: 7,
    minStay: "1 week",
    image: rentalAspenSkiChalet,
    art: { variant: "dusk", seed: 43 },
  },
  {
    id: "miami-skyline-loft",
    name: "Miami Skyline Loft",
    location: "Miami, Florida",
    rate: 9500,
    period: "month",
    beds: 3,
    minStay: "3 months",
    image: rentalMiamiSkylineLoft,
    art: { variant: "night", seed: 44 },
  },
];

export function formatPrice(n) {
  if (n >= 1000000) {
    return `$${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
  }
  return `$${n.toLocaleString()}`;
}
