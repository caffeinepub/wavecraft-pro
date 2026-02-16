import { useState } from 'react';
import { AuthGate } from '../features/auth/AuthGate';
import { ProfileSetupModal } from '../features/auth/ProfileSetupModal';
import { CreatorDashboardLayout } from '../features/app-shell/CreatorDashboardLayout';

export default function CreatorDashboard() {
  return (
    <AuthGate>
      <ProfileSetupModal />
      <CreatorDashboardLayout />
    </AuthGate>
  );
}
