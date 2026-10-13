import { ProgramItem, ClassScheduleItem, TrainerItem, MembershipPlan } from '../types';

export const HERO_IMAGE = '/src/assets/images/emmy_hero_boxer_punch_1791811699151.jpg';
export const GYM_RING_IMAGE = '/src/assets/images/emmy_gym_ring_1791705737410.jpg';
export const TRAINER_MITTS_IMAGE = '/src/assets/images/emmy_trainer_mitts_1791705750151.jpg';

export const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: 'prog-fundamentals',
    name: 'Boxing Fundamentals',
    subtitle: 'Master the Sweet Science',
    description: 'Build your foundation from zero. Stance geometry, guard mechanics, jab-cross technique, slipping angles, and footwork drills engineered for beginners and technical purists.',
    intensity: 3,
    durationMinutes: 50,
    caloriesBurn: '500-650 kcal',
    targetFocus: ['Footwork & Stance', 'Jab & Cross Mechanics', 'Defensive Guard', 'Shadowboxing'],
    level: 'Beginner',
  },
  {
    id: 'prog-heavy-bag',
    name: 'Heavy Bag Conditioning',
    subtitle: 'High-Volume Power & Endurance',
    description: '10 high-intensity rounds against authentic leather heavy bags. Fast punch combinations, explosive body shots, and core intervals to forge peak cardiovascular resilience.',
    intensity: 5,
    durationMinutes: 55,
    caloriesBurn: '750-950 kcal',
    targetFocus: ['Punch Output Volume', 'Rotational Power', 'HIIT Stamina', 'Grip & Core'],
    level: 'All Levels',
  },
  {
    id: 'prog-mittwork',
    name: 'Technical Mittwork & Defense',
    subtitle: 'Precision Striking & Counter Angles',
    description: 'High-velocity coach-held padwork rounds. Master slip lines, rolling under hooks, counter-punch timing, and snappy punch combinations with real-time coach feedback.',
    intensity: 4,
    durationMinutes: 45,
    caloriesBurn: '600-750 kcal',
    targetFocus: ['Coach Mittwork Rounds', 'Slip & Roll Defense', 'Angle Transitions', 'Counter-Punch Speed'],
    level: 'Intermediate',
  },
  {
    id: 'prog-sparring',
    name: 'Championship Sparring',
    subtitle: 'Ring IQ & Controlled Battle',
    description: 'Supervised, technical sparring inside our regulation elevated ring. Read opponents, control ring center, sharpen reaction speed, and execute tactical fight plans under coach supervision.',
    intensity: 5,
    durationMinutes: 60,
    caloriesBurn: '700-900 kcal',
    targetFocus: ['Distance Management', 'Counter-Punching', 'Ring Control', 'Head Movement'],
    level: 'Advanced',
  },
  {
    id: 'prog-strength',
    name: "Fighter's Strength & Conditioning",
    subtitle: 'Power Transfer & Injury Prevention',
    description: 'Olympic bar work, medicine ball throws, kettlebell swings, and sled pulls designed strictly for rotational torque, posterior chain acceleration, and shoulder stability.',
    intensity: 4,
    durationMinutes: 50,
    caloriesBurn: '600-800 kcal',
    targetFocus: ['Explosive Hip Hinge', 'Rotational Torque', 'Shoulder Endurance', 'Neck & Core Armor'],
    level: 'Intermediate',
  },
  {
    id: 'prog-youth',
    name: 'Youth Gloves Academy',
    subtitle: 'Discipline, Respect & Athletics',
    description: 'Ages 10-17. Teaches classic pugilistic etiquette, non-violent ring discipline, motor control, and character building in a supportive, coach-mentored environment.',
    intensity: 3,
    durationMinutes: 45,
    caloriesBurn: '400-550 kcal',
    targetFocus: ['Discipline & Focus', 'Agility & Coordination', 'Self-Esteem', 'Teamwork'],
    level: 'All Levels',
  },
];

