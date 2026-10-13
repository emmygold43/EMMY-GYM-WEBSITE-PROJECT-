export interface BusinessPlan {
  name: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  billingFrequency: string;
  includes: string[];
}

export interface BusinessProgram {
  name: string;
  level: string;
  durationMinutes: number;
  caloriesBurn: string;
  description: string;
}

export interface EmmyBusinessData {
  businessName: string;
  brandDescriptor: string;
  description: string;
  tagline: string;
  address: {
    street: string;
    suite: string;
    district: string;
    city: string;
    state: string;
    zip: string;
    formatted: string;
    directionsNote: string;
    mapLink: string;
  };
  openingHours: {
    weekdays: string;
    weekends: string;
    openTimeWeekdays: string;
    closeTimeWeekdays: string;
    openTimeWeekends: string;
    closeTimeWeekends: string;
    holidayHours: string; // explicitly unconfigured
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    email: string;
    websiteUrl: string;
  };
  freeIntroductorySession: {
    policy: string;
    cost: number;
    durationMinutes: number;
    gearProvided: string;
    requirements: string;
    bookingAction: string;
  };
  membershipPlans: BusinessPlan[];
  trainingPrograms: BusinessProgram[];
  coachingRoster: {
    name: string;
    role: string;
    experience: string;
    specialty: string;
  }[];
  facilities: string[];
}

