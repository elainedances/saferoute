import { NextResponse } from 'next/server';
import { incidents } from '@/lib/data';

export async function GET() {
  return NextResponse.json(incidents);
}