export const SCHEDULE_DATA: ClassScheduleItem[] = [
  // Monday
  { id: 'sch-m1', day: 'Mon', time: '06:00 AM', period: 'Morning', className: 'Heavy Bag Conditioning', coach: 'Maya Lin', spotsLeft: 3, totalSpots: 18, intensity: 'High', level: 'All Levels' },
  { id: 'sch-m2', day: 'Mon', time: '07:30 AM', period: 'Morning', className: 'Boxing Fundamentals', coach: 'Marcus Vance', spotsLeft: 6, totalSpots: 16, intensity: 'Medium', level: 'Beginner' },
  { id: 'sch-m3', day: 'Mon', time: '12:00 PM', period: 'Afternoon', className: "Fighter's Strength & Conditioning", coach: 'Jamal Washington', spotsLeft: 4, totalSpots: 14, intensity: 'High', level: 'Intermediate' },
  { id: 'sch-m4', day: 'Mon', time: '05:30 PM', period: 'Evening', className: 'Heavy Bag Conditioning', coach: 'Elena Rostova', spotsLeft: 2, totalSpots: 18, intensity: 'Extreme', level: 'All Levels' },
  { id: 'sch-m5', day: 'Mon', time: '07:00 PM', period: 'Evening', className: 'Championship Sparring', coach: 'Marcus Vance', spotsLeft: 1, totalSpots: 10, intensity: 'Extreme', level: 'Fighter Pro' },

  // Tuesday
  { id: 'sch-t1', day: 'Tue', time: '06:30 AM', period: 'Morning', className: 'Boxing Fundamentals', coach: 'Elena Rostova', spotsLeft: 5, totalSpots: 16, intensity: 'Medium', level: 'Beginner' },
  { id: 'sch-t2', day: 'Tue', time: '09:00 AM', period: 'Morning', className: 'Heavy Bag Conditioning', coach: 'Maya Lin', spotsLeft: 7, totalSpots: 18, intensity: 'High', level: 'All Levels' },
  { id: 'sch-t3', day: 'Tue', time: '04:30 PM', period: 'Afternoon', className: 'Youth Gloves Academy', coach: 'Elena Rostova', spotsLeft: 4, totalSpots: 12, intensity: 'Medium', level: 'All Levels' },
  { id: 'sch-t4', day: 'Tue', time: '06:00 PM', period: 'Evening', className: "Fighter's Strength & Conditioning", coach: 'Jamal Washington', spotsLeft: 2, totalSpots: 14, intensity: 'High', level: 'Intermediate' },
  { id: 'sch-t5', day: 'Tue', time: '07:30 PM', period: 'Evening', className: 'Heavy Bag Conditioning', coach: 'Marcus Vance', spotsLeft: 4, totalSpots: 18, intensity: 'Extreme', level: 'All Levels' },

  // Wednesday
  { id: 'sch-w1', day: 'Wed', time: '06:00 AM', period: 'Morning', className: 'Heavy Bag Conditioning', coach: 'Maya Lin', spotsLeft: 2, totalSpots: 18, intensity: 'High', level: 'All Levels' },
  { id: 'sch-w2', day: 'Wed', time: '08:00 AM', period: 'Morning', className: 'Boxing Fundamentals', coach: 'Marcus Vance', spotsLeft: 5, totalSpots: 16, intensity: 'Medium', level: 'Beginner' },
  { id: 'sch-w3', day: 'Wed', time: '12:30 PM', period: 'Afternoon', className: "Fighter's Strength & Conditioning", coach: 'Jamal Washington', spotsLeft: 6, totalSpots: 14, intensity: 'High', level: 'Intermediate' },
  { id: 'sch-w4', day: 'Wed', time: '05:30 PM', period: 'Evening', className: 'Heavy Bag Conditioning', coach: 'Maya Lin', spotsLeft: 1, totalSpots: 18, intensity: 'Extreme', level: 'All Levels' },
  { id: 'sch-w5', day: 'Wed', time: '07:00 PM', period: 'Evening', className: 'Championship Sparring', coach: 'Marcus Vance', spotsLeft: 3, totalSpots: 10, intensity: 'Extreme', level: 'Fighter Pro' },

  // Thursday
  { id: 'sch-th1', day: 'Thu', time: '06:30 AM', period: 'Morning', className: 'Boxing Fundamentals', coach: 'Elena Rostova', spotsLeft: 4, totalSpots: 16, intensity: 'Medium', level: 'Beginner' },
  { id: 'sch-th2', day: 'Thu', time: '10:00 AM', period: 'Morning', className: 'Heavy Bag Conditioning', coach: 'Maya Lin', spotsLeft: 8, totalSpots: 18, intensity: 'High', level: 'All Levels' },
  { id: 'sch-th3', day: 'Thu', time: '04:30 PM', period: 'Afternoon', className: 'Youth Gloves Academy', coach: 'Elena Rostova', spotsLeft: 5, totalSpots: 12, intensity: 'Medium', level: 'All Levels' },
  { id: 'sch-th4', day: 'Thu', time: '06:00 PM', period: 'Evening', className: 'Heavy Bag Conditioning', coach: 'Marcus Vance', spotsLeft: 3, totalSpots: 18, intensity: 'High', level: 'All Levels' },
  { id: 'sch-th5', day: 'Thu', time: '07:30 PM', period: 'Evening', className: "Fighter's Strength & Conditioning", coach: 'Jamal Washington', spotsLeft: 2, totalSpots: 14, intensity: 'Extreme', level: 'Intermediate' },

  // Friday
  { id: 'sch-f1', day: 'Fri', time: '06:00 AM', period: 'Morning', className: 'Heavy Bag Conditioning', coach: 'Maya Lin', spotsLeft: 4, totalSpots: 18, intensity: 'High', level: 'All Levels' },
  { id: 'sch-f2', day: 'Fri', time: '08:00 AM', period: 'Morning', className: 'Boxing Fundamentals', coach: 'Elena Rostova', spotsLeft: 7, totalSpots: 16, intensity: 'Medium', level: 'Beginner' },
  { id: 'sch-f3', day: 'Fri', time: '12:00 PM', period: 'Afternoon', className: 'Heavy Bag Conditioning', coach: 'Marcus Vance', spotsLeft: 5, totalSpots: 18, intensity: 'High', level: 'All Levels' },
  { id: 'sch-f4', day: 'Fri', time: '05:30 PM', period: 'Evening', className: 'Friday Night Fight Club Sparring', coach: 'Marcus Vance', spotsLeft: 1, totalSpots: 12, intensity: 'Extreme', level: 'Fighter Pro' },

  // Saturday
  { id: 'sch-sa1', day: 'Sat', time: '08:00 AM', period: 'Morning', className: 'Weekend Bag Blast', coach: 'Maya Lin', spotsLeft: 2, totalSpots: 20, intensity: 'High', level: 'All Levels' },
  { id: 'sch-sa2', day: 'Sat', time: '09:30 AM', period: 'Morning', className: 'Boxing Fundamentals', coach: 'Marcus Vance', spotsLeft: 3, totalSpots: 16, intensity: 'Medium', level: 'Beginner' },
  { id: 'sch-sa3', day: 'Sat', time: '11:00 AM', period: 'Morning', className: 'Open Ring & Pad Work', coach: 'Elena Rostova', spotsLeft: 6, totalSpots: 14, intensity: 'High', level: 'Intermediate' },

  // Sunday
  { id: 'sch-su1', day: 'Sun', time: '09:00 AM', period: 'Morning', className: 'Technical Footwork & Flow', coach: 'Elena Rostova', spotsLeft: 5, totalSpots: 16, intensity: 'Medium', level: 'All Levels' },
  { id: 'sch-su2', day: 'Sun', time: '10:30 AM', period: 'Morning', className: 'Recovery Strength & Mobility', coach: 'Jamal Washington', spotsLeft: 8, totalSpots: 16, intensity: 'Medium', level: 'All Levels' },
];

