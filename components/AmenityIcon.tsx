import React from 'react';
import {
  Wind,
  Sparkles,
  Flame,
  Bath,
  WashingMachine,
  Shirt,
  Bed,
  Tv,
  Gamepad2,
  Baby,
  Dice5,
  Fan,
  Volume2,
  Bell,
  AlertTriangle,
  ShieldAlert,
  PlusSquare,
  Wifi,
  Briefcase,
  Utensils,
  Refrigerator,
  Microwave,
  ChefHat,
  Coffee,
  GlassWater,
  Key,
  DoorOpen,
  Trees,
  Compass,
  Car,
  Dog,
  CalendarDays,
  KeyRound,
  EyeOff,
  Thermometer,
  Shield,
  HelpCircle
} from 'lucide-react';

interface AmenityIconProps {
  name: string;
  className?: string;
}

export function AmenityIcon({ name, className = "w-5 h-5 text-brand-primary" }: AmenityIconProps) {
  const n = name.toLowerCase().trim();

  // Bathroom
  if (n.includes('hairdryer')) return <Wind className={className} />;
  if (n.includes('cleaning products')) return <Sparkles className={className} />;
  if (n.includes('shampoo') || n.includes('shower gel')) return <Sparkles className={className} />;
  if (n.includes('hot water')) return <Flame className={className} />;
  if (n.includes('bath') || n.includes('shower')) return <Bath className={className} />;

  // Bedroom and laundry
  if (n.includes('washing machine')) return <WashingMachine className={className} />;
  if (n.includes('dryer')) return <Wind className={className} />;
  if (n.includes('essentials')) return <Shirt className={className} />;
  if (n.includes('hangers')) return <Shirt className={className} />;
  if (n.includes('bed linen') || n.includes('cotton linen') || n.includes('bed')) return <Bed className={className} />;
  if (n.includes('blinds') || n.includes('darkening')) return <EyeOff className={className} />;
  if (n.includes('iron')) return <Wind className={className} />;
  if (n.includes('rack') || n.includes('wardrobe')) return <Shirt className={className} />;

  // Entertainment
  if (n.includes('tv')) return <Tv className={className} />;
  if (n.includes('pool table')) return <Gamepad2 className={className} />;

  // Family
  if (n.includes('cot') || n.includes('crib')) return <Baby className={className} />;
  if (n.includes('board games')) return <Dice5 className={className} />;

  // Heating & cooling
  if (n.includes('fan')) return <Fan className={className} />;
  if (n.includes('heating')) return <Flame className={className} />;
  if (n.includes('air conditioning') || n.includes('ac')) return <Thermometer className={className} />;

  // Home safety
  if (n.includes('noise')) return <Volume2 className={className} />;
  if (n.includes('smoke')) return <Bell className={className} />;
  if (n.includes('carbon monoxide') || n.includes('co alarm')) return <AlertTriangle className={className} />;
  if (n.includes('fire extinguisher')) return <ShieldAlert className={className} />;
  if (n.includes('first aid')) return <PlusSquare className={className} />;

  // Internet & office
  if (n.includes('wifi')) return <Wifi className={className} />;
  if (n.includes('workspace') || n.includes('office')) return <Briefcase className={className} />;

  // Kitchen & dining
  if (n.includes('kitchen') || n.includes('cook')) return <Utensils className={className} />;
  if (n.includes('mini fridge') || n.includes('fridge') || n.includes('refrigerator')) return <Refrigerator className={className} />;
  if (n.includes('microwave')) return <Microwave className={className} />;
  if (n.includes('cooking basics') || n.includes('crockery') || n.includes('cutlery') || n.includes('pots')) return <ChefHat className={className} />;
  if (n.includes('coffee') || n.includes('kettle')) return <Coffee className={className} />;
  if (n.includes('cooker') || n.includes('oven')) return <Flame className={className} />;
  if (n.includes('wine glasses') || n.includes('glass')) return <GlassWater className={className} />;
  if (n.includes('toaster') || n.includes('baking') || n.includes('blender') || n.includes('rice')) return <Utensils className={className} />;
  if (n.includes('table')) return <Utensils className={className} />;

  // Location features
  if (n.includes('private entrance')) return <Key className={className} />;
  if (n.includes('separate street')) return <DoorOpen className={className} />;

  // Outdoor
  if (n.includes('patio') || n.includes('balcony')) return <Trees className={className} />;
  if (n.includes('furniture') || n.includes('dining area')) return <Compass className={className} />;
  if (n.includes('grill') || n.includes('bbq')) return <Flame className={className} />;

  // Parking
  if (n.includes('parking')) return <Car className={className} />;

  // Services
  if (n.includes('pets') || n.includes('dog') || n.includes('assistance animals')) return <Dog className={className} />;
  if (n.includes('long-term') || n.includes('28 days')) return <CalendarDays className={className} />;
  if (n.includes('self check-in') || n.includes('keypad')) return <KeyRound className={className} />;
  if (n.includes('housekeeping')) return <Sparkles className={className} />;

  // Fallbacks
  if (n.includes('camera') || n.includes('security')) return <Shield className={className} />;

  return <HelpCircle className={className} />;
}
