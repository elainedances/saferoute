import { NextResponse } from 'next/server';
import { statusData } from '@/lib/data';

export async function GET() {
  return NextResponse.json(statusData);
}
