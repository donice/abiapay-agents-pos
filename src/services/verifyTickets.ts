const base_url = process.env.NEXT_PUBLIC_APP_URL;
const ibm = process.env.NEXT_PUBLIC_IBM;

export interface VerifyTicketPayload {
  agentEmail: string;
  referenceID: string;
}

export const verifyTicket = async (requestData: VerifyTicketPayload) => {
  try {
    const res = await https(
      `${base_url}verifyTicket`,
      {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
          "X-IBM-Client-Id": ibm as string,
        },
      }
    );

    return res;
  } catch (error: any) {
    return {
      error: error.data
    }
  }
};

interface FetchOptions extends RequestInit {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
}
interface CustomError extends Error {
  data?: any;
}
/** This uses fetch api to make http requests and mimics axios */
export async function https<T>(
  url: string = base_url as string,
  options: FetchOptions,
  params?: Record<string, string>
): Promise<T> {
  if (params) {
    if (options.method === "GET" || options.method === "HEAD") {
      const urlParams = new URLSearchParams(params);
      url += `?${urlParams.toString()}`;
    }
  }

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      // Optionally handle non-2xx responses
      const error: CustomError = new Error(`HTTP error! status: ${res.status}`);
      error.data = await res.json();
      throw error;
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    // Improved error handling
    if (error instanceof Error) {
      // console.log({ u: error.stack });
      // console.error(`Fetch error: ${error.message}`);
      throw error;
    }
    console.error("Unknown error: error");
    throw new Error("Unknown error occurred during fetch");
  }
}