export const TRAINERS_DATA: TrainerItem[] = [
  {
    id: 'tr-marcus',
    name: 'Marcus "The Anvil" Vance',
    role: 'Head Coach & Founder',
    record: '24-2 Pro Record · 3x Golden Gloves Champion',
    specialty: 'Power mechanics, counter-punching & tactical ring IQ',
    bio: 'With over 18 years of professional pugilism, Marcus created EMMY to strip away the gimmicks and teach authentic, fight-proven boxing to everyday athletes.',
    experienceYears: 18,
    image: '/src/assets/images/emmy_trainer_mitts_1791705750151.jpg',
  },
  {
    id: 'tr-elena',
    name: 'Elena Rostova',
    role: 'Technical Striking Director',
    record: 'European Championship Medalist',
    specialty: 'Footwork geometry, defensive slipping & hand speed',
    bio: 'Elena brings elite Olympic-style technical mastery, focusing on flawless timing, pivot angles, and fluid defensive transitions.',
    experienceYears: 12,
    image: '/src/assets/images/emmy_hero_boxer_1791705725776.jpg',
  },
  {
    id: 'tr-jamal',
    name: 'Jamal Washington, CSCS',
    role: 'Director of Performance & Strength',
    record: 'Certified Strength & Conditioning Specialist',
    specialty: 'Rotational power, kinetic chain velocity, anaerobic capacity',
    bio: 'Jamal has trained world-ranked combat athletes, designing specific strength cycles that build crushing knockout power without compromising agility.',
    experienceYears: 10,
    image: '/src/assets/images/emmy_gym_ring_1791705737410.jpg',
  },
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-trial',
    name: 'First Session Trial',
    priceMonthly: 0,
    priceAnnualMonthly: 0,
    period: 'one-time',
    tagline: 'Experience the EMMY standard without commitment.',
    features: [
      '1 Full 55-minute coach-led session',
      'Complimentary leather glove rental',
      'Hand wrapping tutorial & wrist prep',
      'Gym floor & locker room access',
      'Post-workout recovery assessment',
    ],
    ctaLabel: 'Claim Free Session →',
  },
  {
    id: 'plan-contender',
    name: 'The Contender',
    priceMonthly: 129,
    priceAnnualMonthly: 99,
    period: '/month',
    tagline: 'Ideal for building serious athletic momentum.',
    features: [
      '3 Coach-led classes per week (12/mo)',
      'Unlimited open gym & heavy bag access',
      'EMMY mobile locker pass & reservation',
      'Discounts on EMMY apparel & fight gear',
      'Standard locker room & sauna access',
    ],
    ctaLabel: 'Start Contender Pass',
  },
  {
    id: 'plan-championship',
    name: 'Championship All-Access',
    priceMonthly: 189,
    priceAnnualMonthly: 149,
    period: '/month',
    popular: true,
    tagline: 'Our premier tier for dedicated athletes seeking transformation.',
    features: [
      'Unlimited coach-led classes across all 5 programs',
      'Full open gym & heavy bag alleys (5:30 AM - 10:00 PM)',
      '1 Monthly 45-min 1-on-1 mitt work session',
      'Full Infrared Sauna & Cold Plunge access',
      'Priority class waitlist booking window',
      'Guest pass privilege (1 guest per month)',
    ],
    ctaLabel: 'Join Championship Tier',
  },
  {
    id: 'plan-fighter-pro',
    name: 'Fighter Pro Elite',
    priceMonthly: 289,
    priceAnnualMonthly: 239,
    period: '/month',
    tagline: 'Maximum coaching attention for competitors and elite athletes.',
    features: [
      'Everything in Championship All-Access',
      '4 Monthly private 1-on-1 technical sessions',
      'Championship sparring ring access & cornering',
      'Custom strength & conditioning programming',
      'Reserved private equipment locker',
      'EMMY Pro Fight Pack (Gloves, wraps & kit)',
    ],
    ctaLabel: 'Apply for Fighter Pro',
  },
];

