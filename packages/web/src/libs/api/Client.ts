interface ClientConfig {
  baseURL?: string;
}

export class Client {
  private readonly baseURL: string;

  constructor(config: ClientConfig = {}) {
    this.baseURL = config.baseURL || '';
  }

  private buildURL(path: string): string {
    return `${this.baseURL}/${path}`.replace(/([^:]\/)\/+/g, '$1'); // remove duplicate slashes
  }

  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(this.buildURL(url), {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    const data = await response.json();
    return data;
  }

  async get() {
    return;
  }

  async post() {
    return;
  }

  async put() {
    return;
  }

  async delete() {
    return;
  }
}
