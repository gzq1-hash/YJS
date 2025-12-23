import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Config } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// In-memory cache
let cachedConfig: Config | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * GET /api/config/[key_name]
 * Fetch configuration value by key name
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ key_name: string }> }
) {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 404 });
    }

    const { key_name } = await params;
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get('refresh') === 'true';

    // Check cache first (unless refresh is requested)
    if (!refresh && cachedConfig && cachedConfig.key_name === key_name && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      console.log(`[Config API] Returning cached data for key: ${key_name}`);
      return NextResponse.json(cachedConfig);
    }

    console.log(`[Config API] Fetching from database for key: ${key_name}`);
    const { data, error } = await supabase
      .from('Config')
      .select('*')
      .eq('key_name', key_name)
      .single();

    if (error) {
      console.error(`[Config API] Database error for key ${key_name}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    }

    // Update cache
    cachedConfig = data;
    cacheTimestamp = Date.now();

    return NextResponse.json(data);
  } catch (error) {
    console.error('[Config API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
