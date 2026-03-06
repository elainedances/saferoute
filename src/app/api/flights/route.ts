import { NextResponse } from 'next/server';
import { flights } from '@/lib/data';

export async function GET() {
  return NextResponse.json(flights);
}
