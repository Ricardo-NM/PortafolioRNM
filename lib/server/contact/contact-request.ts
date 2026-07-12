export type ContactFormValues = {
  fullName?: string;
  email?: string;
  message?: string;
  website?: string;
};

export type ContactSubmission = {
  fullName: string;
  email: string;
  message: string;
  website: string;
};

export async function readContactFormValues(request: Request) {
  const body = (await request
    .json()
    .catch(() => null)) as ContactFormValues | null;

  if (!body) {
    return null;
  }

  const fullName =
    typeof body.fullName === "string" ? body.fullName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";

  if (!fullName || !email || !message) {
    return null;
  }

  return { fullName, email, message, website };
}

export function getClientIdentifier(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const [firstAddress] = forwardedFor.split(",");
    return firstAddress.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");

  return realIp?.trim() || "unknown";
}

export function createRateLimiter({
  maxRequestsPerWindow,
  rateLimitWindowMs,
}: {
  maxRequestsPerWindow: number;
  rateLimitWindowMs: number;
}) {
  const requestCounts = new Map<string, { count: number; resetAt: number }>();

  return function isRateLimited(clientIdentifier: string) {
    const now = Date.now();
    const bucket = requestCounts.get(clientIdentifier);

    if (!bucket || bucket.resetAt <= now) {
      requestCounts.set(clientIdentifier, {
        count: 1,
        resetAt: now + rateLimitWindowMs,
      });

      return false;
    }

    if (bucket.count >= maxRequestsPerWindow) {
      return true;
    }

    bucket.count += 1;
    requestCounts.set(clientIdentifier, bucket);

    return false;
  };
}

export const isRateLimited = createRateLimiter({
  maxRequestsPerWindow: 5,
  rateLimitWindowMs: 10 * 60 * 1000,
});
