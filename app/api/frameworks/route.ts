import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all frameworks
export async function GET() {
  try {
    const frameworks = await prisma.framework.findMany({
      include: {
        _count: {
          select: { controls: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(frameworks);
  } catch (error) {
    console.error('Error fetching frameworks:', error);
    return NextResponse.json({ error: 'Failed to fetch frameworks' }, { status: 500 });
  }
}
