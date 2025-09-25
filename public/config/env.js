(function(){
  window.__ENV__ = Object.assign({
    API_URL: '',
    SUPABASE_URL: '',
    SUPABASE_ANON_KEY: '',
    GEMINI_API_KEY: '',
    FEATURE_FLAGS: {
      ENABLE_AI: true,
      ENABLE_EXPORTS: true
    }
  }, window.__ENV__ || {});
})();


