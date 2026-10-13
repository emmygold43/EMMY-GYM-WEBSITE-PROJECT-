export interface ProgramItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  intensity: number; // 1-5
  durationMinutes: number;
  caloriesBurn: string;
  targetFocus: string[];
  level: 'All Levels' | 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface ClassScheduleItem {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  className: string;
  coach: string;
  spotsLeft: number;
  totalSpots: number;
  intensity: 'Medium' | 'High' | 'Extreme';
  level: 'All Levels' | 'Beginner' | 'Intermediate' | 'Fighter Pro';
}

export interface TrainerItem {
  id: string;
  name: string;
  role: string;
  record: string;
  specialty: string;
  bio: string;
  experienceYears: number;
  image: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  priceMonthly: number;
  priceAnnualMonthly: number;
  period: string;
  popular?: boolean;
  tagline: string;
  features: string[];
  ctaLabel: string;
}
