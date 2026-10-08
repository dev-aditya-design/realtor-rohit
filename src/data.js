export const business = {
  name: "Rohit Real Estate",
  agent: "Rohit Jaat",
  initials: "RJ",
  location: "Rewari, Haryana",
  phone: "+91 9468130844",
  phoneDigits: "919468130844",
  callUrl: "tel:+919468130844",
};
export const disclaimer =
  "Personalized concept demo for Rohit Jaat. Rohit Real Estate is a temporary business name; Rewari, Haryana and the example locations are provisional. Every listing, image and budget category is illustrative, not verified inventory. No ownership, representation, approvals, pricing or availability are claimed. Verify title, permitted use and all details independently.";
export const whatsapp = (
  message = `Hello ${business.agent}, I would like to discuss my property requirements in the Rewari area.`,
) =>
  `https://wa.me/${business.phoneDigits}?text=${encodeURIComponent(message)}`;
export const propertyEnquiry = (property) =>
  whatsapp(
    `Hello ${business.agent}, I am interested in the Concept / Sample Listing "${property.name}" (${property.id}) in ${property.location}. I understand this is illustrative, not verified inventory. Could we discuss similar ${property.type.toLowerCase()} requirements?`,
  );
export const locations = ["Rewari", "Dharuhera", "Bawal"];
export const budgets = [
  "Under ₹50 lakh",
  "₹50 lakh–₹1 Cr",
  "₹1–2 Cr",
  "₹2 Cr+",
];
export const purposes = ["Self Use", "Business Use", "Investment"];
export const categories = [
  {
    slug: "residential",
    name: "Residential Properties",
    short: "Residential",
    image: "/images/property1.jpg",
    description:
      "From an apartment to an independent home, explore the space that fits your everyday life.",
    considerations: [
      "Layout, natural light and everyday comfort",
      "Access to schools, work and essential services",
      "Title, approvals and total ownership costs",
    ],
  },
  {
    slug: "commercial",
    name: "Commercial Properties",
    short: "Commercial",
    image: "/images/property2.jpg",
    description:
      "Explore shop and workspace concepts with your business needs, access and practical costs in mind.",
    considerations: [
      "Permitted use and local approvals",
      "Access, visibility and parking requirements",
      "Fit-out, maintenance and total occupancy costs",
    ],
  },
  {
    slug: "plots-land",
    name: "Plots & Land",
    short: "Plots & Land",
    image: "/images/land-concept.svg",
    description:
      "A starting point for plot and land conversations, with careful attention to use, access and documentation.",
    considerations: [
      "Title, boundaries and independent legal checks",
      "Land-use permissions and development restrictions",
      "Road access, utilities and long-term suitability",
    ],
  },
];
export const properties = [
  {
    id: "rewari-apartment",
    name: "The Rewari Apartment",
    location: "Rewari",
    area: "Rewari area · provisional",
    category: "residential",
    type: "Apartment",
    purpose: "Self Use",
    budget: "Under ₹50 lakh",
    image: "/images/property1.jpg",
    imageNote:
      "Illustrative interior photograph; not a photograph of a Rewari listing.",
    summary:
      "An apartment concept for a simpler everyday routine, with light-filled living spaces.",
    highlights: [
      "Consider layout and usable space",
      "Check essential services and access",
      "Verify title and building approvals",
    ],
    story:
      "An illustrative apartment profile for a conversation about your preferred layout, location and budget. The photograph and example budget are not evidence of an actual property or asking price.",
  },
  {
    id: "dharuhera-independent-house",
    name: "The Courtyard House",
    location: "Dharuhera",
    area: "Dharuhera area · provisional",
    category: "residential",
    type: "Independent House",
    purpose: "Self Use",
    budget: "₹50 lakh–₹1 Cr",
    image: "/images/property5.jpg",
    imageNote:
      "Illustrative house photograph; not a photograph of a Dharuhera listing.",
    summary:
      "An independent-home concept for buyers who value personal space and flexibility.",
    highlights: [
      "Discuss family space and future needs",
      "Review maintenance and ownership costs",
      "Verify construction permissions and title",
    ],
    story:
      "A sample independent-house profile to explore space, privacy and the responsibilities of ownership. Design, setting and budget are illustrative; no address, size or availability is verified.",
  },
  {
    id: "rewari-residential-plot",
    name: "The Neighbourhood Plot",
    location: "Rewari",
    area: "Rewari outskirts · provisional",
    category: "plots-land",
    type: "Residential Plot",
    purpose: "Self Use",
    budget: "Under ₹50 lakh",
    image: "/images/plot-concept.svg",
    imageNote:
      "Concept parcel illustration; not a site map, survey or actual plot.",
    summary:
      "A residential plot concept for those thinking about building a home of their own.",
    highlights: [
      "Confirm boundaries with an independent survey",
      "Check permitted residential use",
      "Verify road access and utility connections",
    ],
    story:
      "An illustrative plot profile for discussing future building plans. The parcel artwork is a design concept, not a survey, site plan or claim of residential-use approval.",
  },
  {
    id: "bawal-commercial-shop",
    name: "The High Street Shop",
    location: "Bawal",
    area: "Bawal area · provisional",
    category: "commercial",
    type: "Commercial Shop",
    purpose: "Business Use",
    budget: "₹50 lakh–₹1 Cr",
    image: "/images/property4.jpg",
    imageNote:
      "Illustrative interior inspiration; not a photograph of a Bawal shop.",
    summary:
      "A shop concept to start a conversation about visibility, access and business fit.",
    highlights: [
      "Review footfall through on-site research",
      "Check permitted business activity",
      "Compare fit-out and recurring costs",
    ],
    story:
      "A sample commercial-shop profile for evaluating a business location. The interior photograph is visual inspiration only; footfall, commercial permissions and rental or sale terms have not been verified.",
  },
  {
    id: "dharuhera-workspace",
    name: "The Open Workspace",
    location: "Dharuhera",
    area: "Dharuhera area · provisional",
    category: "commercial",
    type: "Commercial Space",
    purpose: "Business Use",
    budget: "₹1–2 Cr",
    image: "/images/property2.jpg",
    imageNote:
      "Illustrative architectural interior; not a photograph of a Dharuhera workspace.",
    summary:
      "A flexible commercial-space concept shaped around how your business works.",
    highlights: [
      "Discuss space planning and accessibility",
      "Verify commercial-use permissions",
      "Review fit-out, parking and operating costs",
    ],
    story:
      "An illustrative workspace profile for conversations about team needs and practical access. This photograph does not establish the existence, commercial use or availability of any local property.",
  },
  {
    id: "bawal-investment-land",
    name: "The Open Land Concept",
    location: "Bawal",
    area: "Bawal surroundings · provisional",
    category: "plots-land",
    type: "Investment Land",
    purpose: "Investment",
    budget: "₹2 Cr+",
    image: "/images/land-concept.svg",
    imageNote:
      "Concept landscape illustration; not a photograph, survey or verified parcel.",
    summary:
      "A land concept for patient planning, careful due diligence and realistic expectations.",
    highlights: [
      "Check title and land-use classification",
      "Assess access and holding costs",
      "Seek independent legal and financial advice",
    ],
    story:
      "A sample land profile illustrating the questions to ask before evaluating a land purchase. No development approval, future appreciation, ownership or return is represented or promised.",
  },
];
export const propertyTypes = properties.map((p) => p.type);
export const filterProperties = (filters = {}, category) =>
  properties.filter(
    (p) =>
      (!category || p.category === category) &&
      ["location", "type", "purpose", "budget"].every(
        (key) => !filters[key] || p[key] === filters[key],
      ),
  );
