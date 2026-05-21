/**
 * Application Route Constants
 * Centralized route paths for consistency
 */

// Public routes
export const ROUTES = {
  // Landing & Auth
  HOME: "/",
  LANDING: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  
  // Reports
  REPORT: "/report",
  REPORTED: "/reported",
  RESPONDED: "/responded",
  
  // Ambulances
  MANAGE_AMBULANCES: "/manage-ambulances",
  
  // Error
  NOT_FOUND: "/not-found",
  UNAUTHORIZED: "/unauthorized",
};

// Route groups for protection/navigation
export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
];

export const PROTECTED_ROUTES = [
  ROUTES.REPORT,
  ROUTES.REPORTED,
  ROUTES.RESPONDED,
  ROUTES.MANAGE_AMBULANCES,
];

/**
 * Route metadata for navigation
 */
export const ROUTE_METADATA = {
  [ROUTES.HOME]: { name: "Home", icon: "home" },
  [ROUTES.LOGIN]: { name: "Login", icon: "login" },
  [ROUTES.SIGNUP]: { name: "Sign Up", icon: "signup" },
  [ROUTES.REPORT]: { name: "Report Accident", icon: "report" },
  [ROUTES.REPORTED]: { name: "Reported", icon: "list" },
  [ROUTES.RESPONDED]: { name: "Responded", icon: "check" },
  [ROUTES.MANAGE_AMBULANCES]: { name: "Manage Ambulances", icon: "ambulance" },
};
