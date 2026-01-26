import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey);
  // throw new Error('Missing Supabase environment variables. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Auth Functions
export const loginAdmin = (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const logoutAdmin = () => {
  return supabase.auth.signOut();
};

export const onAuthChange = (callback: (user: any) => void) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
  return subscription;
};

// Projects Functions
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const subscribeToProjects = (callback: (projects: any[]) => void) => {
  const channel = supabase
    .channel('projects-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'projects' },
      async () => {
        const projects = await getProjects();
        callback(projects);
      }
    )
    .subscribe();

  return channel;
};

export const addProject = async (projectData: any) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([{ ...projectData, created_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateProject = async (projectId: string, projectData: any) => {
  // Get old image to check for changes
  const { data: oldData } = await supabase
    .from('projects')
    .select('image')
    .eq('id', projectId)
    .single();

  const { data, error } = await supabase
    .from('projects')
    .update({ ...projectData, updated_at: new Date().toISOString() })
    .eq('id', projectId)
    .select()
    .single();

  if (error) throw error;

  // Delete old image if it changed
  if (oldData?.image && oldData.image !== projectData.image) {
    await deleteFileFromUrl(oldData.image);
  }

  return data;
};

export const deleteProject = async (projectId: string) => {
  // Get image url before deleting
  const { data } = await supabase
    .from('projects')
    .select('image')
    .eq('id', projectId)
    .single();

  if (data?.image) {
    await deleteFileFromUrl(data.image);
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', projectId);

  if (error) throw error;
};

// News Functions
export const getNews = async () => {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('date', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const subscribeToNews = (callback: (news: any[]) => void) => {
  const channel = supabase
    .channel('news-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'news' },
      async () => {
        const news = await getNews();
        callback(news);
      }
    )
    .subscribe();

  return channel;
};

export const addNews = async (newsData: any) => {
  const { data, error } = await supabase
    .from('news')
    .insert([{ ...newsData, created_at: new Date().toISOString() }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateNews = async (newsId: string, newsData: any) => {
  const { data: oldData } = await supabase
    .from('news')
    .select('image')
    .eq('id', newsId)
    .single();

  const { data, error } = await supabase
    .from('news')
    .update({ ...newsData, updated_at: new Date().toISOString() })
    .eq('id', newsId)
    .select()
    .single();

  if (error) throw error;

  if (oldData?.image && oldData.image !== newsData.image) {
    await deleteFileFromUrl(oldData.image);
  }

  return data;
};

export const deleteNews = async (newsId: string) => {
  const { data } = await supabase
    .from('news')
    .select('image')
    .eq('id', newsId)
    .single();

  if (data?.image) {
    await deleteFileFromUrl(data.image);
  }

  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', newsId);

  if (error) throw error;
};

// Reorder Functions
export const updateProjectsOrder = async (projectsOrder: { id: string; display_order: number }[]) => {
  const updates = projectsOrder.map(({ id, display_order }) =>
    supabase
      .from('projects')
      .update({ display_order })
      .eq('id', id)
  );

  const results = await Promise.all(updates);
  const errors = results.filter((r) => r.error);

  if (errors.length > 0) {
    throw errors[0].error;
  }
};

export const updateNewsOrder = async (newsOrder: { id: string; display_order: number }[]) => {
  const updates = newsOrder.map(({ id, display_order }) =>
    supabase
      .from('news')
      .update({ display_order })
      .eq('id', id)
  );

  const results = await Promise.all(updates);
  const errors = results.filter((r) => r.error);

  if (errors.length > 0) {
    throw errors[0].error;
  }
};

// Subscribers Functions
export const subscribeToNewsletter = async (email: string) => {
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getSubscribers = async () => {
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const deleteSubscriber = async (id: string) => {
  const { error } = await supabase
    .from('subscribers')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Proposal Functions
export const submitProposal = async (proposal: any) => {
  const { data, error } = await supabase
    .from('proposals')
    .insert([{ ...proposal }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getProposals = async () => {
  const { data, error } = await supabase
    .from('proposals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const deleteProposal = async (id: string) => {
  const { error } = await supabase
    .from('proposals')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const updateProposalStatus = async (id: string, status: string) => {
  const { error } = await supabase
    .from('proposals')
    .update({ status })
    .eq('id', id);

  if (error) throw error;
};

// Event Functions
export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const getEventById = async (id: string) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const addEvent = async (event: any) => {
  const { data, error } = await supabase
    .from('events')
    .insert([event])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateEvent = async (id: string, event: any) => {
  const { data: oldData } = await supabase
    .from('events')
    .select('banner')
    .eq('id', id)
    .single();

  const { data, error } = await supabase
    .from('events')
    .update(event)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;

  if (oldData?.banner && oldData.banner !== event.banner) {
    await deleteFileFromUrl(oldData.banner);
  }

  return data;
};

export const deleteEvent = async (id: string) => {
  const { data } = await supabase
    .from('events')
    .select('banner')
    .eq('id', id)
    .single();

  if (data?.banner) {
    await deleteFileFromUrl(data.banner);
  }

  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Message Functions
export const sendMessage = async (message: any) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([message])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getMessages = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const deleteMessage = async (id: string) => {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const markMessageRead = async (id: string) => {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', id);

  if (error) throw error;
};

// File Upload Functions
export const deleteFileFromUrl = async (url: string) => {
  if (!url) return;
  // Basic check if it likely belongs to Supabase or is relative
  if (!url.includes('storage/v1/object/public')) return;

  try {
    // URL format: .../storage/v1/object/public/{bucket}/{folder}/{file}
    const parts = url.split('/storage/v1/object/public/');
    if (parts.length < 2) return;

    const pathPart = parts[1]; // {bucket}/{folder}/{file}
    const firstSlash = pathPart.indexOf('/');

    if (firstSlash === -1) return;

    const bucket = pathPart.substring(0, firstSlash);
    const path = pathPart.substring(firstSlash + 1);

    const { error } = await supabase.storage
      .from(bucket)
      .remove([decodeURIComponent(path)]);

    if (error) {
      console.error("Error deleting file from storage:", error);
    }
  } catch (err) {
    console.error("Exception deleting file:", err);
  }
};

// File Upload Functions
// File Upload Functions
export const uploadImage = async (file: File, bucketName: string = 'images') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = fileName; // Upload directly to bucket root or specific folder if needed, but not repeating bucketName

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);

  if (uploadError) {
    console.error(`Error uploading to bucket '${bucketName}':`, uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return data.publicUrl;
};
