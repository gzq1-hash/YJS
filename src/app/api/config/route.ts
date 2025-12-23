import { NextResponse } from 'next/server';
import { supabase, Config, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET: 获取所有配置或单个配置
export async function GET(request: Request) {
  try {
    if (!isSupabaseConfigured) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const keyName = searchParams.get('key_name');

    if (keyName) {
      // Get specific config by key_name
      const { data, error } = await supabase
        .from('Config')
        .select('*')
        .eq('key_name', keyName)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(data);
    } else {
      // Get all configs
      const { data, error } = await supabase
        .from('Config')
        .select('*')
        .order('key_name', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json(data || []);
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: 创建新配置
export async function POST(request: Request) {
  try {
    const body: Config = await request.json();

    const { data, error } = await supabase
      .from('Config')
      .insert([body])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT: 更新配置
export async function PUT(request: Request) {
  try {
    const body: Config & { id: number } = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('Config')
      .update({
        key_name: body.key_name,
        key_content: body.key_content,
        key_remark: body.key_remark,
      })
      .eq('id', body.id)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE: 删除配置
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabase
      .from('Config')
      .delete()
      .eq('id', parseInt(id));

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
