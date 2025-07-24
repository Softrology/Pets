// App.jsx

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
import Signin from "./auth/Signin";
import SignUp from "./auth/SignUp";
import OTPVerificationPage from "./auth/OTPVerificationPage";
import PetOwnerDashboard from "./page/pet-owner/PetOwnerDashboard";
import VetDashboard from "./page/vet/VetDashboard";
import SuperAdminLayout from "./layouts/SuperAdminLayout"; // Add this import
import SuperAdminDashboard from "./page/super-admin/SuperAdminDashboard";
import UserManagement from "./page/super-admin/UserManagement"; // Add these imports
import VetManagement from "./page/super-admin/VetManagement";
import Settings from "./page/super-admin/Settings";
import Store from "./redux/Store";
import NotFoundPage from "./page/not-found/NotFoundPage";

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

function App() {
  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <HomePage />
                  </PublicRoute>
                }
              />

              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Signin />
                  </PublicRoute>
                }
              />

              <Route
                path="/register"
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

              {/* Protected Routes - Pet Owner */}
              <Route
                path="/pet-owner/*"
                element={
                  <ProtectedRoute allowedRoles={["PET_OWNER"]}>
                    <PetOwnerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - Vet */}
              <Route
                path="/vet/*"
                element={
                  <ProtectedRoute allowedRoles={["VET"]}>
                    <VetDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Routes - Super Admin - Updated with nested routes */}
              <Route
                path="/super-admin/*"
                element={
                  <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                    <SuperAdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<SuperAdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="vets" element={<VetManagement />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* 404 Route */}
              <Route path="/404" element={<NotFoundPage />} />

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