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
import PetOwnerLayout from "./layouts/PetOwnerLayout";
import VetLayout from "./layouts/VetLayout";
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
import SignUp from "./auth/SignUp";

// Pet Owner Pages
import PetOwnerDashboard from "./page/pet-owner/PetOwnerDashboard";
import MyPets from "./page/pet-owner/MyPet";
import PetOwnerProfile from "./page/pet-owner/PetOwnerProfile";
import MedicalRecord from "./page/pet-owner/MedicalRecord";

// Vet Pages
import VetDashboard from "./page/vet/VetDashboard";
import VetProfile from "./page/vet-admin/VetProfile";

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

// New component for public/accessible pages that can be viewed by both authenticated and non-authenticated users
function AccessibleRoute({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes accessible by both authenticated and non-authenticated users */}
              <Route
                path="/"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <HomePage />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />
              <Route
                path="/about-us"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <AboutUs />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />
              <Route
                path="/contact-us"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <ContactUs />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />
              <Route
                path="/find-doctor"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <FindDoctor />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />
              <Route
                path="/blog"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <Blog />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />
              <Route
                path="/join-as-vet"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <JoinasVet />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <PrivacyPolicy />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />
              <Route
                path="/cookie-policy"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <CookiePolicy />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />
              <Route
                path="/site-map"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <Sitemap />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />
              <Route
                path="/terms-of-service"
                element={
                  <AccessibleRoute>
                    <PublicLayout>
                      <TermsOfService />
                    </PublicLayout>
                  </AccessibleRoute>
                }
              />

              {/* Authentication Routes - Only for non-authenticated users */}
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

              {/* Protected Routes - Pet Owner */}
              <Route
                path="/pet-owner/*"
                element={
                  <ProtectedRoute allowedRoles={["PET_OWNER"]}>
                    <PetOwnerLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<PetOwnerDashboard />} />
                <Route path="my-pets" element={<MyPets />} />
                <Route path="petowner-profile" element={<PetOwnerProfile />} />
                <Route path="medical-record" element={<MedicalRecord />} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Route>

              {/* Protected Routes - Vet */}
              <Route
                path="/vet/*"
                element={
                  <ProtectedRoute allowedRoles={["VET"]}>
                    <VetLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<VetDashboard />} />
                <Route path="profile" element={<VetProfile />} />
                <Route path="" element={<Navigate to="dashboard" replace />} />
              </Route>

              {/* Protected Routes - Super Admin */}
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
                <Route path="" element={<Navigate to="dashboard" replace />} />
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
