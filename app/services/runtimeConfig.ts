type EnvValue = string | number | boolean | Record<string, any>;

const getWindowEnv = (): Record<string, EnvValue> => {
  if (typeof window !== 'undefined' && (window as any).__ENV__) return (window as any).__ENV__;
  return {};
};

export const getEnv = () => {
  const w = getWindowEnv();
  const vite = (import.meta as any).env || {};
  return {
    apiUrl: (w.API_URL || vite.VITE_API_URL || '') as string,
    supabaseUrl: (w.SUPABASE_URL || vite.VITE_SUPABASE_URL || '') as string,
    supabaseAnonKey: (w.SUPABASE_ANON_KEY || vite.VITE_SUPABASE_ANON_KEY || '') as string,
    geminiApiKey: (w.GEMINI_API_KEY || vite.VITE_GEMINI_API_KEY || '') as string,
    featureFlags: (w.FEATURE_FLAGS || vite.VITE_FEATURE_FLAGS || { ENABLE_AI: true, ENABLE_EXPORTS: true }) as Record<string, any>
  };
};


