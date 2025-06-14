import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';

/**
 * Sign in with email & password
 */
export async function signIn(email: string, password: string) {
	return await supabase.auth.signInWithPassword({ email, password });
}

/**
 * Sign up new user
 */
export async function signUp(email: string, password: string) {
	return await supabase.auth.signUp({ email, password });
}

/**
 * Send password reset email
 */
export async function sendPasswordReset(email: string) {
	return await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/auth/reset-password`
	});
}

/**
 * Update password given a new password and token
 */
export async function updatePassword(newPassword: string, accessToken: string) {
	return await supabase.auth.updateUser({ password: newPassword });
}
