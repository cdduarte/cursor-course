import validator from 'validator';

// Input validation and sanitization utilities for security

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param content - Raw HTML content to sanitize
 * @returns Sanitized HTML content
 */
export function sanitizeHtml(content: string): string {
  // Always use HTML entity encoding for consistent server/client behavior
  // This avoids hydration mismatches while maintaining security
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize plain text content for display
 * @param content - Raw text content
 * @returns Sanitized text content
 */
export function sanitizeText(content: string): string {
  if (typeof content !== 'string') {
    return '';
  }
  
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validate and sanitize user chat input
 * @param input - Raw user input
 * @returns Object with validation result and sanitized input
 */
export function validateChatInput(input: string): {
  isValid: boolean;
  sanitized: string;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check if input is string
  if (typeof input !== 'string') {
    return {
      isValid: false,
      sanitized: '',
      errors: ['Input must be a string']
    };
  }
  
  // Trim whitespace
  const trimmed = input.trim();
  
  // Check length constraints
  if (trimmed.length === 0) {
    errors.push('Input cannot be empty');
  }
  
  if (trimmed.length > 4000) {
    errors.push('Input too long (maximum 4000 characters)');
  }
  
  // Check for potentially malicious patterns
  const maliciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi,
    /vbscript:/gi
  ];
  
  for (const pattern of maliciousPatterns) {
    if (pattern.test(trimmed)) {
      errors.push('Input contains potentially malicious content');
      break;
    }
  }
  
  // Return trimmed content - React will handle escaping when rendering
  return {
    isValid: errors.length === 0,
    sanitized: trimmed,
    errors
  };
}

/**
 * Validate image generation prompt
 * @param prompt - Image generation prompt
 * @returns Object with validation result and sanitized prompt
 */
export function validateImagePrompt(prompt: string): {
  isValid: boolean;
  sanitized: string;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check if input is string
  if (typeof prompt !== 'string') {
    return {
      isValid: false,
      sanitized: '',
      errors: ['Prompt must be a string']
    };
  }
  
  // Trim whitespace
  const trimmed = prompt.trim();
  
  // Check length constraints for image prompts
  if (trimmed.length === 0) {
    errors.push('Image prompt cannot be empty');
  }
  
  if (trimmed.length > 1000) {
    errors.push('Image prompt too long (maximum 1000 characters)');
  }
  
  // Check for inappropriate content patterns
  const inappropriatePatterns = [
    /\b(nude|naked|explicit|sexual|porn|xxx)\b/gi,
    /\b(violence|kill|murder|death|blood)\b/gi,
    /\b(hate|racist|nazi|terrorism)\b/gi
  ];
  
  for (const pattern of inappropriatePatterns) {
    if (pattern.test(trimmed)) {
      errors.push('Image prompt contains inappropriate content');
      break;
    }
  }
  
  // Check for injection attempts
  const injectionPatterns = [
    /\b(ignore|forget|disregard)\s+(previous|above|system|instructions?)\b/gi,
    /\b(act|behave|pretend)\s+as\s+if\b/gi,
    /\b(jailbreak|bypass|override)\b/gi
  ];
  
  for (const pattern of injectionPatterns) {
    if (pattern.test(trimmed)) {
      errors.push('Image prompt contains potential injection attempt');
      break;
    }
  }
  
  // Return trimmed content - React will handle escaping when rendering
  return {
    isValid: errors.length === 0,
    sanitized: trimmed,
    errors
  };
}

/**
 * Validate URL for image display
 * @param url - Image URL to validate
 * @returns Whether URL is safe for display
 */
export function validateImageUrl(url: string): boolean {
  if (typeof url !== 'string') {
    return false;
  }
  
  // Check if it's a valid URL
  if (!validator.isURL(url, {
    protocols: ['https'],
    require_protocol: true,
    require_host: true,
    require_valid_protocol: true
  })) {
    return false;
  }
  
  // Allow only specific trusted domains for images
  const trustedDomains = [
    'oaidalleapiprodscus.blob.core.windows.net', // OpenAI DALL-E
    'cdn.openai.com', // OpenAI CDN
    'images.openai.com' // OpenAI Images
  ];
  
  try {
    const urlObj = new URL(url);
    return trustedDomains.includes(urlObj.hostname);
  } catch {
    return false;
  }
}

/**
 * Sanitize API response content before display
 * @param content - API response content
 * @returns Sanitized content safe for display
 */
export function sanitizeApiResponse(content: string): string {
  if (typeof content !== 'string') {
    return '';
  }
  
  // Remove any potential script tags or dangerous HTML
  const sanitized = sanitizeHtml(content);
  
  // Additional sanitization for API responses
  return sanitized
    .replace(/data:image\/[^;]+;base64,/gi, '') // Remove base64 data URLs
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/vbscript:/gi, ''); // Remove vbscript: URLs
}

/**
 * Rate limiting helper for client-side usage tracking
 */
export class ClientRateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  /**
   * Check if action is allowed based on rate limits
   * @param key - Unique key for the action (e.g., 'chat', 'image')
   * @param maxRequests - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns Whether action is allowed
   */
  isAllowed(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the time window
    const validRequests = requests.filter(time => now - time < windowMs);
    
    // Check if we're under the limit
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }
  
  /**
   * Get remaining requests for a key
   * @param key - Unique key for the action
   * @param maxRequests - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns Number of remaining requests
   */
  getRemaining(key: string, maxRequests: number, windowMs: number): number {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    const validRequests = requests.filter(time => now - time < windowMs);
    
    return Math.max(0, maxRequests - validRequests.length);
  }
}

// Export singleton rate limiter instance
export const rateLimiter = new ClientRateLimiter();
