import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomePage from "./page/home/HomePage";
import OTPVerificationPage from "./auth/OTPVerificationPage";
import PetOwnerDashboard from "./page/pet-owner/PetOwnerDashboard";
import VetDashboard from "./page/vet/VetDashboard";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperAdminDashboard from "./page/super-admin/SuperAdminDashboard";
import UserManagement from "./page/super-admin/UserManagement";
import VetManagement from "./page/super-admin/VetManagement";
import Settings from "./page/super-admin/Settings";
import Store from "./redux/Store";
import NotFoundPage from "./page/not-found/NotFoundPage";
import Header from "./components/Header";
import FooterSection from "./components/FooterSection";
import AboutUs from "./page/about-us/AboutUs";
import ContactUs from "./page/contact-us/ContactUs";
import FindDoctor from "./page/find-doctor/FindDoctor";
import Blog from "./page/blog/Blog";
import JoinasVet from "./page/join-as-vet/JoinasVet";
import TermsOfService from "./page/footer-pages/TermOfServices";
import PrivacyPolicy from "./page/footer-pages/PrivacyPolicy";
import CookiePolicy from "./page/footer-pages/CookiePolicy";
import Sitemap from "./page/footer-pages/siteMap";
import TestimonialsSection from "./components/TestimonialsSection";
import Signin from "./auth/SignIn";
import Signup from "./auth/SignUp";

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <TestimonialsSection />
      <FooterSection />
    </div>
  );
}

function App() {
  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes with Header & Footer */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <HomePage />
                    </PublicLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/about-us"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <AboutUs />
                    </PublicLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/contact-us"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <ContactUs />
                    </PublicLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/find-doctor"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <FindDoctor />
                    </PublicLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/blog"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <Blog />
                    </PublicLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/join-as-vet"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <JoinasVet />
                    </PublicLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <PrivacyPolicy />
                    </PublicLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/cookie-policy"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <CookiePolicy />
                    </PublicLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/site-map"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <Sitemap />
                    </PublicLayout>
                  </PublicRoute>
                }
              />
              <Route
                path="/terms-of-service"
                element={
                  <PublicRoute>
                    <PublicLayout>
                      <TermsOfService />
                    </PublicLayout>
                  </PublicRoute>
                }
              />

              {/* Authentication Routes - Special handling without header/footer */}
              <Route
                path="/signin"
                element={
                  <PublicRoute>
                    <Signin />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                }
              />
              <Route
                path="/verify-otp"
                element={
                  <PublicRoute>
                    <OTPVerificationPage />
                  </PublicRoute>
                }
              />

              {/* 404 Page */}
              <Route path="/404" element={<NotFoundPage />} />

              {/* Protected Routes - Pet Owner (no header/footer) */}
              <Route
                path="/pet-owner/*"
                element={
                  <ProtectedRoute allowedRoles={["PET_OWNER"]}>
                    <PetOwnerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - Vet (no header/footer) */}
              <Route
                path="/vet/*"
                element={
                  <ProtectedRoute allowedRoles={["VET"]}>
                    <VetDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - Super Admin (no header/footer) */}
              <Route
                path="/super-admin/*"
                element={
                  <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                    <SuperAdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<SuperAdminDashboard />} />
                <Route path="vets" element={<VetManagement />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Catch all route - redirect to 404 */}
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </div>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
