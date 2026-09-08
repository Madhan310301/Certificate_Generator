import { verifyAttendeeCredentials, normalizeEmail, type AttendeeRecord } from '../data/attendees';

const AUTH_STORAGE_KEY = 'gff_attendee_session';
const CLAIMS_STORAGE_KEY = 'gff_claimed_certificates_v1';

export interface ClaimedCertificate {
  attendeeEmail: string;
  attendeePhone: string;
  participantName: string;
  issueDate: string;
  initiativeName?: string;
  certificateDataUrl: string;
  generatedAt: string;
}

/**
 * Gets all claimed certificates from persistent storage
 */
export function getAllClaimedCertificates(): Record<string, ClaimedCertificate> {
  try {
    const raw = localStorage.getItem(CLAIMS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Gets currently logged-in attendee
 */
export function getCurrentAttendee(): AttendeeRecord | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Authenticates an attendee by Email and Mobile number
 */
export function loginAttendee(email: string, phone: string): { success: boolean; attendee?: AttendeeRecord; error?: string } {
  const verified = verifyAttendeeCredentials(email, phone);
  if (!verified) {
    return {
      success: false,
      error: 'Invalid Email or Mobile Number. Please enter the exact credentials you used during event registration.',
    };
  }

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(verified));
  } catch (err) {
    console.error('Failed to persist session:', err);
  }

  return {
    success: true,
    attendee: verified,
  };
}

/**
 * Logs out the current attendee
 */
export function logoutAttendee(): void {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear session:', err);
  }
}

/**
 * Checks if the attendee has already generated a certificate
 */
export function hasAttendeeReachedLimit(email: string, isUnlimited?: boolean): boolean {
  if (isUnlimited) {
    return false;
  }
  const cleanEmail = normalizeEmail(email);
  const claims = getAllClaimedCertificates();
  return Boolean(claims[cleanEmail]);
}

/**
 * Retrieves the attendee's previously claimed certificate
 */
export function getAttendeeClaim(email: string): ClaimedCertificate | null {
  const cleanEmail = normalizeEmail(email);
  const claims = getAllClaimedCertificates();
  return claims[cleanEmail] || null;
}

/**
 * Records certificate generation and enforces the one-certificate limit
 */
export function recordAttendeeCertificate(
  email: string,
  phone: string,
  participantName: string,
  issueDate: string,
  certificateDataUrl: string,
  isUnlimited?: boolean,
  initiativeName?: string
): { success: boolean; claim?: ClaimedCertificate; error?: string } {
  const cleanEmail = normalizeEmail(email);
  const claims = getAllClaimedCertificates();

  // Strict check: if already generated and not an unlimited account, deny new generation
  if (!isUnlimited && claims[cleanEmail]) {
    return {
      success: false,
      claim: claims[cleanEmail],
      error: 'You have reached your limit. You can only generate one certificate per attendee login.',
    };
  }

  const newClaim: ClaimedCertificate = {
    attendeeEmail: cleanEmail,
    attendeePhone: phone,
    participantName: participantName.trim(),
    issueDate,
    initiativeName: initiativeName || 'Orientation Program',
    certificateDataUrl,
    generatedAt: new Date().toISOString(),
  };

  claims[cleanEmail] = newClaim;

  try {
    localStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(claims));
  } catch (err) {
    console.error('Failed to save certificate claim:', err);
  }

  return {
    success: true,
    claim: newClaim,
  };
}
