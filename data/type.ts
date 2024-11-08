interface Rewards {
  image: string;
  value: number;
  expiry: string;
  title: string;
  store: string;
  description: string;
  terms: string;
}

interface Points {
  value: number;
  expiry: string;
}

interface Featured {
  image: string;
  url: string;
}

interface Promotions {
  image: string;
  title: string;
  location: string;
  store: string;
  duration: string;
  dateStart: string;
  dateEnd: string;
  description: string;
  expired: boolean;
}

interface Events {
  image: string;
  title: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  duration: string;
  description: string;
  expired: boolean;
}

interface CarParkDollar {
  value: number;
}

interface Store {
  name: string;
  location: string;
  category: string[];
  tags: string[];
  description: string;
  image: string;
}

interface Receipt {
  id: string;
  value: number;
  store: string;
  date: string;
}

interface Redemption {
  id: string;
  value: number;
  store: string;
  date: string;
}

interface Utilization {
  id: string;
  value: number;
  store: string;
  date: string;
}

interface Purchased {
  id: string;
  value: number;
  store: string;
  date: string;
}

interface Expired {
  id: string;
  value: number;
  store: string;
  date: string;
  description: string;
}

const EventCategory = {
  ALL: "all",
  GENERAL: "general",
  WORKSHOP: "workshop",
} as const;

const DirectoryCategory = {
  ALL: {
    id: 0,
    name: "All",
  },
  DINING: {
    id: 1,
    name: "Dining",
  },
  SHOPPING: {
    id: 2,
    name: "Shopping",
  },
  SERVICES: {
    id: 3,
    name: "Services",
  }
}

const Category = {
  // Dining
  CAFE: "cafe",
  DELI: "deli & confectionery",
  FAST_FOOD: "fast food & quick bites",
  FOOD_COURT: "food court",
  RESTAURANT: "restaurant & bar",

  // Shopping
  BEAUTY: "beauty & personal care",
  ELECTRONICS: "electronics & telecommunications",
  FASHION: "fashion & accessories",
  HOME: "home & furnishings",
  JEWELLERY: "jewellery, watches & optical",
  KIDS: "kids, gifts & hobbies",
  LEISURE: "leisure & entertainment",
  SPORTS: "sports & lifestyle",
  SUPERMARKET: "supermarket",

  // Services
  EDUCATION: "education",
  FITNESS: "fitness",
  SERVIES: "services",
};

const Tag = {
  EARN_POINTS: "earn points",
  E_VOUCHER_ACCEPTED: "e-voucher accepted",
  HALAL: "halal certified",
  PAY_WITH_POINTS: "pay with points",
} as const;

export {
  type Rewards,
  type Points,
  type Featured,
  type Promotions,
  type Events,
  type CarParkDollar,
  type Store,
  type Receipt,
  type Redemption,
  type Utilization,
  type Purchased,
  type Expired,
  DirectoryCategory,
  EventCategory,
  Category,
  Tag,
};
