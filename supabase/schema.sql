-- ============================================================
-- BARRACUDA RESTO PUB (WUSE 2, ABUJA, NIGERIA)
-- SUPABASE POSTGRESQL PRODUCTION DATABASE SCHEMA & RLS POLICIES
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. RESERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_ref TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  guests_count INTEGER NOT NULL CHECK (guests_count >= 1 AND guests_count <= 50),
  seating_area TEXT NOT NULL DEFAULT 'Main Lounge',
  occasion TEXT,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('Africa/Lagos'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('Africa/Lagos'::text, now())
);

-- 2. CONTACT ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('Africa/Lagos'::text, now())
);

-- 3. MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Grills & Suya',
    'Small Plates',
    'Main Meals',
    'Signature Cocktails',
    'Spirits & Champagne',
    'Beer & Refreshments'
  )),
  sub_category TEXT,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_special BOOLEAN NOT NULL DEFAULT false,
  is_spicy BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  event_date DATE NOT NULL,
  day_of_week TEXT NOT NULL,
  event_time TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  dress_code TEXT,
  entry_type TEXT NOT NULL DEFAULT 'Table Reservation',
  ticket_price NUMERIC(10, 2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'past')),
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. GALLERY ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'Ambiance & VIP',
    'Culinary & Grills',
    'Mixology & Bar',
    'Weekend Energy'
  )),
  image_url TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. BUSINESS SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.business_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  name TEXT NOT NULL DEFAULT 'Barracuda Resto Pub',
  headline TEXT NOT NULL DEFAULT 'Good Food. Great Drinks. Better Nights.',
  subheadline TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT 'Adetokunbo Ademola Crescent, Wuse 2, Abuja, Nigeria',
  phone TEXT NOT NULL DEFAULT '+234 912 235 6336',
  whatsapp TEXT NOT NULL DEFAULT '2349122356336',
  instagram TEXT NOT NULL DEFAULT 'barracuda_restpub',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a reservation enquiry
CREATE POLICY "Public insert reservations" ON public.reservations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Authenticated staff/admin can view and update reservations
CREATE POLICY "Admin select reservations" ON public.reservations
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Admin update reservations" ON public.reservations
  FOR UPDATE TO authenticated
  USING (true);

-- Anyone can submit a contact enquiry
CREATE POLICY "Public insert enquiries" ON public.enquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin select enquiries" ON public.enquiries
  FOR SELECT TO authenticated
  USING (true);

-- Public can read menu items, events, gallery, and business settings
CREATE POLICY "Public read menu_items" ON public.menu_items
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admin manage menu_items" ON public.menu_items
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Public read events" ON public.events
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admin manage events" ON public.events
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Public read gallery" ON public.gallery_items
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admin manage gallery" ON public.gallery_items
  FOR ALL TO authenticated
  USING (true);

CREATE POLICY "Public read settings" ON public.business_settings
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Admin update settings" ON public.business_settings
  FOR ALL TO authenticated
  USING (true);
