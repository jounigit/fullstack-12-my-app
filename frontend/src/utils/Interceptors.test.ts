/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, beforeEach, expect, vi } from 'vitest';
import type { AxiosError, AxiosRequestConfig } from 'axios';

// Capture interceptor callbacks deterministically.
let requestHandler: ((c: AxiosRequestConfig) => any) | undefined;
let responseHandler: ((e: AxiosError) => any) | undefined;

vi.mock('axios', () => {
  return {
    default: {
      create: () => {
        return {
          interceptors: {
            request: {
              use: (fulfilled: any) => {
                requestHandler = fulfilled;
              },
            },
            response: {
              use: (_fulfilled: any, rejected: any) => {
                responseHandler = rejected;
              },
            },
          },
        };
      },
    },
  };
});

vi.mock('react-hot-toast', () => ({
  default: {
    error: vi.fn(),
  },
}));

const toast = (await import('react-hot-toast')).default as unknown as {
  error: ReturnType<typeof vi.fn>;
};

// vitest environment may not have localStorage.
const setToken = (token: string | null) => {
  const ls =
    typeof localStorage !== 'undefined'
      ? localStorage
      : ((globalThis as any).localStorage ?? {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        });

  if (typeof localStorage === 'undefined') {
    (globalThis as any).localStorage = ls;
  }

  if (token) ls.setItem('auth_token', token);
  else ls.removeItem('auth_token');
};

describe('API Interceptors', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    requestHandler = undefined;
    responseHandler = undefined;
    setToken(null);

    // Import after mocking axios so axiosInstance installs interceptors
    // using the mocked axios.create().
    await import('./axiosInstance');
  });

  it('adds Authorization header if token exists', () => {
    setToken('test_token');

    const config: any = { headers: {} };
    expect(requestHandler).toBeDefined();

    const result = requestHandler!(config);
    expect(result.headers.Authorization).toBe('Bearer test_token');
  });

  it('handles 400 validation error', async () => {
    const err: any = {
      response: {
        status: 400,
        data: { message: 'Validation failed' },
      },
    };

    expect(responseHandler).toBeDefined();
    await responseHandler!(err);

    expect(toast.error).toHaveBeenCalledWith(
      'Validation Error: Validation failed'
    );
  });

  it('handles 401 unauthorized error', async () => {
    const err: any = { response: { status: 401 } };

    expect(responseHandler).toBeDefined();
    await responseHandler!(err);

    expect(toast.error).toHaveBeenCalledWith(
      'Unauthorized: Please log in to access this resource.'
    );
  });

  it('handles 403 forbidden error', async () => {
    const err: any = { response: { status: 403 } };

    expect(responseHandler).toBeDefined();
    await responseHandler!(err);

    expect(toast.error).toHaveBeenCalledWith(
      'Forbidden: You do not have permission to perform this action.'
    );
  });

  it('handles 404 not found error', async () => {
    const err: any = { response: { status: 404 } };

    expect(responseHandler).toBeDefined();
    await responseHandler!(err);

    expect(toast.error).toHaveBeenCalledWith(
      'Not Found: The requested resource could not be found.'
    );
  });

  it('handles 500 server error', async () => {
    const err: any = { response: { status: 500 } };

    expect(responseHandler).toBeDefined();
    await responseHandler!(err);

    expect(toast.error).toHaveBeenCalledWith(
      'Server Error: An unexpected error occurred. Please try again later.'
    );
  });

  it('handles network error', async () => {
    const err: any = { request: {} };

    expect(responseHandler).toBeDefined();
    await responseHandler!(err);

    expect(toast.error).toHaveBeenCalledWith(
      'Network Error: Unable to reach the server. Please check your connection.'
    );
  });

  it('handles generic error', async () => {
    const err: any = { message: 'Generic error' };

    expect(responseHandler).toBeDefined();

    // axiosInstance calls toast.error and then returns Promise.reject(error)
    // for the response interceptor.
    await expect(responseHandler!(err)).rejects.toEqual(err);

    expect(toast.error).toHaveBeenCalledWith('Error: Generic error');
  });
});