export const EMMY_BUSINESS_DATA: EmmyBusinessData = {
  businessName: 'EMMY Boxing Club',
  brandDescriptor: 'Boxing Club',
  description:
    'EMMY Boxing Club is a high-performance modern athletic boxing club offering authentic pugilistic training, heavy bag conditioning, and technical ring skill development for everyday contenders and athletes.',
  tagline: 'Discipline / Strength / Results. Real People. Real Progress.',
  address: {
    street: '450 Champions Way',
    suite: 'Suite 100',
    district: 'Downtown Athletic District',
    city: 'New York',
    state: 'NY',
    zip: '10013',
    formatted: '450 Champions Way, Suite 100, Downtown Athletic District, NY 10013',
    directionsNote:
      'Located on Champions Way between 4th and 5th Avenue, 2 blocks from the Downtown Athletic subway station (Lines A/C/E and 1/2/3). Free verified member parking in the rear.',
    mapLink: 'https://maps.google.com/?q=450+Champions+Way+NY+10013',
  },
  openingHours: {
    weekdays: 'Monday – Friday: 5:30 AM – 10:00 PM',
    weekends: 'Saturday – Sunday: 7:00 AM – 6:00 PM',
    openTimeWeekdays: '5:30 AM',
    closeTimeWeekdays: '10:00 PM',
    openTimeWeekends: '7:00 AM',
    closeTimeWeekends: '6:00 PM',
    holidayHours: 'Unknown / Not confirmed in current information. Please check directly with the front desk for holiday schedules.',
  },
  contact: {
    phone: '(212) 555-3669',
    phoneFormatted: '(212) 555-EMMY (3669)',
    email: 'frontdesk@emmyboxingclub.com',
    websiteUrl: 'https://emmyboxingclub.com',
  },
  freeIntroductorySession: {
    policy: '100% Free First Introductory Session for all new members.',
    cost: 0,
    durationMinutes: 55,
    gearProvided: 'Sanitized 16oz training gloves and quick-wrap liners are provided completely free of charge upon arrival.',
    requirements: 'Arrive 10 minutes prior to session in standard athletic workout apparel and clean training sneakers.',
    bookingAction: 'Book online via the "Book a Session" or "Talk to EMMY AI" buttons on the website.',
  },
  membershipPlans: [
    {
      name: 'First Session Trial',
      monthlyPrice: 0,
      annualMonthlyPrice: 0,
      billingFrequency: 'one-time',
      includes: [
        '1 Full 55-minute coach-led session',
        'Complimentary leather glove rental',
        'Hand wrapping tutorial & wrist prep',
        'Gym floor & locker room access',
        'Post-workout recovery assessment',
      ],
    },
    {
      name: 'The Contender',
      monthlyPrice: 129,
      annualMonthlyPrice: 99,
      billingFrequency: 'monthly',
      includes: [
        '3 Coach-led classes per week (12 per month)',
        'Unlimited open gym & heavy bag access',
        'EMMY mobile locker pass & reservation',
        'Discounts on EMMY apparel & fight gear',
        'Standard locker room & sauna access',
      ],
    },
    {
      name: 'Championship All-Access',
      monthlyPrice: 189,
      annualMonthlyPrice: 149,
      billingFrequency: 'monthly',
      includes: [
        'Unlimited coach-led classes across all 5 programs',
        'Full open gym & heavy bag alleys (5:30 AM - 10:00 PM)',
        '1 Monthly 45-minute 1-on-1 mitt work session',
        'Full Infrared Sauna & Cold Plunge access',
        'Priority class waitlist booking window',
        'Guest pass privilege (1 guest per month)',
      ],
    },
    {
      name: 'Fighter Pro Elite',
      monthlyPrice: 289,
      annualMonthlyPrice: 239,
      billingFrequency: 'monthly',
      includes: [
        'Everything in Championship All-Access',
        '4 Monthly private 1-on-1 technical sessions with head coaches',
        'Championship sparring ring access & cornering',
        'Custom strength & conditioning programming',
        'Reserved private equipment locker',
        'EMMY Pro Fight Pack (Gloves, wraps & kit)',
      ],
    },
  ],
  trainingPrograms: [
    {
      name: 'Boxing Fundamentals',
      level: 'Beginner',
      durationMinutes: 50,
      caloriesBurn: '500-650 kcal',
      description: 'Build your foundation from zero: stance geometry, guard mechanics, jab-cross technique, slipping angles, and footwork drills.',
    },
    {
      name: 'Heavy Bag Conditioning',
      level: 'All Levels',
      durationMinutes: 55,
      caloriesBurn: '750-950 kcal',
      description: '10 high-intensity rounds against authentic leather heavy bags with explosive combination bursts, HIIT intervals, and core conditioning.',
    },
    {
      name: 'Technical Mittwork & Defense',
      level: 'Intermediate',
      durationMinutes: 45,
      caloriesBurn: '600-750 kcal',
      description: 'High-velocity coach-held padwork rounds. Master slip lines, rolling under hooks, counter-punch timing, and snappy punch combinations with real-time coach feedback.',
    },
    {
      name: 'Championship Sparring',
      level: 'Advanced',
      durationMinutes: 60,
      caloriesBurn: '700-900 kcal',
      description: 'Supervised, technical ring sparring inside our regulation 20ft elevated ring. Requires coach clearance from Boxing Fundamentals.',
    },
    {
      name: "Fighter's Strength & Conditioning",
      level: 'Intermediate',
      durationMinutes: 50,
      caloriesBurn: '600-800 kcal',
      description: 'Olympic barbell lifting, rotational medicine ball acceleration, kettlebells, and sprint intervals engineered for pugilistic power.',
    },
    {
      name: 'Youth Gloves Academy',
      level: 'All Levels (Ages 10-17)',
      durationMinutes: 45,
      caloriesBurn: '400-550 kcal',
      description: 'Ages 10-17: Classic pugilistic etiquette, discipline, coordination, and athletic foundation in a supportive coach-mentored environment.',
    },
  ],
  coachingRoster: [
    {
      name: 'Marcus "The Anvil" Vance',
      role: 'Head Coach & Founder',
      experience: '18 Years Experience · 24-2 Pro Record · 3x Golden Gloves Champion',
      specialty: 'Power mechanics, counter-punching & tactical ring IQ',
    },
    {
      name: 'Elena Rostova',
      role: 'Technical Striking Director',
      experience: '12 Years Experience · European Championship Medalist',
      specialty: 'Footwork geometry, defensive slipping & hand speed',
    },
    {
      name: 'Jamal Washington, CSCS',
      role: 'Director of Performance & Strength',
      experience: '10 Years Experience · Certified Strength & Conditioning Specialist',
      specialty: 'Rotational power, kinetic chain velocity, anaerobic capacity',
    },
  ],
  facilities: [
    'Regulation 20ft elevated championship canvas competition ring',
    '30+ Custom leather and water-core heavy bags (100lb and 150lb)',
    'Dedicated Strength & Conditioning bay with Eleiko bars and Woodway treadmills',
    'Recovery lounge featuring dry infrared sauna and 48°F contrast cold plunge tubs',
    'Locker rooms with showers, keyless digital lockers, and complimentary towel service',
  ],
};
