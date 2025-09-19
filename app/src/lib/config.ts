/**
 * Centralized configuration management for environment variables
 * Provides type-safe access to environment variables with validation
 */

export interface AppConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
}

/**
 * Application configuration object with environment variable access
 */
export const config: AppConfig = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
};

/**
 * Validation function to ensure all required environment variables are present
 * @throws Error if any required environment variables are missing
 */
export function validateConfig(): void {
  const missingVars: string[] = [];

  if (!config.supabase.url) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
  }

  if (!config.supabase.anonKey) {
    missingVars.push('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}. ` +
      'Please check your .env.local file and ensure all variables are set.'
    );
  }
}

/**
 * Get Supabase configuration with validation
 * @returns Validated Supabase configuration
 * @throws Error if configuration is invalid
 */
export function getSupabaseConfig() {
  validateConfig();
  return config.supabase;
}

/**
 * Check if the application is properly configured
 * @returns boolean indicating if all required environment variables are present
 */
export function isConfigValid(): boolean {
  try {
    validateConfig();
    return true;
  } catch {
    return false;
  }
}
