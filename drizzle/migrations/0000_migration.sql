DROP POLICY IF EXISTS "public read car images" ON storage.objects;
CREATE POLICY "read images of listed cars" ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'car-images' AND EXISTS (SELECT 1 FROM public.cars c WHERE storage.objects.name = ANY(c.fotos)));
CREATE POLICY "admins read all car images" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'car-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));