INSERT INTO parties (name, description)
VALUES
  ('JS Juggernauts', 'Eat breathe and sleep javascript'),
  ('Heroes of HTML', 'HTML in seconds'),
  ('Git gurus', 'Git masters');

INSERT INTO candidates (first_name, last_name, party_id, indsutry_connected)
VALUES 
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', NULL, 1);
