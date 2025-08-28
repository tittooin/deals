-- Enable extensions
create extension if not exists pgcrypto;

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique,
  display_name text,
  avatar_url text,
  bio text,
  links jsonb,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;
create policy "profiles are viewable by everyone" on public.profiles for select using ( true );
create policy "users can insert own profile" on public.profiles for insert with check ( auth.uid() = id );
create policy "users can update own profile" on public.profiles for update using ( auth.uid() = id );

-- Articles
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  slug text not null unique,
  cover_image_url text,
  content_json jsonb,
  content_markdown text,
  tags text[] default '{}',
  read_time_minutes int default 1,
  published boolean default false,
  published_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  likes_count int default 0,
  comments_count int default 0,
  views_count int default 0
);

alter table public.articles enable row level security;
create policy "articles are viewable if published or owner" on public.articles for select using ( published or auth.uid() = author_id );
create policy "users can insert their articles" on public.articles for insert with check ( auth.uid() = author_id );
create policy "users can update own articles" on public.articles for update using ( auth.uid() = author_id );

-- Follows
create table if not exists public.follows (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (follower_id, following_id)
);

alter table public.follows enable row level security;
create policy "follows readable by all" on public.follows for select using ( true );
create policy "insert follows if authed" on public.follows for insert with check ( auth.uid() = follower_id );
create policy "delete own follows" on public.follows for delete using ( auth.uid() = follower_id );

-- Likes
create table if not exists public.article_likes (
  user_id uuid references public.profiles(id) on delete cascade,
  article_id uuid references public.articles(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (user_id, article_id)
);
alter table public.article_likes enable row level security;
create policy "likes readable by all" on public.article_likes for select using ( true );
create policy "insert like if authed" on public.article_likes for insert with check ( auth.uid() = user_id );
create policy "delete own like" on public.article_likes for delete using ( auth.uid() = user_id );

-- Bookmarks
create table if not exists public.article_bookmarks (
  user_id uuid references public.profiles(id) on delete cascade,
  article_id uuid references public.articles(id) on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (user_id, article_id)
);
alter table public.article_bookmarks enable row level security;
create policy "bookmarks readable by all" on public.article_bookmarks for select using ( true );
create policy "insert bookmark if authed" on public.article_bookmarks for insert with check ( auth.uid() = user_id );
create policy "delete own bookmark" on public.article_bookmarks for delete using ( auth.uid() = user_id );

-- Comments
create table if not exists public.article_comments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  article_id uuid references public.articles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);
alter table public.article_comments enable row level security;
create policy "comments readable by all" on public.article_comments for select using ( true );
create policy "insert comment if authed" on public.article_comments for insert with check ( auth.uid() = user_id );
create policy "delete own comment" on public.article_comments for delete using ( auth.uid() = user_id );

-- Messages
create table if not exists public.chat_rooms (
  id uuid primary key default gen_random_uuid(),
  name text,
  is_group boolean default false,
  created_at timestamp with time zone default now()
);

create table if not exists public.chat_room_members (
  room_id uuid references public.chat_rooms(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  last_read_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  primary key (room_id, user_id)
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references public.chat_rooms(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

alter table public.chat_rooms enable row level security;
alter table public.chat_room_members enable row level security;
alter table public.chat_messages enable row level security;

create policy "rooms readable by members" on public.chat_rooms for select using ( exists (select 1 from public.chat_room_members m where m.room_id = id and m.user_id = auth.uid()) );
create policy "members readable by members" on public.chat_room_members for select using ( exists (select 1 from public.chat_room_members m where m.room_id = room_id and m.user_id = auth.uid()) );
create policy "messages readable by members" on public.chat_messages for select using ( exists (select 1 from public.chat_room_members m where m.room_id = room_id and m.user_id = auth.uid()) );
create policy "insert message if member" on public.chat_messages for insert with check ( exists (select 1 from public.chat_room_members m where m.room_id = room_id and m.user_id = auth.uid()) );
