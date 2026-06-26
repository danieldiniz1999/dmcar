
CREATE POLICY "public read car images" ON storage.objects
  FOR SELECT USING (bucket_id = 'car-images');

CREATE POLICY "admins upload car images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins update car images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins delete car images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'));