export const AMENITIES = [
  {
    title: 'Regulation 20ft Competition Ring',
    description: 'Elevated canvas ring built to exact professional championship specifications for authentic footwork and sparring.',
    tag: 'Championship Canvas',
  },
  {
    title: '30+ Custom Leather Heavy Bags',
    description: 'Equipped with custom 100lb and 150lb water-core and leather bags calibrated to absorb shock and protect joint health.',
    tag: 'Pro Bag Alley',
  },
  {
    title: 'Dedicated S&C Power Bay',
    description: 'Eleiko Olympic barbells, curved Woodway treadmills, Rogue echo bikes, and turf sprint track for anaerobic conditioning.',
    tag: 'Athletic Performance',
  },
  {
    title: 'Infrared Sauna & Contrast Plunge',
    description: 'Accelerate muscular recovery and flush inflammation with dry infrared heat and 48°F cold therapy tubs.',
    tag: 'Hydro & Thermal Recovery',
  },
];

export const REVIEWS = [
  {
    quote: "I was intimidated by boxing gyms until I walked into EMMY. Marcus and Elena treat technique like an exact science. I lost 24 lbs in 4 months and my mental focus at work has never been higher.",
    author: "David Chen",
    role: "Member for 14 Months",
    stat: "-24 lbs & 3x/week regular",
  },
  {
    quote: "No fluffy fitness dance routines here. Real heavy bag work, real slips, real combinations. The coaches correct your guard within 30 seconds of class. Best workout in the city by a mile.",
    author: "Samantha Ward",
    role: "Amateur Contender & Member",
    stat: "Completed 180+ Sessions",
  },
  {
    quote: "EMMY gave me back my athletic drive after years at generic commercial gyms. The community pushes you through round 10 when your lungs are burning. You leave feeling invincible.",
    author: "Tyrone Miller",
    role: "Member for 9 Months",
    stat: "Championship Tier Member",
  },
];
