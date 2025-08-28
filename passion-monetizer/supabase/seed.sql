-- Example seed data; adjust IDs after creating auth users
insert into public.profiles (id, username, display_name, avatar_url, bio, links)
values
  ('00000000-0000-0000-0000-000000000001','alice','Alice','', 'Tech writer', '{"twitter":"https://x.com/alice"}'),
  ('00000000-0000-0000-0000-000000000002','bob','Bob','', 'Gadgets and deals', '{"website":"https://bob.dev"}');

insert into public.articles (author_id, title, slug, content_markdown, tags, published, read_time_minutes)
values
  ('00000000-0000-0000-0000-000000000001','Welcome to Passion Monetizer','welcome-to-passion-monetizer','# Hello world', '{tech}', true, 2),
  ('00000000-0000-0000-0000-000000000002','Top 5 budget keyboards','top-5-budget-keyboards','Content here', '{hardware,peripherals}', true, 4);
